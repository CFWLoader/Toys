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
        !Array.isArray(distList) || distList.length == 0)
    {
        return [];
    }

    return ['Hello'];
}

export {filterDistributions};