spMath = require('./sp_math.js')

function normality(data) 
{
    transformed = [];

    mu = spMath.mean(data);

    sigmaSqr = spMath.variance(data);

    sigma = Math.sqrt(sigmaSqr);

    for (i = 0; i < data.length; ++i) {
        transformed.push(0.5 + spMath.erf((data[i] - mu) / (Math.SQRT2 * sigma)) / 2);
    }

    return transformed.sort();

}

function logNormality(data) {

    transformed = [];

    mu = spMath.mean(data);

    sigmaSqr = spMath.variance(data);

    sigma = Math.sqrt(sigmaSqr);

    log_mean = Math.log(mu / Math.sqrt(1 + sigmaSqr / mu ** 2));

    log_sd = Math.sqrt(Math.log(1 + sigmaSqr / mu ** 2));

    for (i = 0; i < data.length; ++i) 
    {
        if(data[i] <= 0)
        {
            return [];
        }
        
        transformed.push(0.5 + spMath.erf((Math.log(data[i]) - log_mean) / (Math.SQRT2 * log_sd)) / 2);
    }

    return transformed.sort();
}

function uniform(data) {

    // var minVal = data.reduce(function (a, b) { return a < b ? a : b; });

    // var maxVal = data.reduce(function (a, b) { return a > b ? a : b; });

    var mu = spMath.mean(data), sigma = Math.sqrt(spMath.variance(data));

    var a1 = Math.sqrt(3) * sigma + mu, a2 = - Math.sqrt(3) * sigma + mu;

    var a, b;

    if(a1 < a2)
    {
        a = a1, b = a2;
    }
    else
    {
        a = a2, b = a1;
    }

    len = b - a;

    transformed = [];

    for (i = 0; i < data.length; ++i) {
        transformed.push((data[i] - a) / len);
    }

    return transformed.sort();
}

function triangle(data) 
{
    var a = b = c = data[0], mean = 0;

    for (i = 0; i < data.length; ++i) {
        if (a > data[i]) {
            a = data[i];
        }

        if (c < data[i]) {
            c = data[i];
        }

        mean += data[i];
    }

    a -= 0.001;

    c += 0.001;

    mean /= data.length;

    // console.log(a);

    // console.log(c);

    // console.log(mean);

    b = 3 * mean - a - c;           // From mean = (a + b + c) / 3

    transformed = [];

    len = c - a;

    for (i = 0; i < data.length; ++i) {
        if (data[i] < b) {
            transformed.push((data[i] - a) ** 2 / (len * (b - a)));
        }
        else if (data[i] == b) {
            transformed.push((b - a) / len);
        }
        else {
            transformed.push(1 - (c - data[i]) ** 2 / (len * (c - b)));
        }
    }

    return transformed.sort();
}

function exponent(data) {
    
    mu = spMath.mean(data);

    lambda = 1 / mu;

    transformed = [];

    for (i = 0; i < data.length; ++i)
     {
        if(data[i] <= 0)
        {
            return [];
        }

        transformed.push(1 - Math.exp(- lambda * data[i]));
    }

    return transformed.sort();
}

function beta(data)
{
    thorw("Transfomation for Beta distribution is unavailable now.");

    mu = spMath.mean(data);

    sigmaSqr = spMath.variance(data);

    alpha = mu**2 * ((1 - mu) / sigmaSqr - 1 / mu);

    beta = alpha * (1 / mu - 1);

    transformed = [];
}

function gamma(data)
{
    mu = spMath.mean(data);

    sigmaSqr = spMath.variance(data);

    beta = mu / sigmaSqr;

    alpha = mu * beta;

    transformed = [];

    for(i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        transformed.push(spMath.regularizedLowerIncompleteGamma(beta * data[i], alpha));

    }

    return transformed.sort();
}

function weibull(data)
{
    var mu = spMath.mean(data);

    var sigmaSqr = spMath.variance(data);

    var k = Math.pow(Math.sqrt(sigmaSqr) / mu, -1.086);

    var lambda = mu / spMath.gamma(1 + 1 / k);

    var transformed = [];

    for(i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        transformed.push(1 - Math.exp(- Math.pow(data[i] / lambda, k)));
    }

    return transformed.sort();
}

module.exports = 
{
    "normality" : normality,
    "logNormality" : logNormality,
    "uniform" : uniform,
    "triangle" : triangle,
    "exponent" : exponent,
    "beta" : beta,
    "gamma" : gamma,
    "weibull" : weibull
};