'use strict';

import mathjs from 'mathjs';

/**
 * Extract a specified column from a matrix.
 * @param {Array[]} dataset 
 * @param {Number} targetColumn
 * @returns {Array} 
 */
function extractColumn(dataset, targetColumn)
{
    if(!Array.isArray(dataset) || dataset.length == 0)
    {
        return [];
    }

    for(let row of dataset)
    {
        if(!Array.isArray(row) || row.length <= targetColumn)
        {
            return [];
        }
    }

    let [result, tupleLen] = [[], dataset[0].length];
    
    for(let row of dataset)
    {
        result.push(row[targetColumn]);
    }

    return result;
}

/**
 * Return a matrix without specific column.
 * @param {Array[]} dataset 
 * @param {Number} targetColumn 
 * @returns {Array[]}
 */
function excludeColumn(dataset, targetColumn)
{   
    if(!Array.isArray(dataset) || dataset.length == 0)
    {
        return [];
    }

    for(let row of dataset)
    {
        if(!Array.isArray(row) || row.length <= targetColumn)
        {
            return [];
        }
    }

    let [result, tupleLen, rwVal] = [[], dataset[0].length];
    
    for(let row of dataset)
    {
        rwVal = [];

        for(let col = 0; col < targetColumn; ++col)
        {
            rwVal.push(row[col]);
        }

        for(let col = targetColumn + 1; col < tupleLen; ++col)
        {
            rwVal.push(row[col]);
        }
        
        result.push(rwVal);
    }

    return result;  
}

/**
 * Return a an array of multivariate function's weights.
 * @param {Array[]} dataset 
 * @param {Number} yCol
 * @returns {Array} 
 */
function deriveMultivariateLinearParameters(dataset, yCol)
{
    if(!Array.isArray(dataset) || dataset.length == 0)
    {
        return [];
    }

    for(let row of dataset)
    {
        if(!Array.isArray(row) || row.length <= yCol)
        {
            return [];
        }
    }

    let x = excludeColumn(dataset, yCol), y = mathjs.transpose(extractColumn(dataset, yCol));

    // Add 1 for each tuple in x matrix since wt=[w1,w2,...,wn,b], xi=[xi1, xi2,....xni, 1];
    // yi = wt * xi.
    for(let row = 0; row < x.length; ++row)
    {
        x[row].push(1);
    }

    let xt = mathjs.transpose(x);

    let mul = mathjs.multiply(xt, x);

    let mulInv = null;

    // This multiplied square matrix may be a singular matrix.
    // And mathjs.inv may throw a zero determinant error.
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

export { extractColumn, excludeColumn, deriveMultivariateLinearParameters };