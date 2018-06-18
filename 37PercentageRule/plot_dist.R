library(ggplot2)

script.dir <- dirname(sys.frame(1)$ofile)
setwd(script.dir)

dist.plt.df <- data.frame(x = rnorm(50, 3, 2))

ggplot(dist.plt.df, aes(x = x)) + geom_density()
ggsave("./plot_dist.png")