'use strict';

import mathjs from 'mathjs';

/**
 * Statistic of data shape.
 * @param {Array} data 
 * @returns {Map}
 */
function shape(data)
{
    if(!Array.isArray(data))
    {
        throw TypeError('Array type required.');
    }

    if(data.length == 0)
    {
        return new Map([
            ['length', 0],
            ['validLength', 0],
            ['nullIndexes', []],
            ['mean', 0],
            ['sigma', 0],
            ['logMean', 0],
            ['logSigma', 0],
            ['min', 0],
            ['max', 0],
            ['mode', 0],
            ['logOneMinusSum', 0]
        ]);
    }

    // For Log-Normal, we need to know sum of log(xi) and log sigma.
    // For beta distribution, Sum(log(1 - xi)) is required.
    let [length, sumVal, sigma, logSum, logOneMinusSum, logSigma, minVal, maxVal] = [data.length, 0, 0, 0, 0, 0, data[0], data[0]];

    let tempLog;

    let validLength = 0, nullIndexes = new Array(), index = -1;

    for(let val of data)
    {
        ++index;

        if(val == null)
        {
            nullIndexes.push(index);

            continue;
        }

        ++validLength;

        sumVal += val;

        sigma += val**2;

        tempLog = mathjs.log(val);

        logOneMinusSum += mathjs.log(1 - val);

        logSum += tempLog;

        logSigma += tempLog**2;

        minVal = minVal > val ? val : minVal;

        maxVal = maxVal < val ? val : maxVal;
    }

    if(validLength == 0)
    {
        return new Map([
            ['length', data.length],
            ['validLength', 0],
            ['nullIndexes', []],
            ['mean', 0],
            ['sigma', 0],
            ['logMean', 0],
            ['logSigma', 0],
            ['min', 0],
            ['max', 0],
            ['mode', 0],
            ['logOneMinusSum', 0]
        ]);
    }

    // Retrieving mode.
    let interval = maxVal - minVal, z, mode;

    if(interval == 0)
    {
        mode = minVal;
    }
    else
    {
        z = sumVal / (length * (interval)) - minVal / (interval);

        mode = minVal + (maxVal - minVal) * (3 * z - 1);
    }

    if(mode < minVal)
    {
        mode = minVal;
    }
    else if(mode > maxVal)
    {
        mode = maxVal;
    }

    return new Map([
        ['length', length],
        ['validLength', validLength],
        ['nullIndexes', nullIndexes],
        ['mean', sumVal / validLength],
        ['sigma', mathjs.sqrt(sigma / validLength - (sumVal / validLength)**2)],
        ['logMean', logSum / validLength],
        ['logSigma', mathjs.sqrt(logSigma / validLength - (logSum / validLength)**2)],
        ['min', minVal],
        ['max', maxVal],
        ['mode', mode],
        ['logOneMinusSum', logOneMinusSum]
    ]);
}

export {shape};