'use strict';

import fs from 'fs';

import auxLib from './lib/aux-lib';

import multiRegress from './lib/multivariate-regress';

import preprocessor from './lib/data-preprocessor';

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
        }
        else
        {
            rwVal.push(parseInt(dataset[row][col]));
        }
    }

    reformedData.push(rwVal);
}

// var cleaned1 = preprocessor.removeMissings(reformedData);

// var w = multiRegress.deriveMultivariateLinearParameters(cleaned1, 0);

// console.log(w);

// for(var row = 0; row < 25; ++row)
// {
//     console.log(reformedData[row]);
// }

let cleaned2 = preprocessor.fillMissingsWithMLR(reformedData);

for(let row = 0; row < cleaned2.length; ++row)
{
    for(let col = 0; col < cleaned2[row].lenght; ++col)
    {
        if(cleaned2[row][col] == null)
        {
            console.log("Null detected at [" + row.toString() + ', ' + col.toString() + ']');
        }
        else if(cleaned2[row][col] < 0)
        {
            console.log("Below 0 detected at [" + row.toString() + ', ' + col.toString() + ']');
        }
        else if(cleaned2[row][col] > 5)
        {
            console.log("Exceed 5 detected at [" + row.toString() + ', ' + col.toString() + ']');
        }
    }
}

console.log("Regression finished.");

// var x = multiRegress.excludeColumn(cleaned1, 0);

// var y = multiRegress.extractColumn(cleaned1, 0);

// console.log(y[2]);

// console.log(mathjs.multiply(x[2], w));