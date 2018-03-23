'use strict'

const spMath = require('./sp_math');

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


module.exports = {
    "removeMissings" : removeMissings,
    "fillMissingsWithGlobal" : fillMissingsWithGlobal,
    "fillMissingsWithMean" :  fillMissingsWithMean
}