'use strict';

import mathjs from 'mathjs';

import {DEFAULT_CONSTRIBUTION_NAME_LISTS} from './constants';

import {shape} from './shape';

/**
 * Accept an array and type of distributions, then return the goodness of fit.
 * Now just only a stub.
 * @param {Array} data 
 * @param {Array} distributions 
 * @returns {Array}
 */
function goodnessOfFit(data, distributions = null)
{
    let dataShape = shape(data);

    // @TODO
    // pseudo:fixNullCell(data, fixStrategy)

    // Using default distributions to test if null.
    distributions = null == distributions ? DEFAULT_CONSTRIBUTION_NAME_LIST : distributions;

    

    return {};
}

export {goodnessOfFit};