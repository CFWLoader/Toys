'use strict';

/**
 * Check available distributions for this data shape.
 * @param {Map} dataShape 
 * @param {Array} distList 
 * @returns {Array}
 */
function filterDistributions(dataShape, distList)
{
    if(dataShape == null || !(dataShape instanceof Map) || dataShape.get('validLength') == 0 ||
        dataShape.get('min') == dataShape.get('max') || !Array.isArray(distList) || distList.length == 0)
    {
        return [];
    }

    let distSet = new Set(distList);

    let availList = [], minVal = dataShape.get('min'), maxVal = dataShape.get('max');

    // Filter Uniform.
    if(distSet.has('uniform'))
    {
        // Uniform has no restrict unless min value greater than max value. But that should blames shape() function.
        availList.push('uniform');
    }

    // Filter normality.
    if(distSet.has('normality'))
    {
        availList.push('normality');
    }

    // Filter lognormality.
    if(distSet.has('lognormality') && minVal > 0)
    {
        availList.push('lognormality');
    }

    if(distSet.has('triangle'))
    {
        availList.push('triangle');
    }

    // Filter exponent.
    if(distSet.has('exponent') && minVal >= 0)
    {
        availList.push('exponent');
    }

    // Filter beta.
    if(distSet.has('beta') && minVal >= 0 && maxVal <= 1)
    {
        availList.push('beta');
    }

    // Filter gamma.
    if(distSet.has('gamma') && minVal > 0)
    {
        availList.push('gamma');
    }

    // Filter weibull.
    if(distSet.has('weibull') && minVal >= 0)
    {
        availList.push('weibull');
    }

    return availList;
}

export {filterDistributions};