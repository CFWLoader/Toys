'use strict';

import * as tranformations from './transformations';

import * as estimators from './estimators';

/**
 * Get calculations by corresponding distribution names.
 * @param {Map} dataShape 
 * @param {Array} distNameList 
 * @param {Array} data Once weibull required, this arguments is required.
 * @returns {Array}
 */
function prepareCalculations(dataShape, distNameList, data = null)
{
    let distSet = new Set(distNameList);

    let calculations = new Array();

    if(distSet.has('uniform'))
    {
        calculations.push((val) => tranformations.uniform(val, dataShape.get('min'), dataShape.get('max')));
    }

    if(distSet.has('normality'))
    {
        calculations.push((val) => tranformations.normality(val, dataShape.get('mean'), dataShape.get('sigma')));
    }

    if(distSet.has('lognormality'))
    {
        calculations.push((val) => tranformations.logNormality(val, dataShape.get('logMean'), dataShape.get('logSigma')));
    }

    if(distSet.has('triangle'))
    {
        calculations.push((val) => tranformations.triangle(val, dataShape.get('min'), dataShape.get('max'), dataShape.get('mode')));
    }

    if(distSet.has('exponent'))
    {
        calculations.push((val) => tranformations.exponent(val, 1 / dataShape.get('mean')));
    }

    if(distSet.has('beta'))
    {
        let betaParams = estimators.betaParameters(dataShape);

        calculations.push((val) => tranformations.beta(val, betaParams.get('shape1'), betaParams.get('shape2')));
    }

    if(distSet.has('gamma'))
    {
        let gammaParams = estimators.gammaParameters(dataShape);

        calculations.push((val) => tranformations.gamma(val, gammaParams.get('shape1'), gammaParams.get('shape2')));
    }

    if(distSet.has('weibull') && data != null)
    {
        let weibullParams = estimators.weibullParameters(data);

        calculations.push((val) => tranformations.weibull(val, weibullParams.get('shape1'), weibullParams.get('shape2')));
    }

    return calculations;
}

export {prepareCalculations}