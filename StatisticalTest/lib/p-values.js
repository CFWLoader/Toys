'use strict';

import {log, abs} from 'mathjs';

/**
 * Calculate AD-Value and KD-Value on transformed and sorted data.
 * @param {Array[]} data 
 * @param {Map} dataShape
 * @return {Array[]}
 */
function measures(data, dataShape)
{
    if(!Array.isArray(data) || !Array.isArray(data[0]) || data.length == 0)
    {
        return [];
    }

    // Initializations.
    let dataLen = dataShape.get('validLength');

    let numOfDist = data.length;

    let adSums = new Array(numOfDist);

    let dplus = new Array(numOfDist), dminus = new Array(numOfDist);

    for(let distIdx = 0; distIdx < numOfDist; ++distIdx)
    {
        adSums[distIdx] = 0, dplus[distIdx] = 0, dminus[distIdx] = 0;
    }

    // Temporary variables.
    let dp, dm, iVal, n_iVal, mulVal, wi = 1;

    for(let dataIdx = 0; dataIdx < dataLen; ++dataIdx, ++wi)
    {
        for(let distIdx = 0; distIdx < numOfDist; ++distIdx)
        {
            // Calculate single AD value.
            iVal = data[distIdx][dataIdx], n_iVal = 1 - data[distIdx][dataLen - 1 - dataIdx];

            mulVal = iVal * n_iVal;

            if(mulVal != 0)
            {
                adSums[distIdx] += (2 * dataIdx + 1) * log(mulVal);
            }

            // Single KS value.
            dp = abs(iVal - wi / dataLen), dm = abs(iVal - (wi - 1) / dataLen);

            if(dp > dplus[distIdx])
            {
                dplus[distIdx] = dp;
            }

            if(dm > dminus[distIdx])
            {
                dminus = dm;
            }
        }
    }

    let result = new Array(numOfDist);

    for(let distIdx = 0; distIdx < numOfDist; ++distIdx)
    {
        result[distIdx] = [- dataLen - adSums[distIdx] / dataLen, dplus[distIdx] > dminus[distIdx] ? dplus[distIdx] : dminus[distIdx]];
    }

    return result;
}

export{measures};