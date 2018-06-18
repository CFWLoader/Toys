library(ggplot2)
library(latex2exp)

script.dir <- dirname(sys.frame(1)$ofile)
setwd(script.dir)

sp_max <- function(vec)
{
    vec.len <- length(vec)
    start.idx <- round(vec.len * 0.37)
    ref.val <- vec[start.idx]
    for(idx in seq(start.idx + 1, vec.len, 1))
    {
        if(ref.val < vec[idx])
        {
            ref.val <- vec[idx]
            break
        }
    }
    ref.val
}

maxp.vec <- c()
spmaxp.vec <- c()
err.vec <- c()

iter.size <- 100
sam.sizes <- seq(10, 500, 10)

for(samsize in sam.sizes)
{
    maxerr.vec <- c()
    spmaxerr.vec <- c()
    errt.vec <- c()
    for(cnt in c(1:100))
    {
        sam <- round(runif(samsize, 1, 100))
        maxval <- max(sam)
        spmaxval <- sp_max(sam)
        # err <- abs(maxval - spmaxval)
        maxerr.vec <- c(maxerr.vec, maxval)
        spmaxerr.vec <- c(spmaxerr.vec,  spmaxval)
        errt.vec <- c(err.vec, abs(maxval - spmaxval))
    }
    maxp.vec <- c(maxp.vec, mean(maxerr.vec))
    spmaxp.vec <- c(spmaxp.vec, mean(spmaxerr.vec))
    err.vec <- c(err.vec, mean(errt.vec))
}

plt.df <- data.frame(x = sam.sizes, y = maxp.vec, grp = as.factor("样本最大值"))
plt.df <- rbind(plt.df, data.frame(x = sam.sizes, y = spmaxp.vec, grp = as.factor("37法则最大值")))
plt.df <- rbind(plt.df, data.frame(x = sam.sizes, y = err.vec, grp = as.factor("残差")))

ggplot(plt.df, aes(x = x, y = y, group = grp, colour = grp)) + geom_line() + 
    labs(title = "最大取值情况（每样本容量测试100次）", x = "样本容量", y = "最大值", color = "值类型")# + scale_y_continuous(limits = c(0, 10))
ggsave("sims.png")

# max.vec <- c()
# spmax.vec <- c()

# for(iter in c(1:iter.size))
# {
#     sam <- round(rnorm(10, 5, 3))
#     max.vec <- c(max.vec, max(sam))
#     spmax.vec <- c(spmax.vec, sp_max(sam))
# }

# plt.df <- data.frame(iter = c(1:iter.size), vals = max.vec, grp = as.factor("Max"))
# plt.df <- rbind(plt.df, data.frame(iter = c(1:iter.size), vals = spmax.vec, grp = as.factor("37Max")))

# ggplot(plt.df, aes(x = iter, y = vals, group = grp, color = grp)) + geom_line() + 
#     geom_hline(yintercept = mean(max.vec), aes(color = as.factor("Max"))) +
#     geom_hline(yintercept = mean(spmax.vec), aes(color = as.factor("37Max"))) +
#     scale_y_continuous(name = "Choosen", limits = c(0, 20))
# ggsave("./sims.png")