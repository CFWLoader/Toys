'use strict';

import spMath from './special-math';

import mathjs from 'mathjs';

import {ibeta, lowRegGamma, mean, variance, erf, gamma as cgamma} from 'jstat';

/**
 * Transform a array via normality's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function normality(data) 
{
    let transformed = [];

    let mu = mean(data);

    let sigma = mathjs.sqrt(variance(data));

    for(let i = 0; i < data.length; ++i) 
    {
        transformed.push(0.5 + erf((data[i] - mu) / (mathjs.SQRT2 * sigma)) / 2);
    }

    return mathjs.sort(transformed);

}

/**
 * Transform a array via log-normality's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function logNormality(data) {

    let mu = 0, sigmaSqr = 0;

    for(let i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        mu += mathjs.log(data[i]);
    }

    mu /= data.length;

    for(let i = 0; i < data.length; ++i)
    {
        sigmaSqr += (mathjs.log(data[i]) - mu) ** 2;
    }

    sigmaSqr /= data.length;

    let log_mean = mu, log_sd = mathjs.sqrt(sigmaSqr);

    let transformed = [];

    for(let i = 0; i < data.length; ++i) 
    {    
        transformed.push(0.5 + erf((mathjs.log(data[i]) - log_mean) / (mathjs.SQRT2 * log_sd)) / 2);
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a array via uniform's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function uniform(data) {

    let minVal = data.reduce(function (a, b) { return a < b ? a : b; });

    let maxVal = data.reduce(function (a, b) { return a > b ? a : b; });

    let len = maxVal - minVal;

    let transformed = [];

    for(let i = 0; i < data.length; ++i) {
        transformed.push((data[i] - minVal) / len);
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a array via triangle's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function triangle(data) 
{
    let a = data[0], b = data[0], c = data[0], z = 0;

    for (let i = 0; i < data.length; ++i)
    {
        if (a > data[i]) {
            a = data[i];
        }

        if (c < data[i]) {
            c = data[i];
        }
    }

    for(let i = 0; i < data.length; ++i)
    {
        z += (data[i] - a) / (c - a);
    }

    z /= data.length;

    let len = c - a;

    b = a + len * (3 * z - 1);

    if(b < a)
    {
        b = a;
    }
    else if(b > c)
    {
        b = c;
    }

    let transformed = [];

    for(let i = 0; i < data.length; ++i) 
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

/**
 * Transform a array via exponent's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function exponent(data) {
    
    let mu = mean(data);

    let lambda = 1 / mu;

    let transformed = [];

    for(let i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        transformed.push(1 - mathjs.exp(- lambda * data[i]));
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a array via beta's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function beta(data)
{
    for(let i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0 || data[i] >= 1)
        {
            return [];
        }
    }

    let parameters = spMath.betaParameters(data);

    let alpha = parameters['shape1'], beta = parameters['shape2'];

    let betaFunVal = cgamma(alpha) * cgamma(beta) / cgamma(alpha + beta);

    let transformed = [];

    for(let i = 0; i < data.length; ++i)
    {
        transformed.push(betaFunVal * ibeta(data[i], alpha, beta));
    }

    return transformed;
}

/**
 * Transform a array via gamma's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function gamma(data)
{
    let parameters = spMath.gammaParameters(data);

    let alpha = parameters["alpha"], beta = parameters["beta"];

    let transformed = [];

    for(let i = 0; i < data.length; ++i)
    {
        transformed.push(lowRegGamma(beta * data[i], alpha));
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a array via weibull's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function weibull(data)
{
    let parameters = spMath.weibullParameters(data);

    let lambda = parameters["shape1"], k = parameters["shape2"];

    let transformed = [];

    for(let i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

        transformed.push(1 - mathjs.exp(- mathjs.pow(data[i] / lambda, k)));
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