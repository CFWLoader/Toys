'use strict';

import mathjs from 'mathjs';

import {DEFAULT_CONSTRIBUTION_NAME_LISTS} from './constants';

import {shape} from './shape';

import {filterDistributions} from './filter-distributions';

import {prepareCalculations} from './prepare-calculations';

import {measures, preparePvalueCalculations} from './p-values';

/**
 * Accept an array and type of distributions, then return the goodness of fit.
 * Now just only a stub.
 * @param {Array} data 
 * @param {Array} distributions 
 * @returns {Array}
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

    return pValues;
}

export {goodnessOfFit};