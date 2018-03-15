# library(nortest)
library(ADGofTest)
library(rjson)

transform_normality <- function(data)
{
    miu = mean(data)

    sigma = sqrt(var(data))

    # print(miu)

    # print(sigma)

    # result = []

    return(sort(pnorm(data, miu, sigma)))
}

transform_uniform <- function(data)
{
    a = min(data)

    b = max(data)

    return(sort(punif(data, a, b)))
}

# dist_data = fromJSON(file = './norm_dist1.json')

dist_data = fromJSON(file = './unif_dist1.json')

transformed = transform_uniform(dist_data)

reshaped = transformed[c(-1, -length(transformed))]

# print(reshaped)

print(ad.test(reshaped))

# dist_data = c(1, 2, 3, 4, 5, 6, 7, 8, 9)

# dist_data = read.csv(file = './aqipm25.csv')

# print(transformed)

# print(dist_data[, 1])

# len = length(dist_data)

# adv = ad.test(dist_data[ , 1], pnorm, length(dist_data[, 1]), mean(dist_data[, 1], var(dist_data[, 1])))

# print(adv)

# print(ad.test(dist_data[, 2], pnorm, mean(dist_data[, 1]), var(dist_data[, 1])))

# advalue = adv$statistic

# z_star = advalue * (1 + 0.75 / len + 2.25 / (len**2))

# print(z_star)

# print(advalue * (1 + 0.75 / len + 2.25 / (len**2)))

# expn = -8.318 + 42.796 * z_star - 59.938 * (z_star**2)

# print(expn)

# print(exp(expn))

# print(adv$p.value**2)

# dist_data = rnorm(100, 0, 3)

# print(ad.test(dist_data))

# print(ad.test(dist_data, punif))