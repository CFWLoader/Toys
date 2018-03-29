library(rjson)

dist = rnorm(1000, 3, 2)
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/norm_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/norm_dist1.png")
hist(dist, main = "Normal Distribution")
dev.off()

dist = runif(1000, 0.23, 10.89)
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/unif_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/unif_dist1.png")
hist(dist, main = "Uniform Distribution")
dev.off()

dist = rexp(1000, 3);
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/exp_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/exp_dist1.png")
hist(dist, main = "Exponential Distribution")
dev.off()

dist = rlnorm(1000, 0.33, 0.66)
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/lgnorm_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/lgnorm_dist1.png")
hist(dist, main = "Log-Normal Distribution")
dev.off()

library(triangle)
dist = rtriangle(1000, 2, 15, 4)
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/tri_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/tri_dist1.png")
hist(dist, main = "Triangle Distribution")
dev.off()

alpha = 3
beta = 0.5
dist = rgamma(1000, alpha, rate = beta)
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/gamma_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/gamma_dist1.png")
hist(dist, main = paste("Gamma Distribution(Alpha=", alpha, ", Beta=", beta, ")"))
dev.off()

alpha = 3
beta = 2
dist = rbeta(1000, alpha, beta)
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/beta_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/beta_dist1.png")
hist(dist, main = paste("Beta Distribution(Alpha=", alpha, ", Beta=", beta, ")"))
dev.off()

shape = 5
scale = 1
dist = rweibull(1000, shape, scale)
jsoned <- toJSON(dist)
write.table(jsoned, './dataset/weib_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "./dataset/weib_dist1.png")
hist(dist, main = paste("Weibull Distribution(Shape=", shape, ", Scale=", scale, ")"))
dev.off()