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

    let availList = [];

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
    if(distSet.has('lognormality') && shape.get('min') > 0)
    {
        availList.push('lognormality');
    }

    // Filter 

    return availList;
}

export {filterDistributions};