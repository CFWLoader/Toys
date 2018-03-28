'use strict';

import spMath from './special-math';

import mathjs from 'mathjs';

import {ibeta, lowRegGamma} from 'jstat';

function normality(data) 
{
    var transformed = [];

    var mu = spMath.mean(data);

    var sigma = mathjs.sqrt(spMath.variance(data));

    for(var i = 0; i < data.length; ++i) 
    {
        transformed.push(0.5 + spMath.erf((data[i] - mu) / (Math.SQRT2 * sigma)) / 2);
    }

    return mathjs.sort(transformed);

}

function logNormality(data) {

    var mu = 0, sigmaSqr = 0;

    for(var i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        mu += mathjs.log(data[i]);
    }

    mu /= data.length;

    for(i = 0; i < data.length; ++i)
    {
        sigmaSqr += (mathjs.log(data[i]) - mu) ** 2;
    }

    sigmaSqr /= data.length;

    var log_mean = mu, log_sd = mathjs.sqrt(sigmaSqr);

    var transformed = [];

    for(i = 0; i < data.length; ++i) 
    {    
        transformed.push(0.5 + spMath.erf((mathjs.log(data[i]) - log_mean) / (mathjs.SQRT2 * log_sd)) / 2);
    }

    return mathjs.sort(transformed);
}

function uniform(data) {

    var minVal = data.reduce(function (a, b) { return a < b ? a : b; });

    var maxVal = data.reduce(function (a, b) { return a > b ? a : b; });

    var len = maxVal - minVal;

    var transformed = [];

    for(var i = 0; i < data.length; ++i) {
        transformed.push((data[i] - minVal) / len);
    }

    return mathjs.sort(transformed);
}

function triangle(data) 
{
    var a = data[0], b = data[0], c = data[0], z = 0;

    for (var i = 0; i < data.length; ++i)
    {
        if (a > data[i]) {
            a = data[i];
        }

        if (c < data[i]) {
            c = data[i];
        }
    }

    for(i = 0; i < data.length; ++i)
    {
        z += (data[i] - a) / (c - a);
    }

    z /= data.length;

    var transformed = [];

    var len = c - a;

    b = a + len * (3 * z - 1);

    if(b < a)
    {
        b = a;
    }
    else if(b > c)
    {
        b = c;
    }

    transformed = [];

    for (i = 0; i < data.length; ++i) 
    {
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

    return mathjs.sort(transformed);
}

function exponent(data) {
    
    var mu = spMath.mean(data);

    var lambda = 1 / mu;

    var transformed = [];

    for(var i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        transformed.push(1 - Math.exp(- lambda * data[i]));
    }

    return mathjs.sort(transformed);
}

function beta(data)
{
    for(var i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0 || data[i] >= 1)
        {
            return [];
        }
    }

    var parameters = spMath.betaParameters(data);

    var alpha = parameters['shape1'], beta = parameters['shape2'];

    var betaFunVal = spMath.gamma(alpha) * spMath.gamma(beta) / spMath.gamma(alpha + beta);

    var transformed = [];

    for(i = 0; i < data.length; ++i)
    {
        transformed.push(betaFunVal * ibeta(data[i], alpha, beta));
    }

    return transformed;
}

function gamma(data)
{
    var parameters = spMath.gammaParameters(data);

    var alpha = parameters["alpha"], beta = parameters["beta"];

    var transformed = [];

    for(var i = 0; i < data.length; ++i)
    {
        transformed.push(lowRegGamma(beta * data[i], alpha));
    }

    return mathjs.sort(transformed);
}

function weibull(data)
{
    var parameters = spMath.weibullParameters(data);

    var lambda = parameters["shape1"], k = parameters["shape2"];

    var transformed = [];

    for(var i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        transformed.push(1 - Math.exp(- Math.pow(data[i] / lambda, k)));
    }

    return mathjs.sort(transformed);
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