'use strict'

const auxLib = require('./mylib/aux_lib');

var dataset = auxLib.readCSVsync('./dataset/wiki4HE.csv', 'UTF-8', ';', false);

var reformedData = [], rwVal;

for(var row = 0; row < dataset.length; ++row)
{
    rwVal = [];

    for(var col = 10; col < dataset[row].length; ++col)
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

const tupleLen = reformedData[0].length;

var nullSum;

for(var col = 0; col < tupleLen; ++col)
{
    nullSum = 0;

    for(var row = 0; row < reformedData.length; ++row)
    {
        if(reformedData[row][col] == null)
        {
            ++nullSum;
        }
    }

    console.log(nullSum.toString() + " NULL Values in column " + col.toString());
}