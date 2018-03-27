import transformations from './mylib/transformations';

import spMath from './mylib/special-math.js';

import statisticTest from './mylib/statistic-test.js';

function andersonDarlingTest(data) {
    
    let n = data.length;

    let s = 0;

    for (let i = 0; i < data.length; ++i) {
        // console.log(data[i]);

        s += (2 * i + 1) * Math.log(data[i] * (1 - data[n - 1 - i]))      // Notice original is (2 * i - 1) and data[n + 1 - i]. Fix head offset.
    }

    // console.log(s);

    return -n - s / n;
}

function adpValueNormal(z, n) {
    
    let zStar = z * (1 + 0.75 / n + 2.25 / (n ** 2));

    // var math = require('mathjs');

    // console.log(zStar);

    if (zStar <= 0.2) {
        return 1 - Math.exp(-13.436 + 101.14 * zStar - 223.73 * (zStar ** 2));
    }
    else if (zStar <= 0.34) {
        return 1 - Math.exp(-8.318 + 42.796 * zStar - 59.938 * (zStar ** 2));
    }
    else if (zStar <= 0.6) {
        return Math.exp(0.9177 - 4.279 * zStar - 1.38 * (zStar ** 2));
    }
    else if (zStar <= 153.467) {
        return Math.exp(1.2937 - 5.709 * zStar + 0.0186 * (zStar ** 2));
    }
    else {
        return 0;
    }
}

function adpValueUniform(z) {
    let p = 0;

    let g = (zz) => {
        return (2.00012 + (0.247105 - (0.0649821 - (0.0347962 - (0.0116720 - 0.00168691 * zz) * zz) * zz) * zz) * zz);
    }

    let gg = (zz) => {
        return (1.0776 - (2.30695 - (0.43424 - (0.082433 - (0.008056 - 0.0003146 * zz) * zz) * zz) * zz) * zz);
    }

    if (z < 2) {
        p = 1 - Math.pow(z, - 0.5) * Math.exp(-1.2337141 / z) * g(z);
    }
    else {
        p = 1 - Math.exp(-Math.exp(gg(z)));
    }

    return p;
}

function adpValueExponent(adValue, n) {
    let zStar = adValue * (1 + 0.6 / n);

    // console.log(zStar);

    if (zStar <= 0.26) {
        return 1 - Math.exp(-12.2204 + 67.459 * zStar - 110.3 * (zStar ** 2));
    }
    else if (zStar <= 0.51) {
        return 1 - Math.exp(-6.1327 + 20.218 * zStar - 18.663 * zStar ** 2);
    }
    else if (zStar <= 0.95) {
        return Math.exp(0.9209 - 3.353 * zStar + 0.3 * zStar ** 2);
    }
    else if (zStar <= 10.03) {
        return Math.exp(0.731 - 3.008 * zStar + 0.15 * zStar ** 2);
    }

    return 0;
}

function adpValueGamma(adValue, alpha)
{

}

function kolmogorovSmirnovTest(data) {
    let len = data.length, wn = data.length;

    let wi = 1;

    let dplus = 0, dminus = 0, dp, dm;

    for (let i = 0; i < len; ++i, ++wi) {
        dp = Math.abs(data[i] - wi / wn);

        dm = Math.abs(data[i] - (wi - 1) / wn);

        dplus = dplus > dp ? dplus : dp;

        dminus = dminus > dm ? dminus : dm;
    }

    return Math.max(dplus, dminus);

    // D = Math.sqrt(dn) * dn;

    // k = 100;

    // var ak;

    // while(true)
    // {
    //     ak = 0;

    //     for(i = -k; i <= k; ++i)
    //     {
    //         ak += Math.pow(-1, i) * Math.exp(-2 * (i * D)**2);
    //     }

    //     if((Math.pow(-1, k + 1) * Math.exp(-2 * ((k + 1) * D)**2)) < 0.00001)
    //     {
    //         break;
    //     }
    // }

    // return 1 - ak;
}

function kspValueUniform(wn, dn) {
    let D = Math.sqrt(wn) * dn;

    let k = 100;

    let ak;

    while (true) {
        ak = 0;

        for (let i = -k; i <= k; ++i) {
            ak += Math.pow(-1, i) * Math.exp(-2 * (i * D) ** 2);
        }

        if ((Math.pow(-1, k + 1) * Math.exp(-2 * ((k + 1) * D) ** 2)) < 0.00001) {
            break;
        }
    }

    return 1 - ak;
}

function kspValueNormal(wn, dn) {
    let d = dn * (Math.sqrt(wn) - 0.01 + 0.85 / Math.sqrt(wn));

    if (d < 0.775) {
        return "0.15+";
    }
    else if (d < 0.819) {
        return "0.1~0.15";
    }
    else if (d < 0.895) {
        return "0.05~0.1";
    }
    else if (d < 0.995) {
        return "0.025~0.05";
    }
    else if (d < 1.035) {
        return "0.01~0.025";
    }
    else {
        return "0.01-"
    }
}

function kspValueExponent(wn, dn) {
    let d = (dn - 0.2 / wn) * (Math.sqrt(wn) + 0.25 + 0.5 / Math.sqrt(wn));

    if (d < 0.926) {
        return "0.15+";
    }
    else if (d < 0.995) {
        return "0.1~0.15";
    }
    else if (d < 1.094) {
        return "0.05~0.1";
    }
    else if (d < 1.184) {
        return "0.025~0.05";
    }
    else if (d < 1.298) {
        return "0.01~0.025";
    }
    else {
        return "0.01-"
    }
}

function batchTest(dist_data) {
    // Calculating p value for normal dist.
    let transformed = transformations.normality(dist_data), z, dn, pvalue, ksp;

    // z = andersonDarlingTest(transformed);
    // z = statisticTest.AndersonDarling.test(transformed);

    // dn = kolmogorovSmirnovTest(transformed);

    console.log("|Normal|" + statisticTest.AndersonDarling.pValueNormal(dist_data).toFixed(5).toString() + "|" + statisticTest.KolmogorovSmirnov.pValueNormal(dist_data) + "|");    
    // console.log("|Normal|" + z.toFixed(5).toString() + "|" + adpValueNormal(z, transformed.length).toFixed(5).toString() + "|" + dn.toFixed(5).toString() + "|" + kspValueNormal(transformed.length, dn).toString() + "|");

    // console.log('Nor:');

    // console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + adpValueNormal(z, transformed.length) + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + kspValueNormal(transformed.length, dn).toString());

    // Calculating p value for lognormal dist.
    // transformed = transformations.logNormality(dist_data);

    // var z, pvalue, dn, ksp;

    // if (transformed == 0) {
    //     z = 'N/A';

    //     pvalue = 'N/A';

    //     dn = 'N/A'

    //     ksp = 'N/A'
    // }
    // else {
    //     z = andersonDarlingTest(transformed).toFixed(5);

    //     pvalue = adpValueNormal(z, transformed.length).toFixed(5);

    //     dn = kolmogorovSmirnovTest(transformed).toFixed(5);

    //     ksp = kspValueNormal(transformed.length, dn);
    // }

    // console.log("|Log-Normal|" + z.toString() + "|" + pvalue.toString() + "|" + dn.toString() + "|" + ksp + "|");
    console.log("|Log-Normal|" + statisticTest.AndersonDarling.pValueLogNormal(dist_data) + "|" + statisticTest.KolmogorovSmirnov.pValueLogNormal(dist_data) + "|");
    

    // console.log('Lognor:');

    // console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + pvalue.toString() + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + ksp);

    // Calculating p value for uniform dist.
    transformed = transformations.uniform(dist_data);

    // transformed.shift();

    // transformed.pop();

    z = andersonDarlingTest(transformed);

    dn = kolmogorovSmirnovTest(transformed);

    console.log("|Uniform|" + z.toFixed(5).toString() + "|" + adpValueUniform(z).toFixed(5).toString() + "|" + dn.toFixed(5).toString() + "|" + kspValueUniform(transformed.length, dn).toFixed(5).toString() + "|");

    // console.log('Unif:');

    // console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + adpValueUniform(z).toString() + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + kspValueUniform(transformed.length, dn).toString());

    // Calculating ad value for trangular dist.
    transformed = transformations.triangle(dist_data);

    transformed.shift();

    transformed.pop();

    z = andersonDarlingTest(transformed);

    dn = kolmogorovSmirnovTest(transformed);

    console.log("|Triangular|" + z.toFixed(5).toString() + "|N/A" + "|" + dn.toFixed(5).toString() + "|N/A|");

    // console.log('Tria:');

    // console.log("AD-Value: " + z.toString() + "    p-Value(AD): N/A" + "    KS-Value: " + dn.toString() + "    p-Value(KS): N/A");

    // Calculating p value for exponent dist.
    transformed = transformations.exponent(dist_data);

    if (transformed == 0) {
        z = 'N/A';

        pvalue = 'N/A';

        dn = 'N/A';

        ksp = 'N/A';
    }
    else {
        z = andersonDarlingTest(transformed).toFixed(5);

        pvalue = adpValueExponent(z, transformed.length).toFixed(5);

        dn = kolmogorovSmirnovTest(transformed).toFixed(5);

        ksp = kspValueExponent(transformed.length, dn);
    }

    console.log("|Exponential|" + z.toString() + "|" + pvalue.toString() + "|" + dn.toString() + "|" + ksp + "|");

    // console.log('Exp:')

    // console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + pvalue.toString() + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + ksp);
}

var fs = require('fs');

// console.log("AQI:")
// var file = ".\\aqi_dist.json";
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

// console.log("PM2.5:")
// var file = ".\\pm25_dist.json"
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

console.log("Norm:");
let file = ".\\dataset\\norm_dist1.json"
let dist_data = JSON.parse(fs.readFileSync(file));
batchTest(dist_data);

// console.log("Log-Norm:");
// var file = ".\\lgnorm_dist1.json"
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

// console.log("Uniform:");
// var file = ".\\unif_dist1.json"
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

// console.log("Triangle:");
// var file = ".\\tri_dist1.json"
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

// console.log("Exponent:");
// var file = ".\\exp_dist1.json"
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

// console.log("Gamma:");
// var file = ".\\gamma_dist1.json";
// var dist_data = JSON.parse(fs.readFileSync(file));
// transformed = transformations.gamma(dist_data);
// adValue = andersonDarlingTest(transformed);
// alpha = spMath.mean(dist_data)**2 / spMath.variance(dist_data);