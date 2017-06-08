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

  clusters

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


def item1

  points = [6, 12, 18, 24, 30, 42, 48]

  center_points = [18, 45]

  clusters = k_means points, center_points, lambda{|x, y| Math.sqrt((x - y) ** 2)}

  print clusters

  puts

  print sum_of_square_error clusters, center_points, lambda{|x, y| Math.sqrt((x - y) ** 2)}

  puts

end


def item2

  points = [6, 12, 18, 24, 30, 42, 48]

  center_points = [15, 40]

  clusters = k_means points, center_points, lambda{|x, y| Math.sqrt((x - y) ** 2)}

  print clusters

  puts

  print sum_of_square_error clusters, center_points, lambda{|x, y| Math.sqrt((x - y) ** 2)}

  puts

end


if $0 == __FILE__

  item1

  item2

end