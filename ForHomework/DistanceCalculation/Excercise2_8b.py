__author__ = 'CFWLoader'

import math as m

class Point:

    def __init__(self, x, y):

        self.x = x

        self.y = y

    def normalize(self):

        a = m.sqrt(self.x * self.x + self.y * self.y)

        return Point(self.x / a, self.y / a)

    def euclid_distance(self, p2):

        return m.sqrt((self.x - p2.x) * (self.x - p2.x) + (self.y - p2.y) * (self.y - p2.y))

    def __str__(self):
        return '(%lf, %lf)' % (self.x, self.y)

px = Point(1.4, 1.6)

pointArray = [Point(1.5, 1.7), Point(2, 1.9), Point(1.6, 1.8), Point(1.2, 1.5), Point(1.5, 1.0)]

npx = px.normalize()

print('normalized x:', npx)

for point in pointArray:

    npoint = point.normalize()

    print('normalized:', npoint, '    Distance:', npx.euclid_distance(npoint))