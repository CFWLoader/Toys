library(rjson)

# dist = rnorm(100, 3, 2)
dist = runif(100, 0, 1)

jsoned <- toJSON(dist)

# write.table(jsoned, './norm_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
# png(file = "./norm_dist1.png")
# hist(dist, main = "Normal Distribution")

write.table(jsoned, './unif_dist1.json', row.names = FALSE, col.names = FALSE, quote = FALSE)
png(file = "unif_dist1.png")
hist(dist, main = "Uniform Distribution")

# Save the file.
dev.off()