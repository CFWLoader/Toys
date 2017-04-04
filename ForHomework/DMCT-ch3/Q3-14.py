__author__ = 'CFWLoader'

import random

class PseudoBusinessModel:

    def __init__(self, attr1 = None, attr2 = None, attr3 = None):

        self.attr1 = attr1

        self.attr2 = attr2

        self.attr3 = attr3

    def validate(self, check_rules1, check_rules2, check_rules3):

        report = []

        if self.attr1 == None:

            report.append('attr1 is None.')

        elif check_rules1(self.attr1) == False:

            report.append('attr1 is violated rules.')

        else:

            report.append('attr1 is normal.')

        if self.attr2 == None:

            report.append('attr2 is None.')

        elif check_rules2(self.attr2) == False:

            report.append('attr2 is violated rules.')

        else:

            report.append('attr2 is normal.')

        if self.attr3 == None:

            report.append('attr3 is None.')

        elif check_rules3(self.attr3) == False:

            report.append('attr3 is violated rules.')

        else:

            report.append('attr3 is normal.')

        return report

    def fix_attr1(self, fix_rules):

        self.attr1 = fix_rules(self.attr1)

    def fix_attr2(self, fix_rules):

        self.attr2 = fix_rules(self.attr2)

    def fix_attr3(self, fix_rules):

        self.attr3 = fix_rules(self.attr3)


def check_rules(x):

    return True if 10 > x > 0 else False

def fix_rules(x):

    return random.randrange(1, 9)


pbm = PseudoBusinessModel(5, 30)

for detail in pbm.validate(check_rules, check_rules, check_rules):

    print(detail)

pbm.fix_attr2(fix_rules)
pbm.fix_attr3(fix_rules)

for detail in pbm.validate(check_rules, check_rules, check_rules):

    print(detail)