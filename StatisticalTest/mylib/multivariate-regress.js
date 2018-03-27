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

    for(var row = 0; row < x.length; ++row)
    {
        x[row].push(1);
    }

    var xt = mathjs.transpose(x);

    var mul = mathjs.multiply(xt, x);

    let mulInv = null;

    try
    {
        mulInv = mathjs.inv(mul);
    }
    catch(err)
    {
        throw err;
    }

    return mathjs.multiply(mathjs.multiply(mulInv, xt), y);
}

module.exports = {
    "extractColumn" : extractColumn,
    "excludeColumn" : excludeColumn,
    "deriveMultivariateLinearParameters" : deriveMultivariateLinearParameters
};