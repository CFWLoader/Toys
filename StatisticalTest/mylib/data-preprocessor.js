'use strict';

import spMath from './special-math';

import mvr from './multivariate-regress';

/**
 * Remove rows which has missing cell(s).
 * @param {Array[]} dataset 
 * @param {Any} missingTag
 * @returns {Array[]}
 */
function removeMissings(dataset, missingTag = null)
{
    let cleaned = [], passed;

    for(let row of dataset)
    {
        passed = true;

        for(let cell of row)
        {
            if(cell == missingTag)
            {
                passed = false;

                break;
            }
        }

        if(passed)
        {
            cleaned.push(row);
        }
    }

    return cleaned;
}

/**
 * Fill empty cells with responding global values.
 * @param {Array[]} dataset 
 * @param {Array} globalValues 
 * @param {Any} missingTag 
 * @returns {Array[]}
 */
function fillMissingsWithGlobal(dataset, globalValues, missingTag = null)
{
    let dupMat = new Array(dataset.length);

    for(let i = 0; i < dataset.length; ++i)
    {
        dupMat[i] = dataset[i].slice(0);
    }

    for(let row of dupMat)
    {
        for(let col = 0; col < row.length; ++col)
        {
            if(row[col] == missingTag)
            {
                row[col] = globalValues[col];
            }
        }
    }

    return dupMat;
}

/**
 * Fill empty cells with responding column's mean.
 * @param {Array[]} dataset 
 * @param {Any} missingTag 
 * @returns {Array[]}
 */
function fillMissingsWithMean(dataset, missingTag = null)
{
    let dupMat = new Array(dataset.length);

    for(let i = 0; i < dataset.length; ++i)
    {
        dupMat[i] = dataset[i].slice(0);
    }

    let means = spMath.means(dupMat);

    for(let row = 0; row < dupMat.length; ++row)
    {
        for(let col = 0; col < dupMat[row].length; ++col)
        {
            if(dupMat[row][col] == missingTag)
            {
                dupMat[row][col] = means[col];
            }
        }
    }

    return dupMat;
}

/**
 * Filling missing cell with Multivariate Linear Regression.
 * @param {Array[]} dataset 
 * @returns {Array[]}
 */
function fillMissingsWithMLR(dataset)
{
    let dupMat = new Array(dataset.length);

    for(let i = 0; i < dataset.length; ++i)
    {
        dupMat[i] = dataset[i].slice(0);
    }

    let elementLength = dupMat[0].length;
    
    let argumentSet = removeMissings(dupMat), params, row, col, sum;

    for(let yCol = 0; yCol < elementLength; ++yCol)
    {
        // console.log(yCol);
        // console.log("Start filling " + yCol.toString() + " column.");

        params = mvr.deriveMultivariateLinearParameters(argumentSet, yCol);

        // console.log(params);

        for(row = 0; row < dataset.length; ++row)
        {
            // console.log(dataset[row][yCol]);

            if(null == dupMat[row][yCol])
            {
                sum = 0;

                for(col = 0; col < yCol; ++col)
                {
                    sum += params[col] * dupMat[row][col];
                }

                for(col = yCol + 1; col < elementLength; ++col)
                {
                    sum += params[col - 1] * dataset[row][col];
                }

                // console.log(elementLength);

                sum += params[elementLength - 2];

                // console.log("Sum=" + sum.toString());                

                dupMat[row][yCol] = sum;
            }
        }
    }

    return dataset;
}

module.exports = {
    "removeMissings" : removeMissings,
    "fillMissingsWithGlobal" : fillMissingsWithGlobal,
    "fillMissingsWithMean" :  fillMissingsWithMean,
    "fillMissingsWithMLR" : fillMissingsWithMLR
};