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