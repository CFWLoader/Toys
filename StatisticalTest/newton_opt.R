library(MASS)

newtonMO2V = function(f1, f2, f11, f12, f21, f22, initialVal, epsilon = 1e-13)
{
	x = matrix(initialVal, nrow = 2, byrow = TRUE)

	hessian = matrix(c(f11(x[1], x[2]), f12(x[1], x[2]), f21(x[1], x[2]), f22(x[1], x[2])),
        nrow = 2, byrow = TRUE)

	hessianInv = ginv(hessian)

    jaccob = c(f1(x[1], x[2]), f2(x[1], x[2]))

    deltax = hessianInv %*% jaccob

    print(x)

    print(hessian)

    print(hessianInv)

    print(jaccob)

    print("DeltaX:")

    print(deltax)

	# iterations = 0

	# while(mathjs.abs(deltax[0]) > epsilon || mathjs.abs(deltax[1] > epsilon))
	# {
	# 	++iterations

	# 	x[0] = x[0] - deltax[0];

	# 	x[1] = x[1] - deltax[0];

	# 	hessian = [
	# 		[secondDrv[0][0](x[0], x[1]), secondDrv[0][1](x[0], x[1])],
	# 		[secondDrv[1][0](x[0], x[1]), secondDrv[1][1](x[0], x[1])]
	# 	]
	
	# 	hessianInv = mathjs.inv(hessian)
	
	# 	jaccob = [firstDrv[0](x[0], x[1]), firstDrv[1](x[0], x[1])]
	
	# 	deltax = mathjs.multiply(hessianInv, jaccob)
	# }

	# print(paste("Newton iterated ", iterations))

	# return([x[0] - deltax[0], x[1] - deltax[1]])
}

gammaParameters = function(data)
{
	mu = mean(data)
    
    sigma = sqrt(var(data))

    logMu = 0
    
    len = length(data)
    
    logSumVal = 0
    
    sumVal = 0

    for(i in (1:length(data)))
    {
        if(data[i] <= 0)
        {
            return [];
        }

		logMu = logMu + log(data[i]);
		
		sumVal = sumVal + data[i];
	}
	
	logSumVal = logMu;

	logMu = logMu / len;

	# console.log("gp: len=" + len + ", log sum=" + logSumVal.toString() + ", sum=" + sumVal);
	
	f1 <- function(a, b)
	{
		# print(paste("Len(f1): ", len, "   Log sum: ", logSumVal))

		return(len * log(b) - len * digamma(a) + logSumVal)
	}

	f2 <- function(a, b)
	{
		# console.log("Len(f2): " + len.toString() + "   Sum: " + sumVal.toString());

		return(len * a / b - sumVal)
	}

	f11 <- function(a, b)
	{
		return(-len * trigamma(a))
	}

	f12 <- function(a, b)
	{
		return(len / b)
	}

	f21 <- f12;

	f22 <- function(a, b)
	{
		return(- len * a / b**2)
	}

	alpha = (mu / sigma)**2
    
    beta = mu / sigma**2

    # print(f22(alpha, beta))

	# var s = mathjs.log(mu) - logMu;

	# var alpha = (3 - s + mathjs.sqrt((s - 3)**2 + 24 * s)) / (12 * s);

	# var beta = alpha / mu;

	# return(newtonMO2V(c(f1, f2), matrix(c(f11, f12, f21, f22), nrow = 2, byrow = TRUE), c(alpha, beta)))
	return(newtonMO2V(f1, f2, f11, f12, f21, f22, c(alpha, beta)))
    
}

input_data = read.csv('./aqipm25.csv', fileEncoding = "UTF-8-BOM")

# print(head(input_data))

result = gammaParameters(as.numeric(input_data$AQI))

# print(result)