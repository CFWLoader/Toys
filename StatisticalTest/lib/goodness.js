'use strict';

import mathjs from 'mathjs';

import {DEFAULT_CONSTRIBUTION_NAME_LISTS} from './constants';

import {shape} from './shape';

import {filterDistributions} from './filter-distributions';

import {prepareCalculations} from './prepare-calculations';

import {measures, preparePvalueCalculations} from './p-values';

/**
 * Assembly vectors into an array.
 * @param {Map<String, Number>} dataShape 
 * @param {Array<String>} availDist 
 * @param {Array<Array<Number>>} adksValues 
 * @param {Array<Array<Number>>} pValues 
 * @param {Map<String, Map<String, Number>>} parameters 
 * @returns {Array<Map<String, Object>>}
 */
function assembleResult(dataShape, availDist, adksValues, pValues, parameters)
{
    let numOfDist = availDist.length;

    let result = new Array(numOfDist);

    for(let idx = 0; idx < numOfDist; ++idx)
    {
       result[idx] = new Map([
           ['distName', availDist[idx]],
           ['pa', pValues[idx][0]],
           ['pk', pValues[idx][1]],
           ['a', adksValues[idx][0]],
           ['k', adksValues[idx][1]],
           ['params', new Map(dataShape)]
       ]);

       if(availDist[idx] == 'beta')
       {
           result[idx].get('params').set('shape1', parameters.get('beta').get('shape1'));
           result[idx].get('params').set('shape2', parameters.get('beta').get('shape2'));
       }
       else if(availDist[idx] == 'gamma')
       {
           result[idx].get('params').set('shape1', parameters.get('gamma').get('shape1'));
           result[idx].get('params').set('shape2', parameters.get('gamma').get('shape2'));
       }
       else if(availDist[idx] == 'weibull')
       {
           result[idx].get('params').set('shape1', parameters.get('weibull').get('shape1'));
           result[idx].get('params').set('shape2', parameters.get('weibull').get('shape2'));
       }
    }

    return result;
}

/**
 * For mathjs.sort() to compara assembled result.
 * @param {Map<String, Object>} a 
 * @param {Map<String, Object>} b 
 * @returns {Number}
 */
function resultComparator(a, b)
{
    // p-value from AD's method take priority.
    let val1 = a.get('pa');

    let val2 = b.get('pa');

    if(Number.isNaN(val1) && Number.isNaN(val2))
    {
        return 0;
    }
    else if(Number.isNaN(val1))
    {
        return 1;
    }
    else if(Number.isNaN(val2))
    {
        return -1;
    }

    if(val1 < val2)
    {
        return 1;
    }
    else if(val1 > val2)
    {
        return -1;
    }

    // Compare p-value from KS's method if their AD's p-values are equal.
    val1 = a.get('pk');

    val2 = b.get('pk');

    if(Number.isNaN(val1) && Number.isNaN(val2))
    {
        return 0;
    }
    else if(Number.isNaN(val1))
    {
        return 1;
    }
    else if(Number.isNaN(val2))
    {
        return -1;
    }

    if(val1 < val2)
    {
        return 1;
    }
    else if(val1 > val2)
    {
        return -1;
    }

    return 0;
}

/**
 * Accept an array and type of distributions, then return the goodness of fit.
 * Now just only a stub.
 * @param {Array<Number>} data 
 * @param {Array<String>} distributions 
 * @returns {Array<Map<String, Object>>}
 */
function goodnessOfFit(data, distributions = null)
{
    let dataShape = shape(data);                            // Pass 1, T(n).

    // @TODO
    // pseudo:fixNullCell(data, fixStrategy)

    // Using default distributions to test if null.
    distributions = null == distributions ? DEFAULT_CONSTRIBUTION_NAME_LIST : distributions;

    let availDist = filterDistributions(dataShape, distributions);

    let numOfDist = availDist.length, dataLen = dataShape.get('validLength');

    let {calculations, parameters} = prepareCalculations(dataShape, availDist, data);

    let transformedMatrix = availDist.map(() => new Array(dataLen));

    // In the near future, I will merge Pass 2 and 3 into a single Pass for performance.
    for(let dataIdx = 0; dataIdx < dataLen; ++dataIdx)      // Pass 2, T(n) = n * numOfDist.
    {
        for(let calIdx = 0; calIdx < numOfDist; ++calIdx)
        {
            transformedMatrix[calIdx][dataIdx] = calculations[calIdx](data[dataIdx]);
        }
    }

    let sortedTransMat = new Array(numOfDist);

    for(let calIdx = 0; calIdx < numOfDist; ++calIdx)       // Pass 3, T(nlogn) = n*log(n) * numOfDist. Assume Mathjs uses T(nlogn).
    {
        sortedTransMat[calIdx] = mathjs.sort(transformedMatrix[calIdx]);
    }

    let adksValues = measures(sortedTransMat, dataShape);

    let pValueCals = preparePvalueCalculations(availDist, dataShape, parameters);

    let pValues = new Array(numOfDist);

    for(let idx = 0; idx < numOfDist; ++idx)
    {
        pValues[idx] = new Array(pValueCals.get(availDist[idx])[0](adksValues[idx][0]), 
            pValueCals.get(availDist[idx])[1](adksValues[idx][1]));
    }

    // Assemble the report.
    let result = assembleResult(dataShape, availDist, adksValues, pValues, parameters);

    return mathjs.sort(result, resultComparator);
}

export {goodnessOfFit};