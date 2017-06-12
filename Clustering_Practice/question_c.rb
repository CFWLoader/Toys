# points = [6, 12, 18, 24, 30, 42, 48]

def min_distance_between_clusters cluster1, cluster2

  min_dist = (cluster1[0] - cluster2[0]).abs

  cluster1.each{|p1|

    cluster2.each{|p2|

      if min_dist > (p1 - p2).abs

        min_dist = (p1 - p2).abs

      end

    }

  }

  min_dist

end


def cluster_to_k points, k

  clusters = Array.new k

  if points.size != k

    raise "cluster_to_k() can't fully support. The number of input points should be equal to k."

  end

  points.each_with_index { |val, idx| clusters[idx] = [val]}

  clusters

end


def single_linkage points, initial_k

  k_clusters = Array.new initial_k

  k_clusters[initial_k - 1] = cluster_to_k points, initial_k

  (initial_k - 1).downto(1) {|k|

    clusters = k_clusters[k]

    c1 = 0

    c2 = 1

    min_dist = min_distance_between_clusters clusters[c1], clusters[c2]

    0.upto(clusters.size - 1) {|tc1|

      0.upto(clusters.size - 1) {|tc2|

        if tc1 == tc2 then next end

        tmp_min_dist = min_distance_between_clusters clusters[tc1], clusters[tc2]

        if tmp_min_dist < min_dist

          c1 = tc1

          c2 = tc2

          min_dist = tmp_min_dist

        end

      }

    }

    k_clusters[k - 1] = [[clusters[c1], clusters[c2]].flatten!]

    0.upto(clusters.size - 1) {|idx|

      if idx != c1 and idx != c2

        k_clusters[k - 1] << clusters[idx]

      end

    }

  }

  k_clusters

end


if $0 == __FILE__

  inputs = [6, 12, 18, 24, 30, 42, 48]

  k_clusters = single_linkage inputs, inputs.size

  k_clusters.each {|val|

    print val

    puts

  }

end