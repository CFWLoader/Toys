'use strict';

const mathjs = require('mathjs');

function extractColumn(dataset, targetColumn)
{
    if(dataset.length == 0)
    {
        return [];
    }

    if(Object.prototype.toString.call(dataset[0]) != '[object Array]' || dataset[0].length <= targetColumn)
    {
        return [];
    }

    var result = [], tupleLen = dataset[0].length;
    
    for(var row = 0; row < dataset.length; ++row)
    {
        result.push(dataset[row][targetColumn]);
    }

    return result;
}

function excludeColumn(dataset, targetColumn)
{   
    if(dataset.length == 0)
    {
        return [];
    }

    if(Object.prototype.toString.call(dataset[0]) != '[object Array]' || dataset[0].length <= targetColumn)
    {
        return [];
    }

    var result = [], tupleLen = dataset[0].length, col, rwVal;
    
    for(var row = 0; row < dataset.length; ++row)
    {
        col = 0;

        rwVal = [];

        for(; col < targetColumn; ++col)
        {
            rwVal.push(dataset[row][col]);
        }

        for(col = targetColumn + 1; col < tupleLen; ++col)
        {
            rwVal.push(dataset[row][col]);
        }
        
        result.push(rwVal);
    }

    return result;  
}

function deriveMultivariateLinearParameters(dataset, yCol)
{
    if(dataset.length == 0)
    {
        return [];
    }

    if(Object.prototype.toString.call(dataset[0]) != '[object Array]' || dataset[0].length <= yCol)
    {
        return [];
    }

    var x = excludeColumn(dataset, yCol), y = mathjs.transpose(extractColumn(dataset, yCol));

    var xt = mathjs.transpose(x);

    // console.log(x);

    // console.log(xt);

    var mul = mathjs.multiply(x, xt);

    console.log(mathjs.inv(mul));

    for(var row = 0; row < x.length; ++row)
    {
        x[row].push(1);
    }

    return 'Unavailable';

    // return mathjs.multiply(mathjs.multiply(mathjs.inv(mathjs.multiply(xt, x)), xt), y);
}

module.exports = {
    "extractColumn" : extractColumn,
    "excludeColumn" : excludeColumn,
    "deriveMultivariateLinearParameters" : deriveMultivariateLinearParameters
};