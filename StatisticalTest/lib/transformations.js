'use strict';

import {gammaParameters, betaParameters, weibullParameters} from './estimators';

import mathjs from 'mathjs';

import {ibeta, lowRegGamma, erf, gammafn as cgamma} from 'jstat';

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
 * @param {Map} shape
 * @returns {Array}
 */
function normalityBatch(data, shape) 
{
    let transformed = [];

    let mu = shape.get('mean');

    let sigma = shape.get('sigma');

    for(let val of data) 
    {
        transformed.push(normality(val, mu, sigma));
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
 * @param {Map} shape
 * @returns {Array}
 */
function logNormalityBatch(data, shape) 
{
    let logMean = shape.get('logMean'), logSigma = shape.get('logSigma');

    let transformed = [];

    for(let val of data) 
    {    
        transformed.push(logNormality(val, logMean, logSigma));
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
    if(x <= minVal || x >= maxVal)
    {
        return 0;
    }

    return (x - minVal) / (maxVal - minVal);
}

/**
 * Transform a array via uniform's CDF.
 * @param {Array} data 
 * @param {Map} shape
 * @returns {Array}
 */
function uniformBatch(data, shape) {

    let minVal = shape.get('min');

    let maxVal = shape.get('max');

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
    if(x <= minVal || x >= maxVal)
    {
        return 0;
    }

    let len = maxVal - minVal;

    if (x < mode) 
    {
        return (x - minVal) ** 2 / (len * (mode - minVal));
    }
    else if (x == mode) 
    {
        return (x - minVal) / len;
    }
    else 
    {
        return 1 - (maxVal - x) ** 2 / (len * (maxVal - mode));
    }
}

/**
 * Transform a array via triangle's CDF.
 * @param {Array} data 
 * @param {Map} shape
 * @returns {Array}
 */
function triangleBatch(data, shape) 
{
    let [minVal, maxVal, mode] = [shape.get('min'), shape.get('max'), shape.get('mode')];
    
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
 * @param {Map} shape
 * @returns {Array}
 */
function exponentBatch(data, shape) 
{
    let lambda = 1 / shape.get('mean');

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
function beta(x, shape1, shape2)
{
    return ibeta(x, shape1, shape2);
    // return ibeta(x, shape1, shape2) * cgamma(shape1) * cgamma(shape2) / cgamma(shape1 + shape2);
}

/**
 * Transform a array via beta's CDF.
 * @param {Array} data 
 * @param {Map} shape
 * @returns {Array}
 */
function betaBatch(data, shape)
{
    let parameters = betaParameters(data, shape);

    let shape1 = parameters.get('shape1'), shape2 = parameters.get('shape2');

    // let betaFunVal = cgamma(shape1) * cgamma(shape2) / cgamma(shape1 + shape2);

    let transformed = [];

    for(let val of data)
    {
        transformed.push(beta(val, shape1, shape2));        
        // transformed.push(beta(val, shape1, shape2, betaFunVal));
    }

    return mathjs.sort(transformed);
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
 * @param {Map} shape
 * @returns {Array}
 */
function gammaBatch(data, shape)
{
    let parameters = gammaParameters(shape);

    let alpha = parameters.get('shape1'), beta = parameters.get('shape2');

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
    let parameters = weibullParameters(data);

    let lambda = parameters.get('shape1'), k = parameters.get('shape2');

    let transformed = [];

    for(let i = 0; i < data.length; ++i)
    {
        transformed.push(weibull(data[i], lambda, k));

        // transformed.push(1 - mathjs.exp(- mathjs.pow(data[i] / lambda, k)));
    }

    return mathjs.sort(transformed);
}

export { normality, logNormality, uniform, triangle, exponent, beta, gamma, weibull,
    normalityBatch, logNormalityBatch, uniformBatch, triangleBatch, exponentBatch,
    betaBatch, gammaBatch, weibullBatch };