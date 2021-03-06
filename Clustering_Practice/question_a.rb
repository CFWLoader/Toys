def distance_sum cluster, centroid, dist_measure

  sum = 0

  cluster.each{|point|

    sum += dist_measure.call centroid, point

  }

  sum

end


def reselect_centroid clusters, centroids, dist_measure

  reselected_centroids = Array.new centroids.size

  clusters.each_with_index {|cluster, idx|

    centroid = centroids[idx]

    dist_sum = distance_sum cluster, centroid, dist_measure

    cluster.each { |val|

      tmp_dist_sum = distance_sum cluster, val, dist_measure

      if tmp_dist_sum < dist_sum

        centroid = val

        dist_sum = tmp_dist_sum

      end

    }

    reselected_centroids[idx] = centroid

  }

  reselected_centroids

end


def k_means points, medoids, dist_measure

  clusters = Array.new medoids.size

  medoids.each_index { |idx| clusters[idx] = []}

  points.each {|p|

    nearest_idx = 0

    dist = dist_measure.call p, medoids[0]

    medoids.each_with_index { |val, idx|

      tmp_dist = dist_measure.call p, val

      if tmp_dist < dist

        nearest_idx = idx

        dist = tmp_dist

      end

    }

    clusters[nearest_idx] << p

  }

  new_centroids = reselect_centroid clusters, medoids, dist_measure

  return clusters, new_centroids

end


def sum_of_square_error clusters, medoids, dist_measure

  sum = 0

  clusters.each_with_index {|cluster, idx|

    cluster.each{|p|

      sum += dist_measure.call medoids[idx], p

    }

  }

  sum

end


def separation_squares_sum clusters, centroids

  bss = 0

  mean_of_centroids = 0

  total_count = 0

  clusters.each {|cluster|

    cluster.each {
        |val| mean_of_centroids += val
    }

  total_count += cluster.size

  }

  mean_of_centroids /= total_count.to_f

  clusters.each_with_index { |val, idx|

    bss += val.size * (mean_of_centroids - centroids[idx]) ** 2

  }

  bss

end


def item1

  points = [6, 12, 18, 24, 30, 42, 48]

  center_points = [18, 45]

  clusters, centroids = k_means points, center_points, lambda{|x, y| Math.sqrt((x - y) ** 2)}

  print clusters, ' Centroids:', centroids

  puts

  wss = sum_of_square_error(clusters, center_points, lambda{|x, y| (x - y) ** 2})

  bss = separation_squares_sum(clusters, centroids)

  print "BSS: #{bss}, WSS(SSE): #{wss}, TSS: #{bss + wss}"

  puts

end


def item2

  points = [6, 12, 18, 24, 30, 42, 48]

  center_points = [15, 40]

  clusters, centroids = k_means points, center_points, lambda{|x, y| Math.sqrt((x - y) ** 2)}

  print clusters, ' Centroids:', centroids

  puts

  wss = sum_of_square_error(clusters, center_points, lambda{|x, y| (x - y) ** 2})

  bss = separation_squares_sum(clusters, center_points)

  print "BSS: #{bss}, WSS(SSE): #{wss}, TSS: #{bss + wss}"

  puts

end


if $0 == __FILE__

  item1

  item2

end