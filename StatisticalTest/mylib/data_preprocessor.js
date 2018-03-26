'use strict'

const spMath = require('./sp_math');

const mvr = require('./multivariate_regress');

function removeMissings(dataset, missingTag = null)
{
    var cleaned = [], passed;

    for(var row = 0; row < dataset.length; ++row)
    {
        passed = true;

        for(var col = 0; col < dataset[row].length; ++col)
        {
            if(dataset[row][col] == missingTag)
            {
                passed = false;

                break;
            }
        }

        if(passed)
        {
            cleaned.push(dataset[row]);
        }
    }

    return cleaned;
}

function fillMissingsWithGlobal(dataset, globalValues, missingTag = null)
{
    for(var row = 0; row < dataset.length; ++row)
    {
        for(var col = 0; col < dataset[row].length; ++col)
        {
            if(dataset[row][col] == missingTag)
            {
                dataset[row][col] = globalValues[col];
            }
        }
    }

    return dataset;
}

function fillMissingsWithMean(dataset, missingTag = null)
{
    var means = spMath.means(dataset);

    // console.log(means);

    for(var row = 0; row < dataset.length; ++row)
    {
        for(var col = 0; col < dataset[row].length; ++col)
        {
            if(dataset[row][col] == missingTag)
            {
                dataset[row][col] = means[col];
            }
        }
    }

    return dataset;
}

/**
 * Filling missing cell with Multivariate Linear Regression.
 * @param {Array[]} dataset 
 */
function fillMissingsWithMLR(dataset)
{
    var elementLength = dataset[0].length;
    
    var argumentSet = removeMissings(dataset), params, row, col, sum;

    for(var yCol = 0; yCol < elementLength; ++yCol)
    {
        // console.log(yCol);
        // console.log("Start filling " + yCol.toString() + " column.");

        params = mvr.deriveMultivariateLinearParameters(argumentSet, yCol);

        // console.log(params);

        for(row = 0; row < dataset.length; ++row)
        {
            // console.log(dataset[row][yCol]);

            if(null == dataset[row][yCol])
            {
                sum = 0;

                for(col = 0; col < yCol; ++col)
                {
                    sum += params[col] * dataset[row][col];
                }

                for(col = yCol + 1; col < elementLength; ++col)
                {
                    sum += params[col - 1] * dataset[row][col];
                }

                // console.log(elementLength);

                sum += params[elementLength - 2];

                // console.log("Sum=" + sum.toString());                

                dataset[row][yCol] = Math.round(sum);
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