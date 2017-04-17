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
    def __init__(self, fre_list):
        self.root = FpTreeNode(layer=0, node_tag='null')

        self.fre_list = fre_list

    def rearrange_ptn_as_fre_list(self, ptn):

        rearranged_record = []

        for (key, val) in self.fre_list:

            if key in ptn:

                rearranged_record.append(key)

        return rearranged_record

    def absorb_pattern(self, ptn, cnt):

        tree_iter = self.root

        layer_count = 0

        ptn = self.rearrange_ptn_as_fre_list(ptn)

        for ele in ptn:

            next_node = None

            for child_node in tree_iter.child_list:

                if child_node.node_tag == ele:

                    child_node.increase_val(cnt)

                    next_node = child_node

                    break

            if next_node is None:

                next_node = FpTreeNode(layer=layer_count + 1, node_tag=ele, val=cnt, parent=tree_iter)

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

    def gen_link_tbl(self):

        link_tbl = {}

        for (key, val) in self.fre_list:

            link_tbl[key] = [val]

        queue = []

        for node in self.root.child_list:

            queue.append(node)

        while len(queue) > 0:

            node = queue[0]

            queue.pop(0)

            for child_node in node.child_list:

                queue.append(child_node)

            link_tbl[node.node_tag].append(node)

        return link_tbl

    def gen_prefix_paths(self, key, update_lnk_tbl=False):

        if self.lnk_tbl is None or update_lnk_tbl:

            self.lnk_tbl = self.gen_link_tbl()

        prefix_paths = {}

        for node in self.lnk_tbl[key][1::]:

            node_iter = node.parent

            prefix_path = set()

            while node_iter.node_tag != 'null':

                prefix_path.add(node.node_tag)

                node_iter = node_iter.parent

            prefix_paths[frozenset(prefix_path)] = node.val

        return prefix_paths

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