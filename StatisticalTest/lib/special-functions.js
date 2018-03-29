'use strict';

import mathjs, {floor, pow} from 'mathjs';

import {mean, variance} from 'jstat';

import digamma from 'math-digamma';

import sinpi from 'math-sinpi';

import {PI, Y_OFFSET_2_4, rateval_1_2, rateval_2_4, rateval_4_8, rateval_8_16, rateval_16_INF} from './constants';

/**
 * Calculate means of each columns.
 * @param {Array[]} dataset 
 * @returns {Array}
 */
function means(dataset)
{
	if(!Array.isArray(dataset) || !Array.isArray(dataset[0]))
	{
		return [];
	}

	let mus = [], tupleLen = dataset[0].length, validRowCount = [];

	for(let col = 0; col < tupleLen; ++col)
	{
		mus.push(0);
		validRowCount.push(0);
	}

	for(let row of dataset)
	{
		for(let col = 0; col < tupleLen; ++col)
		{
			if(null == row[col])
			{
				continue;
			}

			mus[col] += row[col];

			++validRowCount[col];
		}
	}

	for(let col = 0; col < tupleLen; ++col)
	{
		if(validRowCount[col] > 0)
		{
			mus[col] /= validRowCount[col];
		}
		else
		{
			mus[col] = 0;
		}
	}

    return mus;
}

// TRIGAMMA //

/**
* FUNCTION: trigamma( x )
*	Evaluates the trigamma function.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function trigamma( x ) {
	let result = 0;
	let s;
	let y;
	let z;
	// Check for negative arguments and use reflection:
	if ( x <= 0 ) {
		z = 1 - x;
		if ( floor( x ) === x ) {
			return NaN;
		}
		s = sinpi( x );
		return -trigamma( z ) + pow( PI, 2 ) / ( s * s );
	}
	if ( x < 1 ) {
		result = 1 / (x * x);
		x += 1;
	}

	if ( x <= 2 ) {
		result += (2 + rateval_1_2( x ) ) / (x * x);
	}
	else if ( x <= 4 ) {
		result += ( Y_OFFSET_2_4 + rateval_2_4( x ) ) / (x * x);
	}
	else if ( x <= 8 ) {
		y = 1 / x;
		result += ( 1 + rateval_4_8( y ) ) / x;
	}
	else if ( x <= 16 ) {
		y = 1 / x;
		result += ( 1 + rateval_8_16( y ) ) / x;
	 } else {
		y = 1 / x;
		result += ( 1 + rateval_16_INF( y ) ) / x;
	}
	return result;
} // end FUNCTION trigamma()

export {means, trigamma};