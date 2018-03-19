function batchTest(dist_data) {
    // Calculating p value for normal dist.
    transformed = transformations.normality(dist_data);

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

    var pvalue, z;

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
var file = ".\\norm_dist1.json"
var dist_data = JSON.parse(fs.readFileSync(file));
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