'use strict';

import {log, abs, exp, pow, sqrt} from 'mathjs';

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
        result[distIdx] = new Array(- dataLen - adSums[distIdx] / dataLen, dplus[distIdx] > dminus[distIdx] ? dplus[distIdx] : dminus[distIdx]);
    }

    return result;
}

/**
 * Pack of AD's evaluation of p-value.
 */
class AndersonDarlingEvaluation
{
    /**
     * Evaluating p-value of uniform.
     * @param {Number} adValue 
     * @param {Map} dataShape 
     * @returns {Number}
     */
    static uniform(adValue, dataShape)
    {
        let p = 0;

        const g = (zz) =>  {
            return (2.00012 + (0.247105 - (0.0649821 - (0.0347962 - (0.0116720 - 0.00168691 * zz) * zz) * zz) * zz) * zz);
        }

        const gg = (zz) => {
            return (1.0776 - (2.30695 - (0.43424 - (0.082433 - (0.008056 - 0.0003146 * zz) * zz) * zz) * zz) * zz);
        }

        if (adValue < 2) {
            p = 1 - pow(adValue, - 0.5) * exp(-1.2337141 / adValue) * g(adValue);
        }
        else {
            p = 1 - exp(-exp(gg(adValue)));
        }

        return p;
    }
};

/**
 * Pack of KS's evaluation of p-value.
 */
class KolmogorovSmirnov
{
    /**
     * p-value of uniform.
     * @param {Number} dn 
     * @param {Map} dataShape 
     */
    static uniform(dn, dataShape)
    {
        let wn = dataShape.get('validLength');

        let D = sqrt(wn) * dn;

        let k = 100;

        let ak;

        while (true) 
        {
            ak = 0;

            for (var i = -k; i <= k; ++i) {
                ak += pow(-1, i) * exp(-2 * (i * D) ** 2);
            }

            if ((pow(-1, k + 1) * exp(-2 * ((k + 1) * D) ** 2)) < 0.00001) {
                break;
            }
        }

        return 1 - ak;
    }
};

export{measures, AndersonDarlingEvaluation, KolmogorovSmirnov};