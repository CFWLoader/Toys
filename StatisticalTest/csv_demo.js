'use strict'

const fs = require('fs');

function readCSVsync(filePath, encoding = 'UTF-8', delimiter = ',')
{
    var lines = fs.readFileSync(filePath, encoding).split('\r\n');

    var result = [];

    for(var i = 0; i < lines.length; ++i)
    {
        result.push(lines[i].split(delimiter));
    }

    return result;
}

var dataset = readCSVsync('./dataset/AirQualityUCI.csv', 'UTF-8', ';');

console.log(dataset[1]);

//  .on("end", function(){

//     aqi_data.shift();

//     pm25_data.shift();

//     // console.log(aqi_data);

//     transformed = transformNormality(aqi_data);

//     // console.log(transformed);

//     z = andersonDarlingTest(transformed);

//     console.log("AD-Value for AQI: " + z.toString());

//     console.log("P-Value for AQI: " + pValueNormal(z, transformed.length).toString());

//     transformed = transformNormality(pm25_data);

//     z = andersonDarlingTest(transformed);

//     console.log("AD-Value for PM2.5: " + z.toString());

//     console.log("P-Value for PM2.5: " + pValueNormal(z, transformed.length).toString());
//  });

//     return transformed.sort();
// }