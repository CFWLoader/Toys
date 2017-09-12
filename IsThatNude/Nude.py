import sys
import os
import _io
from collections import namedtuple
from PIL import Image

class Nude(object):

    Skin = namedtuple('Skin', 'id skin region x y')

    def __init__(self, path_or_image):

        if isinstance(path_or_image, Image.Image):

            self.image = path_or_image

        elif isinstance(path_or_image, str):

            self.image = Image.open(path_or_image)

        # Get all bands in the image.
        bands = self.image.getbands()

        # If the image is a grey scale image, convert it to RGB image.
        if len(bands) == 1:

            new_img = Image.new("RGB", self.image.size)

            new_img.paste(self.image)

            f = self.image.filename

            self.image = new_img

            self.image.filename = f

        # Save the 'Skin' pixels object.
        self.skin_map = []

        # Record the skin regions' index.
        self.dectected_regions = []

        # Merge the continuous regions into a complete one.
        # This is the queue for the regions to be merged.
        self.merge_regions = []

        # Merged skin regions.
        self.skin_regions = []

        # Latest merged skin regions' index.
        self.last_from, self.last_to = -1, -1

        # Result
        self.result = None

        # Processing messages.
        self.message = None

        self.width, self.height = self.image.size

        self.total_pixels = self.width * self.height

    def resize(self, maxwidth = 1000, maxheight = 1000):

        ret = 0

        if maxwidth:

            if self.width > maxwidth:

                wpercent = (maxwidth / float(self.width))

                hsize = int(self.height * wpercent)

                fname = self.image.filename

                self.image = self.image.resize((maxwidth, hsize), Image.LANCZOS)

                self.image.filename = fname

                self.width, self.height = self.image.size

                self.total_pixels = self.width * self.height

                ret += 1

        if maxheight:

            if self.height > maxheight:

                hpercent = (maxheight / float(self.height))

                wsize = int(float(self.width) * hpercent)

                fname = self.image.filename

                self.image = self.image.resize((wsize, maxheight), Image.LANCZOS)

                self.image.filename = fname

                self.width, self.height = self.image.size

                self.total_pixels = self.width * self.height

                ret += 2

        return ret

    def parse(self):

        if self.result is not None:

            return self

        pixels = self.image.load()

        # Iterate every pixels and use _classify_skin() to determine the pixels is a skin region.
        for y in range(self.height):

            for x in range(self.width):

                # Get RGB values.
                r = pixels[x, y][0]
                g = pixels[x, y][1]
                b = pixels[x, y][2]

                # Determine the pixel is a skin pixel or not.
                is_skin = True if self._classify_skin(r, g, b) else False

                # Setting ID for all pixels.
                _id = x + y * self.width + 1

                # Map the ID to the skin object.
                self.skin_map.append(self.Skin(_id, is_skin, None, x, y))

                # If the pixel is not the skin pixel, go to next iteration.
                if not is_skin:
                    continue

                # Checking adjacent pixels if this pixel is a skin pixel.
                # Note that the ID starts from 1, and the index in the image starts from 0.
                # So have to -1 before the calculation.
                check_indexes = [_id - 2,                   # Left pixel
                                 _id - self.width - 2,      # Left-Top pixel
                                 _id - self.width - 1,      # Top pixel
                                 _id - self.width]          # Right Top pixel

                # Current skin pixel's region, initialized by -1.
                region = -1

                for index in check_indexes:

                    # Try to get adjacent pixels' Skin object.
                    try:
                        self.skin_map[index]

                    except IndexError:

                        break

                    # If the adjacent is a skin pixel.
                    if self.skin_map[index].skin:

                        # If current pixel's region values and adjacent's are valid and have different values.
                        # And haven't been added to same merging task.
                        if (self.skin_map[index].region is not None and
                            region is not None and region != -1 and
                            self.skin_map[index].region != region and
                            self.last_from != region and
                            self.last_to != self.skin_map[index].region):

                            # Add the two region to merging task.
                            self._add_merge(region, self.skin_map[index].region)

                        region = self.skin_map[index].region

                # After visiting the adjacent pixels, all adjacencies are not skin pixel if region holds -1.
                if region == -1:

                    # Update to new region number.
                    _skin = self.skin_map[_id - 1]._replace(region=len(self.dectected_regions))

                    self.skin_map[_id - 1] = _skin

                    # Create a new region based on this skin pixels.
                    self.dectected_regions.append([self.skin_map[_id - 1]])

                # If region is not -1 and None, means the region holds valid adjacent skin pixel.
                elif region != None:

                    # Update current pixel's region to adjacent's.
                    _skin = self.skin_map[_id - 1]._replace(region= region)

                    self.skin_map[_id - 1] = _skin

                    # Append current pixel to the region.
                    self.dectected_regions[region].append(self.skin_map[_id - 1])

        # After all regions' merging tasks, save the region to self.skin_regions
        self._merge(self.dectected_regions, self.merge_regions)

        # Analyze.
        self._analyze_regions()

        return self

    def _classify_skin(self, r, g, b):

