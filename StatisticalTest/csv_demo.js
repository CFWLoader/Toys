// var csv = require("fast-csv");
// csv
//  .fromPath("./aqipm25.csv", {headers : false})
//  .on("data", function(data){
//     //  console.log(data)
//     aqi_data.push(parseInt(data[0]));
//     pm25_data.push(parseInt(data[1]));
//  })
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

var file = ".\\norm_dist1.json";

var dist_data = JSON.parse(fs.readFileSync(file));