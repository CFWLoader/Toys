'use strict';

/**
 * Calculate complete gamma(x).
 * @param {Number} x 
 * @returns {Number}
 */
// function cgamma(x)
// {
//     const p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
//         771.32342877765313, -176.61502916214059, 12.507343278686905,
//         -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
//     ];
 
// 	const g = 7;
	
//     if (x < 0.5) {
//         return mathjs.PI / (mathjs.sin(mathjs.PI * x) * gamma(1 - x));
//     }
 
// 	x -= 1;
	
// 	let a = p[0];
	
// 	let t = x + g + 0.5;
	
//     for (let i = 1; i < p.length; i++) {
//         a += p[i] / (x + i);
//     }
 
//     return mathjs.sqrt(2 * mathjs.PI) * mathjs.pow(t, x + 0.5) * mathjs.exp(-t) * a;
// }

/**
 * Calculate error function's value of x.
 * @param {Number} x 
 * @returns {Number}
 */
// function erf(x) {
//     // constants
//     let a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;

//     // Save the sign of x
//     let sign = 1;

//     if (x < 0) {
//         sign = -1;
//     }

//     x = Math.abs(x);

//     // A&S formula 7.1.26
//     let t = 1.0 / (1.0 + p * x);

//     let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

//     return sign * y;
// }

/**
 * Calculate mean of an array.
 * @param {Array} data 
 * @returns {Number}
 */
// function mean(data)
// {
// 	if(data.length == 0)
// 	{
// 		return 0;
// 	}

//     let mu = 0;

//     for(let value of data)
//     {
//         mu += value;
//     }

//     return mu /= data.length;
// }

/**
 * Return variance of a sequence.
 * @param {Array} data 
 * @returns {Number}
 */
// function variance(data)
// {
//     let mu = mean(data);

//     let varia = 0;

//     for(let i = 0; i < data.length; ++i)
//     {
//         varia += (data[i] - mu)**2;
//     }

//     return varia /= data.length;
// }

// MODULES //

// const gamma = require( 'gamma' );


// VARIABLES //

// const EPSILON = 1e-12;


// UPPER INCOMPLETE GAMMA FUNCTION
// via modified Lentz's method for computing continued fraction, see README.md

/**
* FUNCTION: gammainc_u( x, s, regularized )
*	Computes the regularized upper incomplete gamma function
* @param {Number} x - function parameter
* @param {Number} s - function parameter
* @param {Boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @returns {Number} function value
*/
// function gammainc_u( x, s, regularized ) {


// 	if ( x <= 1.1 || x <= s ) {
// 		if ( regularized !== false ) {
// 			return 1 - gammainc_l( x, s, regularized );
// 		} else {
// 			return gamma( s ) - gammainc_l( x, s, regularized );
// 		}
// 	}

// 	let f = 1 + x - s,
// 		C = f,
// 		D = 0,
// 		i = 1,
// 		a, b, chg;
// 	for ( i = 1; i < 10000; i++ ) {
// 		a = i * (s - i);
// 		b = (i<<1) + 1 + x - s;
// 		D = b + a * D;
// 		C = b + a / C;
// 		D = 1 / D;
// 		chg = C * D;
// 		f *= chg;
// 		if ( Math.abs( chg - 1 ) < EPSILON ) {
// 			break;
// 		}
// 	}
// 	if ( regularized !== false ) {
// 		return Math.exp(s * Math.log( x ) - x - gamma.log( s ) - Math.log(f) );
// 	} else {
// 		return Math.exp(s * Math.log( x ) - x - Math.log(f) );
// 	}
// }

// LOWER INCOMPlETE GAMMA FUNCTION //
// via power series expansion, see README.md

/**
* FUNCTION: gammainc_l( x, s[, regularized] )
*	Computes the regularized lower incomplete gamma function
* @param {Number} x - function parameter
* @param {Number} s - function parameter
* @param {Boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @returns {Number} function value
*/
// function gammainc_l( x, s, regularized ) {
// 	if ( x === 0) {
// 		return 0;
// 	}
// 	if ( x < 0 || s <= 0 ) {
// 		return NaN;
// 	}

// 	if( x > 1.1 && x > s ) {
// 		if ( regularized !== false ) {
// 			return 1 - gammainc_u( x, s, regularized );
// 		} else {
// 			return gamma( s ) - gammainc_u( x, s, regularized );
// 		}
// 	}

// 	let ft,
// 		r = s,
// 		c = 1,
// 		pws = 1;

// 	if ( regularized !== false ) {
// 		ft = s * Math.log( x ) - x - gamma.log( s );
// 	} else {
// 		ft = s * Math.log( x ) - x;
// 	}
// 	ft = Math.exp( ft );
// 	do {
// 		r += 1;
// 		c *= x/r;
// 		pws += c;
// 	} while ( c / pws > EPSILON );
// 	return pws*ft/s;
// }
