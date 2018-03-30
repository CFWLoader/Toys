'use strict';

import {measures} from '../lib/p-values';

import {aqiData} from './test-datasets';

import {shape} from '../lib/shape';

import {filterDistributions} from '../lib/filter-distributions';

import {prepareCalculations} from '../lib/prepare-calculations';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import mathjs from 'mathjs';

const allDistributions = DEFAULT_CONSTRIBUTION_NAME_LIST.slice(0);

allDistributions.push('beta');

allDistributions.push('gamma');

allDistributions.push('weibull');

test('Test all on AQI dataset.', () => {

    let data = aqiData;

    let dataShape = shape(aqiData);                            // Pass 1, T(n).

    // @TODO
    // pseudo:fixNullCell(data, fixStrategy)

    // Using default distributions to test if null.

    let availDist = filterDistributions(dataShape, allDistributions);

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

    let result = measures(sortedTransMat, dataShape);

    // console.log(availDist);

    expect(result[0][0]).toBeCloseTo(291.2782761317, 10);
    expect(result[1][0]).toBeCloseTo(19.7474369825644, 10);
    expect(result[2][0]).toBeCloseTo(1.10149026748664, 10);
    expect(result[3][0]).toBeCloseTo(61.1310452265662, 10);
    expect(result[4][0]).toBeCloseTo(154.31339412696, 10);
    expect(result[5][0]).toBeCloseTo(4.30165803301067, 4);
    expect(result[6][0]).toBeCloseTo(14.4191153154662, 5);
});