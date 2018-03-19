spMath = require('./sp_math.js')

function normality(data) 
{
    transformed = [];

    mu = spMath.mean(data);

    sigmaSqr = spMath.variance(data);

    sigma = Math.sqrt(sigmaSqr);

    for (i = 0; i < data.length; ++i) {
        // transformed.push(Math.exp(-(data[i] - mu)**2 / (2 * sigmaSqr)) / (Math.sqrt(2 * Math.PI) * std_var))

        transformed.push(0.5 + erf((data[i] - mu) / (Math.SQRT2 * sigma)) / 2);

    }

    return transformed.sort();

}