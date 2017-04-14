class FpTreeNode:
    def __init__(self, layer, node_tag='', val=0, parent=None, child_list=None):
        if child_list is None:
            child_list = []

        self.layer = layer

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


class FpTree:
    def __init__(self):
        self.root = FpTreeNode(layer=0, node_tag='null')

    def absorb_pattern(self, ptn):

        tree_iter = self.root

        layer_count = 0

        for ele in ptn:

            next_node = None

            for child_node in tree_iter.child_list:

                if child_node.node_tag == ele:

                    child_node.increase_val()

                    next_node = child_node

                    break

            if next_node is None:

                next_node = FpTreeNode(layer=layer_count + 1, node_tag=ele, val=1, parent=tree_iter)

                tree_iter.add_child_node(next_node)

            tree_iter = next_node

            layer_count += 1

        # tree_iter = self.root
        #
        # while tree_iter is not None:
        #
        #     print(tree_iter)
        #
        #     if len(tree_iter.child_list) > 0:
        #
        #         tree_iter = tree_iter.child_list[0]
        #
        #     else:
        #
        #         tree_iter = None

    def __str__(self):

        layer_count = 0

        quque = [self.root]

        vis_str = 'Layer %d: ' % (layer_count)

        while len(quque) > 0:

            cur_node = quque[0]

            if layer_count != cur_node.layer:

                layer_count += 1

                vis_str += '\nLayer %d: ' % (layer_count)

            vis_str += '(tag: %s, cnt: %d)' % (cur_node.node_tag, cur_node.val)

            for ele in cur_node.child_list:

                quque.append(ele)

            quque.pop(0)

        return vis_str

    # def print_tree(self):
    #
    #     layer_count = 0
    #
    #     quque = [self.root]
    #
    #     print('Layer %d: ' % layer_count, end='')
    #
    #     while len(quque) > 0:
    #
    #         cur_node = quque[0]
    #
    #         if layer_count != cur_node.layer:
    #
    #             layer_count += 1
    #
    #             print( '\nLayer %d: ' % (layer_count), end='')
    #
    #         print('(tag: %s, cnt: %d)' % (cur_node.node_tag, cur_node.val), end='')
    #
    #         for ele in cur_node.child_list:
    #
    #             quque.append(ele)
    #
    #         quque.pop(0)