'use strict';

import mathjs from 'mathjs';

import {DEFAULT_CONSTRIBUTION_NAME_LISTS} from './constants';

import {shape} from './shape';

import {filterDistributions} from './filter-distributions';

import {prepareCalculations} from './prepare-calculations';

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

    let calculations = prepareCalculations(dataShape, availDist, data);

    let transformedMatrix = availDist.map(() => new Array(dataLen));

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

    let result = new Array(numOfDist);

    return result;
}

export {goodnessOfFit};