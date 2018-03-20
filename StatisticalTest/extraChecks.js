var transformations = require('./mylib/transformations.js');

var oneKey = require('./mylib/statistic_test.js').OneKeyTestReport;

var fs = require('fs');

console.log("Uniform:")
var file = ".\\unif_dist1.json";
var dist_data = JSON.parse(fs.readFileSync(file));

var transformed = transformations.uniform(dist_data);

for(i = 0; i < transformed.length; ++i)
{
    if(transformed[i] <= 0 || transformed[i] >= 1)
    {
        console.log("[" + i.toString() + "]:" + transformed[i]);
    }
}