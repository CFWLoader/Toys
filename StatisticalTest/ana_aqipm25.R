library(rjson)

input_data = read.csv('./aqipm25.csv', head = FALSE)

print(paste("AQI's Mean: ", mean(as.numeric(input_data$V1))))

print(paste("AQI's Standard Variance: ", sqrt(var(as.numeric(input_data$V1)))))

print(paste("PM2.5's Mean: ", mean(as.numeric(input_data$V2))))

print(paste("PM2.5's Standard Variance: ", sqrt(var(as.numeric(input_data$V2)))))

# png(file = './aqi.png')

# write.table(toJSON(as.numeric(input_data$V1)), './aqi_dist.json', row.names = FALSE, col.names = FALSE, quote = FALSE)

# hist(as.numeric(as.numeric(input_data$V1)), main = 'AQI Dist', xlab = 'AQI Values')

# dev.off()

# png(file = './pm25.png')

# write.table(toJSON(as.numeric(input_data$V2)), './pm25_dist.json', row.names = FALSE, col.names = FALSE, quote = FALSE)

# hist(as.numeric(input_data$V2), main = 'PM2.5 Dist', xlab = 'PM2.5 Values')

# dev.off()

# library(ggplot2)

# reshaped_input = c(as.numeric(input_data$V1), as.numeric(input_data$V2))

# png(file = './aqipm25.png')

# print_list <-lapply(1:2,
#               function(col)
#               {
#                   ggplot2::qplot(reshaped_input[[col]], geom = "histogram",binwidth = 1)
#               })

# cowplot::plot_grid(plotlist = print_list)

# dev.off()