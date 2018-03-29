'use strict';

import spMath from './special-math';

import mathjs from 'mathjs';

import {ibeta, lowRegGamma, erf, gamma as cgamma} from 'jstat';

/**
 * Transform a value via normality's CDF.
 * @param {Number} x
 * @returns {Number}
 */
function normality(x, mu, sigma)
{
    return 0.5 + erf((x - mu) / (mathjs.SQRT2 * sigma)) / 2;
}

/**
 * Transform a array via normality's CDF.
 * @param {Array} data
 * @param {Object} shape
 * @returns {Array}
 */
function normalityBatch(data, shape) 
{
    let transformed = [];

    let mu = shape.mean;

    let sigma = shape.sigma;

    for(let val of data) 
    {
        transformed.push(normality(val, mu, sigma));
        // transformed.push(0.5 + erf((data[i] - mu) / (mathjs.SQRT2 * sigma)) / 2);
    }

    return mathjs.sort(transformed);

}

/**
 * Transform a value via log-normality's CDF.
 * @param {Number} x 
 * @param {Number} logMean 
 * @param {Number} logSigma 
 * @returns {Number}
 */
function logNormality(x, logMean, logSigma)
{
    return 0.5 + erf((mathjs.log(x) - logMean) / (mathjs.SQRT2 * logSigma)) / 2;
}

/**
 * Transform a array via log-normality's CDF.
 * @param {Array} data 
 * @param {Object} shape
 * @returns {Array}
 */
function logNormalityBatch(data, shape) 
{
    let logMean = shape.logMean, logSd = shape.logSigma;

    let transformed = [];

    for(let val of data) 
    {    
        transformed.push(logNormality(val, logMean, logSigma));
        // transformed.push(0.5 + erf((mathjs.log(data[i]) - log_mean) / (mathjs.SQRT2 * log_sd)) / 2);
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a value via uniform's CDF.
 * @param {Number} x 
 * @param {Number} minVal 
 * @param {Number} maxVal
 * @returns {Number}
 */
function uniform(x, minVal, maxVal)
{
    if(x == minVal || x == maxVal)
    {
        return 0;
    }

    return (x - minVal) / (maxVal - minVal);
}

/**
 * Transform a array via uniform's CDF.
 * @param {Array} data 
 * @param {Object} shape
 * @returns {Array}
 */
function uniformBatch(data, shape) {

    let minVal = shape.min;

    let maxVal = shape.max;

    let transformed = [];

    for(let val of data) 
    {
        transformed.push(uniform(val, minVal, maxVal));
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a value via triangle's CDF.
 * @param {Number} x 
 * @param {Number} minVal 
 * @param {Number} maxVal 
 * @param {Number} mode 
 * @returns {Number}
 */
function triangle(x, minVal, maxVal, mode)
{
    if(x == minVal || x == maxVal)
    {
        return 0;
    }

    let len = maxVal - minVal;

    if (x < mode) 
    {
        return (x - minVal) * 2 / (len * (mode - minVal));
    }
    else if (x == mode) 
    {
        return 2 / len;
    }
    else 
    {
        return 1 - (maxVal - data[i]) * 2 / (len * (maxVal - mode));
    }
}

/**
 * Transform a array via triangle's CDF.
 * @param {Array} data 
 * @param {Object} shape
 * @returns {Array}
 */
function triangleBatch(data, shape) 
{
    let [minVal, maxVal, mode] = [shape.min, shape.max, shape.mode];
    
    let transformed = [];

    for(let val of data) 
    {
        transformed.push(triangle(val, minVal, maxVal, mode));
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a value via exponent's CDF.
 * @param {Number} x 
 * @param {Number} lambda 
 * @returns {Number}
 */
function exponent(x, lambda)
{
    return 1 - mathjs.exp(- lambda * x);
}

/**
 * Transform a array via exponent's CDF.
 * @param {Array} data 
 * @param {Object} shape
 * @returns {Array}
 */
function exponentBatch(data, shape) 
{
    let lambda = 1 / shape.mean;

    let transformed = [];

    for(let val of data)
    {
        transformed.push(exponent(val, lambda));
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a value via beta's CDF.
 * @param {Number} x 
 * @param {Number} shape1 
 * @param {Number} shape2 
 * @returns {Number}
 */
function beta(x, shape1, shape2, betaFunVal)
{
    return betaFunVal * ibeta(x, shape1, shape2);
}

/**
 * Transform a array via beta's CDF.
 * @param {Array} data 
 * @param {Array} shape
 * @returns {Array}
 */
function betaBatch(data, shape)
{
    let parameters = spMath.betaParameters(data, shape);

    let shape1 = parameters['shape1'], shape2 = parameters['shape2'];

    let betaFunVal = cgamma(shape1) * cgamma(shape2) / cgamma(shape1 + shape2);

    let transformed = [];

    for(let val of data)
    {
        transformed.push(beta(val, shape1, shape2, betaFunVal));
    }

    return transformed;
}

/**
 * Transform a value via gamma's CDF.
 * @param {Number} x
 * @param {Number} shape1
 * @param {Number} shape2
 * @returns {Number}
 */
function gamma(x, shape1, shape2)
{
    return lowRegGamma(shape2 * x, shape1)
}

/**
 * Transform an array via gamma's CDF.
 * @param {Array} data 
 * @param {Object} shape
 * @returns {Array}
 */
function gammaBatch(data, shape)
{
    let parameters = spMath.gammaParameters(shape);

    let alpha = parameters["alpha"], beta = parameters["beta"];

    let transformed = [];

    for(let i = 0; i < data.length; ++i)
    {
        transformed.push(gamma(data[i], alpha, beta));
    }

    return mathjs.sort(transformed);
}

/**
 * Transform a value via weibull's CDF.
 * @param {Number} x 
 * @param {Number} lambda 
 * @param {Number} k 
 * @returns {Number}
 */
function weibull(x, lambda, k)
{
    return 1 - mathjs.exp(- mathjs.pow(x / lambda, k))
}

/**
 * Transform an array via weibull's CDF.
 * @param {Array} data 
 * @returns {Array}
 */
function weibullBatch(data)
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

        transformed.push(weibull(x, lambda, k));

        // transformed.push(1 - mathjs.exp(- mathjs.pow(data[i] / lambda, k)));
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
    "weibull" : weibull,
    "normalityBatch" : normalityBatch,
    "logNormalityBatch" : logNormalityBatch,
    "uniformBatch" : uniformBatch,
    "triangleBatch" : triangleBatch,
    "exponentBatch" : exponentBatch,
    "betaBatch" : betaBatch,
    "gammaBatch" : gammaBatch,
    "weibullBatch" : weibullBatch
};