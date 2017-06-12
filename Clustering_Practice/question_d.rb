require './question_a.rb'
require './question_c.rb'

ORIGINAL_POINTS = [6, 12, 18, 24, 30, 42, 48]

def wrapped_k_means points, k

  min_val = points.min

  max_val = points.max

  centroids = []

  0.upto(k - 1) {centroids << rand(min_val..max_val)}

  clusters, new_centroids = k_means(points, centroids, lambda{|x, y| (x - y).abs})

  return clusters, new_centroids, centroids

end


if $0 == __FILE__

  clusters1, centroids, rand_centroids = wrapped_k_means ORIGINAL_POINTS, 2

  k_clusters = single_linkage ORIGINAL_POINTS, ORIGINAL_POINTS.size

  print clusters1

  puts

  print 'Random centroids:', rand_centroids, '    Reselected:', centroids

  puts

  print k_clusters[1]

end