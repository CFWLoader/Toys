'use strict'

const auxLib = require('./mylib/aux_lib');

const dataPreprocessor = require('./mylib/data_preprocessor');

const spMath = require('./mylib/sp_math');

const multiRegress = require('./mylib/multivariate_regress');

var dataset = auxLib.readCSVsync('./dataset/wiki4HE.csv', 'UTF-8', ';', false);

dataset.pop();

var reformedData = [], rwVal, tupleLen = 16;

for(var row = 0; row < dataset.length; ++row)
{
    rwVal = [];

    for(var col = 10; col < tupleLen; ++col)
    {
        if(dataset[row][col] == '?')
        {
            rwVal.push(null);
            // console.log(dataset[row][0].toString() + '[' + row.toString() + ', ' + col.toString() + ']');
        }
        else
        {
            rwVal.push(parseInt(dataset[row][col]));
        }
    }

    reformedData.push(rwVal);
    // console.log();
}

// console.log(reformedData[0]);

var cleaned1 = dataPreprocessor.removeMissings(reformedData);

console.log(cleaned1[0]);

var x = multiRegress.excludeColumn(cleaned1, 2);

console.log(x[0]);

var y = multiRegress.extractColumn(cleaned1, 2);

console.log(y[0]);

// const tupleLen = reformedData[0].length;

var nullSum;

// var globalValues = spMath.means(reformedData);

// var cleaned = dataPreprocessor.fillMissingsWithGlobal(reformedData, globalValues);

// for(var col = 0; col < tupleLen; ++col)
// {
//     nullSum = 0;

//     for(var row = 0; row < cleaned.length; ++row)
//     {
//         if(cleaned[row][col] == null)
//         {
//             // console.log("Row=" + row.toString() + ", Col=" + col.toString());
//             ++nullSum;
//         }
//     }

//     console.log(nullSum.toString() + " NULL Values in column " + col.toString());
// }


// console.log(cleaned.length);