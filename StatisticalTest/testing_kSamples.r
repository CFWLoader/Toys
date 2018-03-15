library(SuppDists)
library(kSamples)

print(ad.test(runif(100, 0, 1), rnorm(100, 0.5, 0.33), rnorm(100, 0.5, 0.33), rnorm(100, 0.5, 0.33),  rnorm(100, 0.5, 0.33)))