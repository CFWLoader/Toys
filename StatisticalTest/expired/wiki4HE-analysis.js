'use strict';

import auxLib from './lib/aux-lib';

import dataPreprocessor from './lib/data-preprocessor';

import spMath from './lib/special-math';

import mathjs from 'mathjs';

import multiRegress from './lib/multivariate-regress';

let dataset = auxLib.readCSVsync('./dataset/wiki4HE.csv', 'UTF-8', ';', false);

dataset.pop();

let reformedData = [], rwVal, tupleLen = 17;

for(let row = 0; row < dataset.length; ++row)
{
    rwVal = [];

    for(let col = 10; col < tupleLen; ++col)
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

let cleaned1 = dataPreprocessor.removeMissings(reformedData);

let w = multiRegress.deriveMultivariateLinearParameters(cleaned1, 0);

let x = multiRegress.excludeColumn(cleaned1, 0);

let y = multiRegress.extractColumn(cleaned1, 0);

console.log(y[2]);

console.log(mathjs.multiply(x[2], w));

// const tupleLen = reformedData[0].length;

// var nullSum;

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