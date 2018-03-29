'use strict';

import {shape} from './shape';

import {trigamma} from './special-math';

import mathjs from 'mathjs';

import digamma from 'math-digamma';

/**
 * Optimized Newtow's method for approximate coefficients of original function.
 * @param {Array} firstDrv First derivative of original function. AKA Jacobian Matrix.
 * @param {Array[]} secondDrv Second derivative of original function. AKA Hessian Matrix.
 * @param {Array} xArray Observed values.
 * @param {Array} initialVal 
 * @param {Number} epsilon
 * @returns {Map}
 */
function newtonMethodOpt2Var(firstDrv, secondDrv, xArray, initialVal, epsilon = 1e-13)
{
	let x = [initialVal[0], initialVal[1]];

	let hessian = [
		[secondDrv[0][0](x[0], x[1], xArray), secondDrv[0][1](x[0], x[1], xArray)],
		[secondDrv[1][0](x[0], x[1], xArray), secondDrv[1][1](x[0], x[1], xArray)]
	];

	let hessianInv = mathjs.inv(hessian);

	let jaccob = [firstDrv[0](x[0], x[1], xArray), firstDrv[1](x[0], x[1], xArray)];

	let deltax = mathjs.multiply(hessianInv, jaccob);

	let xn = [x[0] - deltax[0], x[1] - deltax[1]];

	while(mathjs.abs(xn[0] - x[0]) > epsilon || mathjs.abs(xn[1] - x[1]) > epsilon)
	{
		x[0] = xn[0];

		x[1] = xn[1];

		hessian = [
			[secondDrv[0][0](x[0], x[1], xArray), secondDrv[0][1](x[0], x[1], xArray)],
			[secondDrv[1][0](x[0], x[1], xArray), secondDrv[1][1](x[0], x[1], xArray)]
		];
	
		hessianInv = mathjs.inv(hessian);
	
		jaccob = [firstDrv[0](x[0], x[1], xArray), firstDrv[1](x[0], x[1], xArray)];
	
		deltax = mathjs.multiply(hessianInv, jaccob);

		xn = [x[0] - deltax[0], x[1] - deltax[1]];
	}

	return new Map([['shape1', x[0] - deltax[0]], ['shape2', x[1] - deltax[1]]]);
}

/**
 * Retrieve parameters of gamma distribution.
 * Using maximum likehood. https://en.wikipedia.org/wiki/Gamma_distribution#Maximum_likelihood_estimation
 * @param {Map | Array} param
 * @returns {Map}
 */
function gammaParameters(param)
{
    let dataShape = null;

    if(Array.isArray(param))
    {
        dataShape = shape(param);
    }
    else if(param instanceof Map)
    {
        dataShape = param;
    }
    else
    {
        throw TypeError('Map or Array type required.');
    }

	let mu = dataShape.get('mean'), sigma = dataShape.get('sigma'), len = dataShape.get('length');

	let logSumVal = dataShape.get('logMean') * dataShape.get('length'), sumVal = dataShape.get('mean') * dataShape.get('length');

	let f1 = (a, b, xArr) =>
	{
		// let logSumVal = xArr.reduce((pre, val) => pre + mathjs.log(val), 0);

		return len * mathjs.log(b) - len * digamma(a) + logSumVal;
	}

	let f2 = (a, b, xArr) =>
	{
		// let sumVal = xArr.reduce((pre, val) => pre + val, 0);

		return len * a / b - sumVal;
	}

	let f11 = (a, b, xArr) =>
	{
		return -len * trigamma(a);
	}

	let f12 = (a, b, xArr) =>
	{
		return len / b;
	}

	let f21 = f12;

	let f22 = (a, b, xArr) =>
	{
		return - len * a / b**2;
	}

	let alpha = (mu / sigma)**2, beta = mu / sigma**2;

	return newtonMethodOpt2Var([f1, f2], [[f11, f12], [f21, f22]], null, [alpha, beta]);
}

/**
 * Retrieve parameters of beta distribution.
 * @param {Map | Array} param
 * @returns {Map}
 */
function betaParameters(param)
{
    let dataShape = null;

    if(Array.isArray(param))
    {
        dataShape = shape(param);
    }
    else if(param instanceof Map)
    {
        dataShape = param;
    }
    else
    {
        throw TypeError('Map or Array type required.');
    }

	let obsX = dataShape.get('mean');

    let obsSigma = dataShape.get('sigma');

    let len = dataShape.get('length');

	let lnSum = len * dataShape.get('logMean'), lnOneMinusSum = dataShape.get('logOneMinusSum');

	let f1 = (a, b, xArr) =>
	{
		return len * digamma(a + b) - len * digamma(a) + lnSum;
	}

	let f2 = (a, b, xArr) =>
	{
		return len * digamma(a + b) - len * digamma(b) + lnOneMinusSum;
	}

	let f11 = (a, b, xArr) =>
	{
		return len * (trigamma(a + b) - trigamma(a));
	}

	let f12 = (a, b, xArr) =>
	{
		return len * trigamma(a + b);
	}

	let f21 = f12;

	let f22 = (a, b, xArr) =>
	{
		return len * (trigamma(a + b) - trigamma(b));
	}

	let alpha = obsX * (obsX * (1 - obsX) / obsSigma**2 - 1), beta = (1 - obsX) * (obsX * (1 - obsX) / obsSigma**2 - 1);

	return newtonMethodOpt2Var([f1, f2], [[f11, f12], [f21, f22]], null, [alpha, beta]);
}

/**
 * Retrieve parameters of Weibull distribution.
 * @param {Array} data 
 * @returns {Map}
 */
function weibullParameters(data)
{
    let dataShape = null;

    if(Array.isArray(data))
    {
        dataShape = shape(data);
    }
    else
    {
        throw TypeError('Array type required.');
    }

	let f1 = (a, b, xArr) =>
	{
		let arraySum = xArr.reduce((pre, val) => pre + mathjs.pow(val / a, b), 0);

		return - xArr.length * b / a + b * arraySum / a;
	}

	let f2 = (a, b, xArr) =>
	{
		let lnSum = xArr.reduce((pre, val) => pre + mathjs.log(val), 0), 
			arraySum = xArr.reduce((pre, val) => pre + mathjs.pow(val / a, b) * mathjs.log(val / a), 0);

		return xArr.length / b - xArr.length * mathjs.log(a) + lnSum - arraySum;
	}

	let f11 = (a, b, xArr) =>
	{
		let arraySum = xArr.reduce((pre, val) => pre + mathjs.pow(val / a, b), 0);

		return b * (xArr.length - (b + 1) * arraySum) / a**2;
	}

	let f12 = (a, b, xArr) =>
	{
		let sum1 = xArr.reduce((pre, val) => pre + mathjs.pow(val / a, b), 0), 
			arraySum = xArr.reduce((pre, val) => pre + mathjs.pow(val / a, b) * mathjs.log(val / a), 0);

		return -(xArr.length - sum1 - b * arraySum) / a;
	}

	let f21 = f12;

	let f22 = (a, b, xArr) =>
	{
		let arraySum = xArr.reduce((pre, val) => pre + (mathjs.pow(val / a, b) * mathjs.log(val / a))**2, 0);

		return -xArr.length / b**2 - arraySum;
	}

	return newtonMethodOpt2Var([f1, f2], [[f11, f12], [f21, f22]], data, [1, 1]);
}

export {gammaParameters, betaParameters, weibullParameters}