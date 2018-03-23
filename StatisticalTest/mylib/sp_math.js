'use strict';

var mathjs = require('mathjs');

var digamma = require('math-digamma');

function gamma(x)
{
    var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
 
    var g = 7;
    if (x < 0.5) {
        return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
    }
 
    x -= 1;
    var a = p[0];
    var t = x + g + 0.5;
    for (var i = 1; i < p.length; i++) {
        a += p[i] / (x + i);
    }
 
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}

function erf(x) {
    // constants
    a1 = 0.254829592;
    a2 = -0.284496736;
    a3 = 1.421413741;
    a4 = -1.453152027;
    a5 = 1.061405429;
    p = 0.3275911;

    // Save the sign of x
    sign = 1;

    if (x < 0) {
        sign = -1;
    }

    x = Math.abs(x);

    // A&S formula 7.1.26
    t = 1.0 / (1.0 + p * x);

    y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

function mean(data)
{
    var mu = 0;

    for(i = 0; i < data.length; ++i)
    {
        mu += data[i];
    }

    return mu /= data.length;
}

function means(dataset)
{
	var mus = [], tupleLen = dataset[0].length;

	for(var col = 0; col < tupleLen; ++col)
	{
		mus.push(0);
	}

	for(var row = 0; row < dataset.length; ++row)
	{
		for(var col = 0; col < tupleLen; ++col)
		{
			if(dataset[row][col] == null)
			{
				continue;
			}

			mus[col] += dataset[row][col];
		}
	}

	for(var col = 0; col < tupleLen; ++col)
	{
		mus[col] /= dataset.length;
	}

    return mus;
}

function variance(data)
{
    mu = mean(data);

    varia = 0;

    for(i = 0; i < data.length; ++i)
    {
        varia += (data[i] - mu)**2;
    }

    return varia /= data.length;
}

function newtonMethodOpt2Var(firstDrv, secondDrv, xArray, initialVal, epsilon = 1e-13)
{
	var x = [initialVal[0], initialVal[1]];

	var hessian = [
		[secondDrv[0][0](x[0], x[1], xArray), secondDrv[0][1](x[0], x[1], xArray)],
		[secondDrv[1][0](x[0], x[1], xArray), secondDrv[1][1](x[0], x[1], xArray)]
	];

	var hessianInv = mathjs.inv(hessian);

	var jaccob = [firstDrv[0](x[0], x[1], xArray), firstDrv[1](x[0], x[1], xArray)];

	// console.log(firstDrv[0](x[0], x[1]));

	var deltax = mathjs.multiply(hessianInv, jaccob);

	var xn = [x[0] - deltax[0], x[1] - deltax[1]];

	// console.log("Delta: " + deltax.toString());

	// return {"alpha" : 0, "beta" : 0};

	// var iterations = 0;

	// while(iterations < 2000)
	while(mathjs.abs(xn[0] - x[0]) > epsilon || mathjs.abs(xn[1] - x[1]) > epsilon)
	{
		// ++iterations;

		// console.log("[" + iterations.toString() + "]:" + mathjs.abs(xn[0] - x[0]).toString() + "   " + mathjs.abs(xn[1] - x[1]).toString());

		// console.log("Iteration: " + iterations.toString());

		// console.log("X:" + x.toString());

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
	
		// console.log(hessianInv[0]);

		// console.log(hessianInv[1]);

		// console.log(jaccob);

		// console.log("Delta: " + deltax.toString());
	}

	// console.log("Newton iterated " + iterations.toString());

	return {"shape1" : x[0] - deltax[0], "shape2" : x[1] - deltax[1]};

	// while(mathjs.abs(xn[0] - x[0]) > epsilon && mathjs.abs(xn[1] - x[0]))
	// {
	// 	x[0] = xn[0], x[1] = xn[1];
	// }
}

// Using maximum likehood. https://en.wikipedia.org/wiki/Gamma_distribution#Maximum_likelihood_estimation
function gammaParameters(data)
{
	var mu = spMath.mean(data), sigma = mathjs.sqrt(spMath.variance(data));

    var logMu = 0, len = data.length, logSumVal = 0, sumVal = 0;

    for(i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return [];
        }

		logMu += mathjs.log(data[i]);
		
		sumVal += data[i];
	}
	
	logSumVal = logMu;

	logMu /= data.length;

	// console.log("gp: len=" + len + ", log sum=" + logSumVal.toString() + ", sum=" + sumVal);
	
	var f1 = function(a, b, xArr)
	{
		// console.log("Len(f1): " + len.toString() + "   Log sum: " + logSumVal.toString());

		return len * mathjs.log(b) - len * digamma(a) + logSumVal;
	}

	var f2 = function(a, b, xArr)
	{
		// console.log("Len(f2): " + len.toString() + "   Sum: " + sumVal.toString());

		return len * a / b - sumVal;
	}

	var f11 = function(a, b, xArr)
	{
		return -len * trigamma(a);
	}

	var f12 = function(a, b, xArr)
	{
		return len / b;
	}

	var f21 = f12;

	var f22 = function(a, b, xArr)
	{
		return - len * a / b**2;
	}

	var alpha = (mu / sigma)**2, beta = mu / sigma**2;

	// var s = mathjs.log(mu) - logMu;

	// var alpha = (3 - s + mathjs.sqrt((s - 3)**2 + 24 * s)) / (12 * s);

	// var beta = alpha / mu;

	return newtonMethodOpt2Var([f1, f2], [[f11, f12], [f21, f22]], data, [alpha, beta]);

    // var s = mathjs.log(mu) - logMu;

	// var alpha = (3 - s + mathjs.sqrt((s - 3)**2 + 24 * s)) / (12 * s);
	
	// var nextAlpha = alpha - (mathjs.log(alpha) - digamma(alpha) - s) / (1 / alpha - spMath.trigamma(alpha));

	// while(nextAlpha - alpha > 1e-12)
	// {
	// 	alpha = nextAlpha;

	// 	nextAlpha = alpha - (mathjs.log(alpha) - digamma(alpha) - s) / (1 / alpha - spMath.trigamma(alpha));
	// }
}

function weibullParameters(data)
{
	var f1 = function(a, b, xArr)
	{
		var arraySum = 0;

		for(var i = 0; i < xArr.length; ++i)
		{
			arraySum += mathjs.pow(xArr[i] / a, b);
		}

		return - xArr.length * b / a + b * arraySum / a;
	}

	var f2 = function(a, b, xArr)
	{
		var lnSum = 0, arraySum = 0;

		for(var i = 0; i < xArr.length; ++i)
		{
			lnSum += mathjs.log(xArr[i]);

			arraySum += (mathjs.pow(xArr[i] / a, b) * mathjs.log(xArr[i] / a));
		}

		return xArr.length / b - xArr.length * mathjs.log(a) + lnSum - arraySum;
	}

	var f11 = function(a, b, xArr)
	{
		var arraySum = 0;

		for(var i = 0; i < xArr.length; ++i)
		{
			arraySum += mathjs.pow(xArr[i] / a, b);
		}

		return b * (xArr.length - (b + 1) * arraySum) / a**2;
	}

	var f12 = function(a, b, xArr)
	{
		var sum1 = 0, arraySum = 0;

		for(var i = 0; i < xArr.length; ++i)
		{
			sum1 += mathjs.pow(xArr[i] / a, b);

			arraySum += (mathjs.pow(xArr[i] / a, b) * mathjs.log(xArr[i] / a));
		}

		return -(xArr.length - sum1 - b * arraySum) / a;
	}

	var f21 = f12;

	var f22 = function(a, b, xArr)
	{
		var arraySum = 0;

		for(var i = 0; i < xArr.length; ++i)
		{
			arraySum += (mathjs.pow(xArr[i] / a, b) * mathjs.log(xArr[i] / a))**2;
		}

		return -xArr.length / b**2 - arraySum;
	}

	return newtonMethodOpt2Var([f1, f2], [[f11, f12], [f21, f22]], data, [1, 1]);
}

// MODULES //

var gamma = require( 'gamma' );


// VARIABLES //

var EPSILON = 1e-12;


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
function gammainc_u( x, s, regularized ) {


	if ( x <= 1.1 || x <= s ) {
		if ( regularized !== false ) {
			return 1 - gammainc_l( x, s, regularized );
		} else {
			return gamma( s ) - gammainc_l( x, s, regularized );
		}
	}

	var f = 1 + x - s,
		C = f,
		D = 0,
		i = 1,
		a, b, chg;
	for ( i = 1; i < 10000; i++ ) {
		a = i * (s - i);
		b = (i<<1) + 1 + x - s;
		D = b + a * D;
		C = b + a / C;
		D = 1 / D;
		chg = C * D;
		f *= chg;
		if ( Math.abs( chg - 1 ) < EPSILON ) {
			break;
		}
	}
	if ( regularized !== false ) {
		return Math.exp(s * Math.log( x ) - x - gamma.log( s ) - Math.log(f) );
	} else {
		return Math.exp(s * Math.log( x ) - x - Math.log(f) );
	}
}

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
function gammainc_l( x, s, regularized ) {
	if ( x === 0) {
		return 0;
	}
	if ( x < 0 || s <= 0 ) {
		return NaN;
	}

	if( x > 1.1 && x > s ) {
		if ( regularized !== false ) {
			return 1 - gammainc_u( x, s, regularized );
		} else {
			return gamma( s ) - gammainc_u( x, s, regularized );
		}
	}

	var ft,
		r = s,
		c = 1,
		pws = 1;

	if ( regularized !== false ) {
		ft = s * Math.log( x ) - x - gamma.log( s );
	} else {
		ft = s * Math.log( x ) - x;
	}
	ft = Math.exp( ft );
	do {
		r += 1;
		c *= x/r;
		pws += c;
	} while ( c / pws > EPSILON );
	return pws*ft/s;
}

/*
* NOTE: the original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_55_0/boost/math/special_functions/trigamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/**
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( 'math-evalrational' ).factory;
var floor = require( 'math-floor' );
var pow = require( 'math-power' );
var sinpi = require( 'math-sinpi' );


// CONSTANTS //

var Y_OFFSET_2_4 = 3.558437347412109375;
var PI = require( 'const-pi' );

// Polynomial coefficients...
var P_1_2 = [
	-0.999999999999999082554457936871832533,
	-4.71237311120865266379041700054847734,
	-7.94125711970499027763789342500817316,
	-5.74657746697664735258222071695644535,
	-0.404213349456398905981223965160595687,
	2.47877781178642876561595890095758896,
	2.07714151702455125992166949812126433,
	0.858877899162360138844032265418028567,
	0.20499222604410032375789018837922397,
	0.0272103140348194747360175268778415049,
	0.0015764849020876949848954081173520686
];
var Q_1_2 = [
	1.0,
	4.71237311120863419878375031457715223,
	9.58619118655339853449127952145877467,
	11.0940067269829372437561421279054968,
	8.09075424749327792073276309969037885,
	3.87705890159891405185343806884451286,
	1.22758678701914477836330837816976782,
	0.249092040606385004109672077814668716,
	0.0295750413900655597027079600025569048,
	0.00157648490200498142247694709728858139,
	0.161264050344059471721062360645432809e-14
];
var P_2_4 = [
	-2.55843734739907925764326773972215085,
	-12.2830208240542011967952466273455887,
	-23.9195022162767993526575786066414403,
	-24.9256431504823483094158828285470862,
	-14.7979122765478779075108064826412285,
	-4.46654453928610666393276765059122272,
	-0.0191439033405649675717082465687845002,
	0.515412052554351265708917209749037352,
	0.195378348786064304378247325360320038,
	0.0334761282624174313035014426794245393,
	0.002373665205942206348500250056602687,
	0
];
var Q_2_4 = [
	1.0,
	4.80098558454419907830670928248659245,
	9.99220727843170133895059300223445265,
	11.8896146167631330735386697123464976,
	8.96613256683809091593793565879092581,
	4.47254136149624110878909334574485751,
	1.48600982028196527372434773913633152,
	0.319570735766764237068541501137990078,
	0.0407358345787680953107374215319322066,
	0.00237366520593271641375755486420859837,
	0.239554887903526152679337256236302116e-15,
	-0.294749244740618656265237072002026314e-17
];
var P_4_8 = [
	0.166626112697021464248967707021688845e-16,
	0.499999999999997739552090249208808197,
	6.40270945019053817915772473771553187,
	41.3833374155000608013677627389343329,
	166.803341854562809335667241074035245,
	453.39964786925369319960722793414521,
	851.153712317697055375935433362983944,
	1097.70657567285059133109286478004458,
	938.431232478455316020076349367632922,
	487.268001604651932322080970189930074,
	119.953445242335730062471193124820659
];
var Q_4_8 = [
	1.0,
	12.4720855670474488978638945855932398,
	78.6093129753298570701376952709727391,
	307.470246050318322489781182863190127,
	805.140686101151538537565264188630079,
	1439.12019760292146454787601409644413,
	1735.6105285756048831268586001383127,
	1348.32500712856328019355198611280536,
	607.225985860570846699704222144650563,
	119.952317857277045332558673164517227,
	0.000140165918355036060868680809129436084
];
var P_8_16 = [
	-0.184828315274146610610872315609837439e-19,
	0.500000000000000004122475157735807738,
	3.02533865247313349284875558880415875,
	13.5995927517457371243039532492642734,
	35.3132224283087906757037999452941588,
	67.1639424550714159157603179911505619,
	83.5767733658513967581959839367419891,
	71.073491212235705900866411319363501,
	35.8621515614725564575893663483998663,
	8.72152231639983491987779743154333318
];
var Q_8_16 = [
	1.0,
	5.71734397161293452310624822415866372,
	25.293404179620438179337103263274815,
	62.2619767967468199111077640625328469,
	113.955048909238993473389714972250235,
	130.807138328938966981862203944329408,
	102.423146902337654110717764213057753,
	44.0424772805245202514468199602123565,
	8.89898032477904072082994913461386099,
	-0.0296627336872039988632793863671456398
];
var P_16_INF = [
	0.0,
	0.500000000000000000000000000000087317,
	0.345625669885456215194494735902663968,
	9.62895499360842232127552650044647769,
	3.5936085382439026269301003761320812,
	49.459599118438883265036646019410669,
	7.77519237321893917784735690560496607,
	74.4536074488178075948642351179304121,
	2.75209340397069050436806159297952699,
	23.9292359711471667884504840186561598,
	0
];
var Q_16_INF = [
	1.0,
	0.357918006437579097055656138920742037,
	19.1386039850709849435325005484512944,
	0.874349081464143606016221431763364517,
	98.6516097434855572678195488061432509,
	-16.1051972833382893468655223662534306,
	154.316860216253720989145047141653727,
	-40.2026880424378986053105969312264534,
	60.1679136674264778074736441126810223,
	-13.3414844622256422644504472438320114,
	2.53795636200649908779512969030363442
];

// Compile functions to evaluate rational functions based on the above coefficients...

var rateval_1_2 = evalrational( P_1_2, Q_1_2 );
var rateval_2_4 = evalrational( P_2_4, Q_2_4 );
var rateval_4_8 = evalrational( P_4_8, Q_4_8 );
var rateval_8_16 = evalrational( P_8_16, Q_8_16 );
var rateval_16_INF = evalrational( P_16_INF, Q_16_INF );


// TRIGAMMA //

/**
* FUNCTION: trigamma( x )
*	Evaluates the trigamma function.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function trigamma( x ) {
	var result = 0;
	var s;
	var y;
	var z;
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


// EXPORTS //

// module.exports = trigamma;

// EXPORTS


// module.exports = {
// 	'lower': gammainc_l,
// 	'upper': gammainc_u
// };

module.exports =
{
    "gamma" : gamma,
    "erf" : erf,
	"mean" : mean,
	"means" : means,
    "variance" : variance,
    "regularizedLowerIncompleteGamma" : gammainc_l,
	"regularizedupperIncompleteGamme" : gammainc_u,
	"gammaParameters" : gammaParameters,
	"weibullParameters" : weibullParameters,
	"trigamma" : trigamma
};