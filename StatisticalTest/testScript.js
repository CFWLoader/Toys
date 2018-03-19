transformations = require('./mylib/transformations.js');

spMath = require('./mylib/sp_math.js');

statisticTest = require('./mylib/statistic_test.js');

function batchTest(dist_data) {

    console.log("|Normal|" + statisticTest.AndersonDarling.pValueNormal(dist_data).toFixed(5).toString() + "|" + statisticTest.KolmogorovSmirnov.pValueNormal(dist_data) + "|");    
    
    console.log("|Log-Normal|" + statisticTest.AndersonDarling.pValueLogNormal(dist_data) + "|" + statisticTest.KolmogorovSmirnov.pValueLogNormal(dist_data) + "|");

    console.log("|Uniform|" + statisticTest.AndersonDarling.pValueUniform(dist_data).toFixed(5).toString() + "|" + statisticTest.KolmogorovSmirnov.pValueUniform(dist_data).toFixed(5).toString() + "|");

    console.log("|Triangular|N/A|N/A|");

    console.log("|Exponential|" + statisticTest.AndersonDarling.pValueExponential(dist_data) + "|" + statisticTest.KolmogorovSmirnov.pValueExponential(dist_data) + "|");

    console.log("|Gamma|" + statisticTest.AndersonDarling.pValueGamma(dist_data) + "|" + statisticTest.KolmogorovSmirnov.pValueGamma(dist_data) + "|");

    console.log("|Weibull|" + statisticTest.AndersonDarling.pValueWeibull(dist_data) + "|" + statisticTest.KolmogorovSmirnov.pValueWeibull(dist_data) + "|");

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

console.log("Weibull:");
var file = ".\\weib_dist1.json";
var dist_data = JSON.parse(fs.readFileSync(file));
batchTest(dist_data);