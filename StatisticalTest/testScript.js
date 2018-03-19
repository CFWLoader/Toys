transformations = require('./mylib/transformations.js');

spMath = require('./mylib/sp_math.js');

statisticTest = require('./mylib/statistic_test.js');

var adTest = statisticTest.AndersonDarling, ksTest = statisticTest.KolmogorovSmirnov;

function formatDisplay(val)
{
    if(typeof(val) == 'number')
    {
        return val.toFixed(5).toString();
    }
    else
    {
        return val;
    }
}

function batchTest(dist_data) {

    console.log("|Normal|" + formatDisplay(adTest.pValueNormal(dist_data)) + "|" + formatDisplay(ksTest.pValueNormal(dist_data)) + "|");    
    
    console.log("|Log-Normal|" + formatDisplay(adTest.pValueLogNormal(dist_data)) + "|" + formatDisplay(ksTest.pValueLogNormal(dist_data)) + "|");

    console.log("|Uniform|" + formatDisplay(adTest.pValueUniform(dist_data)) + "|" + formatDisplay(ksTest.pValueUniform(dist_data)) + "|");

    console.log("|Triangular|N/A|N/A|");

    console.log("|Exponential|" + formatDisplay(adTest.pValueExponential(dist_data)) + "|" + formatDisplay(ksTest.pValueExponential(dist_data)) + "|");

    console.log("|Beta|N/A|N/A|");

    console.log("|Gamma|" + formatDisplay(adTest.pValueGamma(dist_data)) + "|" + formatDisplay(ksTest.pValueGamma(dist_data)) + "|");

    console.log("|Weibull|" + formatDisplay(adTest.pValueWeibull(dist_data)) + "|" + formatDisplay(ksTest.pValueWeibull(dist_data)) + "|");

}
function batchTestReport(dist_data) {

    var adValue, adPvalue, ksValue, ksPvalue;

    console.log("Beta: N/A N/A");

    // adValue = adTest.test(dist_data)
    
    console.log("|Exponential|" + formatDisplay(adTest.pValueExponential(dist_data)) + "|" + formatDisplay(ksTest.pValueExponential(dist_data)) + "|");
    

    console.log("|Normal|" + formatDisplay(adTest.pValueNormal(dist_data)) + "|" + formatDisplay(ksTest.pValueNormal(dist_data)) + "|");    
    
    console.log("|Log-Normal|" + formatDisplay(adTest.pValueLogNormal(dist_data)) + "|" + formatDisplay(ksTest.pValueLogNormal(dist_data)) + "|");

    console.log("|Uniform|" + formatDisplay(adTest.pValueUniform(dist_data)) + "|" + formatDisplay(ksTest.pValueUniform(dist_data)) + "|");

    console.log("|Triangular|N/A|N/A|");

    console.log("|Gamma|" + formatDisplay(adTest.pValueGamma(dist_data)) + "|" + formatDisplay(ksTest.pValueGamma(dist_data)) + "|");

    console.log("|Weibull|" + formatDisplay(adTest.pValueWeibull(dist_data)) + "|" + formatDisplay(ksTest.pValueWeibull(dist_data)) + "|");

}

var fs = require('fs');

console.log("AQI:")
var file = ".\\aqi_dist.json";
var dist_data = JSON.parse(fs.readFileSync(file));
batchTest(dist_data);

// console.log("PM2.5:")
// var file = ".\\pm25_dist.json"
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

// console.log("Norm:");
// var file = ".\\norm_dist1.json"
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);

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
// batchTest(dist_data);

// console.log("Weibull:");
// var file = ".\\weib_dist1.json";
// var dist_data = JSON.parse(fs.readFileSync(file));
// batchTest(dist_data);