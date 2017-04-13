class FpTreeNode:
    def __init__(self, node_tag='', val=0, parent=None, child_list=None):

        if child_list is None:
            child_list = []

        self.node_tag = node_tag

        self.val = val

        self.parent = parent

        self.child_list = child_list

    def increase_val(self, inc_val=1):
        self.val += inc_val

    def add_child_node(self, child_node):
        self.child_list.append(child_node)

    def __str__(self):

        return 'Node Name: %s, Value: %d' % (self.node_tag, self.val)