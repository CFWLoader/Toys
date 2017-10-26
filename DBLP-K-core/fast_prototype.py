import networkx as nx

if __name__ == "__main__":

    dblp_graph = nx.read_edgelist('./data/edgelist_py.txt')

    print(dblp_graph.number_of_nodes())

    print(dblp_graph.number_of_edges())

    k_core_graph = nx.algorithms.core.k_core(dblp_graph, k = 10)

    print(k_core_graph.number_of_nodes())

    strongly_com = nx.algorithms.connected_components(k_core_graph)

    # print(strongly_com)

    print(sorted(strongly_com, key= len))