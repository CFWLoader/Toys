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

        # Predict by RGB values.
        rgb_classifier = r > 95 and \
            g > 40 and g < 100 and \
            b > 20 and \
            max([r, g, b]) - min([r, g, b]) > 15 and \
            abs(r - g) > 15 and \
            r > g and \
            r > b

        # Predict by processed RGB values.
        nr, ng, nb = self._to_normalized(r, g, b)

        norm_rgb_classifier = nr / ng > 1.185 and \
            float(r * g) / ((r + g + b) ** 2) > 0.107 and \
            float(r * g) / ((r + g + b) ** 2) > 0.112

        # Predict by HSV color mode.
        h, s, v = self._to_hsv(r, g, b)

        hsv_classifier = h > 0 and \
            h < 35 and \
            s > 0.23 and \
            s < 0.68

        # Predict by YCbCr color mode.
        y, cb, cr = self._to_ycbcr(r, g, b)

        ycbcr_classifier = 97.5 <= cb <= 142.5 and 134 <= cr <= 176

        return ycbcr_classifier

    def _to_normalized(self, r, g, b):
        if r == 0:
            r = 0.0001
        if g == 0:
            g = 0.0001
        if b == 0:
            b = 0.0001
        _sum = float(r + g + b)
        return [r / _sum, g / _sum, b / _sum]

    def _to_ycbcr(self, r, g, b):
        # 公式来源：
        # http://stackoverflow.com/questions/19459831/rgb-to-ycbcr-conversion-problems
        y = .299 * r + .587 * g + .114 * b
        cb = 128 - 0.168736 * r - 0.331364 * g + 0.5 * b
        cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b
        return y, cb, cr

    def _to_hsv(self, r, g, b):
        h = 0
        _sum = float(r + g + b)
        _max = float(max([r, g, b]))
        _min = float(min([r, g, b]))
        diff = float(_max - _min)
        if _sum == 0:
            _sum = 0.0001

        if _max == r:
            if diff == 0:
                h = sys.maxsize
            else:
                h = (g - b) / diff
        elif _max == g:
            h = 2 + ((g - r) / diff)
        else:
            h = 4 + ((r - g) / diff)

        h *= 60
        if h < 0:
            h += 360

        return [h, 1.0 - (3.0 * (_min / _sum)), (1.0 / 3.0) * _max]

    def _add_merge(self, _from, _to):

        self.last_from = _from

        self.last_to = _to

        from_index = -1

        to_index = -1

        for index, region in enumerate(self.merge_regions):

            for r_index  in region:

                if r_index == _from:

                    from_index = _from

                if r_index == _to:

                    to_index = index

        # If this two region exist in self.merge_regions
        if from_index != -1 and to_index != -1:

            # And this two regions located in different list.
            if from_index != to_index:

                self.merge_regions[from_index].extend(self.merge_regions[to_index])

                del(self.merge_regions[to_index])

            return

        # If this two regions do not exist.
        if from_index == -1 and to_index == -1:

            # Create the new region.
            self.merge_regions.append([_from, _to])

        # Only one of them exists.
        if from_index != -1 and to_index == -1:

            self.merge_regions[from_index].append(_to)

        if from_index == -1 and to_index != -1:

            self.merge_regions[_to].append(_from)

        return

    # Merge newly detected skin regions into skin regions.
    def _merge(self, detected_regions, merge_regions):

        new_detected_regions = []

        for idx, region in enumerate(merge_regions):

            try:

                new_detected_regions[idx]

            except IndexError:

                new_detected_regions.append([])

            for r_index in region:

                new_detected_regions[idx].extend(detected_regions[r_index])

                detected_regions[r_index] = []

        # Append the left to new detected regions.
        for region in detected_regions:

            if len(region) > 0:

                new_detected_regions.append(region)

        self._clear_regions(new_detected_regions)

    # Only save the region has the pixel quantity greater than specified index.
    def _clear_regions(self, detected_regions):

        for region in detected_regions:

            if len(region) > 30:

                self.skin_regions.append(region)

    def _analyze_regions(self):

        # if the number of skin regions less than 3 means not sexual.
        if len(self.skin_regions) < 3:

            self.message = "Less tha 3 skin regions ({_skin_regions_size})".format(
                __skin_regions_size=len(self.skin_regions)
            )

            self.result = False

            return self.result

        # Sort skin regions.
        self.skin_regions = sorted(self.skin_regions, key = lambda s: len(s), reverse= True)

        # Count total number of skin pixels.
        total_skin = float(sum([len(skin_region) for skin_region in self.skin_regions]))

        # If the ratio of skin regions and the full image is less than 15% means not sexual.
        if total_skin / self.total_pixels < 0.15:

            self.message = 'Total skin percentage lower than 15 ({:.2f})'.format(
                total_skin / self.total_pixels * 100
            )

            self.result = False

            return self.result

        # If ratio of the maximal skin region and the total skin regions less than 45%, not sexual.
        if len(self.skin_regions[0]) / total_skin < 0.45:

            self.message = 'The biggest region contains less than 45 ({:.2f})'.format(
                len(self.skin_regions[0]) / total_skin * 100
            )

            self.result = True

            return self.result

        # If the number of skin regions is greater than 60 means not sexual.
        if len(self.skin_regions) > 60:

            self.message = 'More than 60 skin regions ({})'.format(len(self.skin_regions))

            self.result = False

            return self.result

        # Else is sexual.
        self.message = 'Nude!!'

        self.result = True

        return self.result

    def inspect(self):

        _image = '{} {} {}x{}'.format(self.image.filename, self.image.format, self.width, self.height)

        return "{_image}: result={_result} message='{_message}'".format(
            _image = _image,
            _result = self.result,
            _message = self.message
        )

    # 将在源文件目录生成图片文件，将皮肤区域可视化
    def showSkinRegions(self):
        # 未得出结果时方法返回
        if self.result is None:
            return
        # 皮肤像素的 ID 的集合
        skinIdSet = set()
        # 将原图做一份拷贝
        simage = self.image
        # 加载数据
        simageData = simage.load()

        # 将皮肤像素的 id 存入 skinIdSet
        for sr in self.skin_regions:
            for pixel in sr:
                skinIdSet.add(pixel.id)
        # 将图像中的皮肤像素设为白色，其余设为黑色
        for pixel in self.skin_map:
            if pixel.id not in skinIdSet:
                simageData[pixel.x, pixel.y] = 0, 0, 0
            else:
                simageData[pixel.x, pixel.y] = 255, 255, 255
        # 源文件绝对路径
        filePath = os.path.abspath(self.image.filename)
        # 源文件所在目录
        fileDirectory = os.path.dirname(filePath) + '/'
        # 源文件的完整文件名
        fileFullName = os.path.basename(filePath)
        # 分离源文件的完整文件名得到文件名和扩展名
        fileName, fileExtName = os.path.splitext(fileFullName)
        # 保存图片
        simage.save('{}{}_{}{}'.format(fileDirectory, fileName, 'Nude' if self.result else 'Normal', fileExtName))