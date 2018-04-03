'use strict';

import {log, abs, exp, pow, sqrt} from 'mathjs';

import {uniform_g, uniform_gg, AD_NORMALITY_TABLE, AD_EXPONENT_TABLE, AD_GAMMA_TABLE, AD_WEIBULL_TABLE, 
    KS_NORMALITY_TABLE, KS_EXPONENT_TABLE, KS_GAMMA_TABLE, KS_WEIBULL_TABLE} from './p-value-tables';

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
                dminus[distIdx] = dm;
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
 * Input an value and calculate corresponding p-value.
 * @param {Number} param 
 * @param {Array[]} paramTable 
 * @returns {Number}
 */
function calculatePvalueByTable(param, paramTable)
{
    // Edge condition.
    if(param < paramTable[0][0])
    {
        return paramTable[0][1];
    }
    
    let pValue = 0;

    // Linear Interpolation.
    for(let idx = 1; idx < paramTable.length; ++idx)
    {
        if(param < paramTable[idx][0])
        {
            pValue = (param - paramTable[idx - 1][0])
            * (paramTable[idx][1] - paramTable[idx - 1][1]) / (paramTable[idx][0] - paramTable[idx - 1][0])
            + paramTable[idx - 1][1];

            break;
        }
    }

    // Edge condition.
    if(pValue == 0)
    {
        pValue = paramTable[paramTable.length - 1][1];
    }

    return pValue;
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

        if (adValue < 2) {
            p = 1 - pow(adValue, - 0.5) * exp(-1.2337141 / adValue) * uniform_g(adValue);
        }
        else {
            p = 1 - exp(-exp(uniform_gg(adValue)));
        }

        return p;
    }

    /**
     * Evaluating p-value of (log)normality.
     * @param {Number} adValue 
     * @param {Map} dataShape 
     * @returns {Number}
     */
    static normality(adValue, dataShape)
    {
        let n = dataShape.get('validLength');

        let zStar = adValue * (1 + 0.75 / n + 2.25 / (n ** 2));

        let result = 0;

        for(let tuple of AD_NORMALITY_TABLE)
        {
            if(zStar <= tuple[0])
            {
                result = exp(tuple[1] + tuple[2] * zStar + tuple[3] * zStar**2);

                break;
            }
        }

        // Extra calculation in z* <= 0.34 cases.
        if(result > 0 && zStar <= AD_NORMALITY_TABLE[1][0])
        {
            result = 1 - result;
        }

        return result;
    }
    
    /**
     * Evaluating p-value of exponent.
     * @param {Number} adValue 
     * @param {Map} dataShape 
     * @returns {Number}
     */
    static exponent(adValue, dataShape)
    {
        let n = dataShape.get('validLength');

        let zStar = adValue * (1 + 0.6 / n);

        let pValue = 0;

        for(let tuple of AD_EXPONENT_TABLE)
        {
            if(zStar <= tuple[0])
            {
                pValue = exp(tuple[1] + tuple[2] * zStar + tuple[3] * zStar**2);

                break;
            }
        }

        // Extra calculation in z* <= 0.34 cases.
        if(pValue > 0 && zStar <= AD_EXPONENT_TABLE[1][0])
        {
            pValue = 1 - pValue;
        }

        return pValue;
    }

    /**
     * Evaluating p-value of gamma.
     * @param {Number} adValue 
     * @param {Map} dataShape 
     * @param {Map} parameters
     * @returns {Number}
     */
    static gamma(adValue, dataShape, parameters)
    {
        let alpha = parameters.get('shape1');

        let paramTable = null;

        // Determine table according to alpha's value.
        for(let val of AD_GAMMA_TABLE)
        {
            if(alpha <= val[0])
            {
                paramTable = val[1];

                break;
            }
        }

        // // Edge condition.
        // if(adValue < paramTable[0][0])
        // {
        //     return paramTable[0][1];
        // }

        // let pValue = 0;

        // for(let idx = 1; idx < paramTable.length; ++idx)
        // {
        //     if(adValue < paramTable[idx][0])
        //     {
        //         pValue = (adValue - paramTable[idx - 1][0])
        //         * (paramTable[idx][1] - paramTable[idx - 1][1]) / (paramTable[idx][0] - paramTable[idx - 1][0])
        //         + paramTable[idx - 1][1];
        //     }
        // }

        // // Edge condition.
        // if(pValue == 0)
        // {
        //     pValue = 0.005;
        // }

        return calculatePvalueByTable(adValue, paramTable);
    }

    /**
     * Evaluating p-value of Weibull.
     * @param {Number} adValue
     * @param {Map} dataShape
     * @returns {Number}
     */
    static weibull(adValue, dataShape)
    {
        let wn = dataShape.get('validLength');

        let zStar = adValue * (1 + 0.2 / sqrt(wn));

        // // Edge condition.
        // if(zStar < AD_WEIBULL_TABLE[0][0])
        // {
        //     return AD_WEIBULL_TABLE[0][1];
        // }
        
        // let pValue = 0;

        // let paramTable = AD_WEIBULL_TABLE;

        // for(let idx = 1; idx < paramTable.length; ++idx)
        // {
        //     if(adValue < paramTable[idx][0])
        //     {
        //         pValue = (adValue - paramTable[idx - 1][0])
        //         * (paramTable[idx][1] - paramTable[idx - 1][1]) / (paramTable[idx][0] - paramTable[idx - 1][0])
        //         + paramTable[idx - 1][1];
        //     }
        // }

        // // Edge condition.
        // if(pValue == 0)
        // {
        //     pValue = 0.01;
        // }

        return calculatePvalueByTable(zStar, AD_WEIBULL_TABLE);
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

    /**
     * p-value of (Log)Normality.
     * @param {Number} ksValue 
     * @param {Map} dataShape 
     */
    static normality(ksValue, dataShape)
    {
        let n = dataShape.get('validLength');

        let d = ksValue * (sqrt(n) - 0.01 + 0.85 / sqrt(n));

        return calculatePvalueByTable(d, KS_NORMALITY_TABLE);
    }

    /**
     * p-value of Exponent.
     * @param {Number} ksValue 
     * @param {Map} dataShape 
     * @returns {Number}
     */
    static exponent(ksValue, dataShape)
    {
        let wn = dataShape.get('validLength');
        
        let d = (ksValue - 0.2 / wn) * (sqrt(wn) + 0.26 + 0.5 / sqrt(wn));

        return calculatePvalueByTable(d, KS_EXPONENT_TABLE);
    }

    /**
     * p-value of Gamma.
     * @param {Number} ksValue 
     * @param {Map} dataShape 
     * @returns {Number}
     */
    static gamma(ksValue, dataShape)
    {
        let wn = dataShape.get('validLength');

        let d = ksValue * (sqrt(wn) + 0.3 / sqrt(wn));

        console.log(d);

        return calculatePvalueByTable(d, KS_GAMMA_TABLE);
    }

    /**
     * p-value of Weibull.
     * @param {Number} ksValue 
     * @param {Map} dataShape 
     * @returns {Number}
     */
    static weibull(ksValue, dataShape)
    {
        let wn = dataShape.get('validLength');

        let d = sqrt(wn) * ksValue;

        return calculatePvalueByTable(d, KS_WEIBULL_TABLE);
    }
};

export{measures, AndersonDarlingEvaluation, KolmogorovSmirnov};