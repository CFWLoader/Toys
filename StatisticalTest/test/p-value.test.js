'use strict';

import {measures, AndersonDarlingEvaluation, KolmogorovSmirnov} from '../lib/p-values';

import {aqiData, uniformSynData} from './test-datasets';

import {shape} from '../lib/shape';

import {filterDistributions} from '../lib/filter-distributions';

import {prepareCalculations} from '../lib/prepare-calculations';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import * as transformations from '../lib/transformations';

import mathjs from 'mathjs';

const allDistributions = DEFAULT_CONSTRIBUTION_NAME_LIST.slice(0);

allDistributions.push('beta');

allDistributions.push('gamma');

allDistributions.push('weibull');

const aqiDataShape = shape(aqiData);

const uniformDataShape = shape(uniformSynData);

function prepareTestValue(data, dataShape, distList)
{
    // let dataShape = shape(aqiData);                            // Pass 1, T(n).

    // @TODO
    // pseudo:fixNullCell(data, fixStrategy)

    // Using default distributions to test if null.

    let availDist = filterDistributions(dataShape, distList);

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

    return measures(sortedTransMat, dataShape);
}

test('Test all on AQI dataset.', () => {

    // let data = aqiData;

    // let dataShape = shape(aqiData);                            // Pass 1, T(n).

    // @TODO
    // pseudo:fixNullCell(data, fixStrategy)

    // Using default distributions to test if null.

    // let availDist = filterDistributions(aqiDataShape, allDistributions);

    // let numOfDist = availDist.length, dataLen = aqiDataShape.get('validLength');

    // let calculations = prepareCalculations(aqiDataShape, availDist, data);

    // let transformedMatrix = availDist.map(() => new Array(dataLen));

    // for(let dataIdx = 0; dataIdx < dataLen; ++dataIdx)      // Pass 2, T(n) = n * numOfDist.
    // {
    //     for(let calIdx = 0; calIdx < numOfDist; ++calIdx)
    //     {
    //         transformedMatrix[calIdx][dataIdx] = calculations[calIdx](data[dataIdx]);
    //     }
    // }

    // let sortedTransMat = new Array(numOfDist);

    // for(let calIdx = 0; calIdx < numOfDist; ++calIdx)       // Pass 3, T(nlogn) = n*log(n) * numOfDist. Assume Mathjs uses T(nlogn).
    // {
    //     sortedTransMat[calIdx] = mathjs.sort(transformedMatrix[calIdx]);
    // }

    let result = prepareTestValue(aqiData, aqiDataShape, allDistributions);

    // console.log(availDist);

    expect(result[0][0]).toBeCloseTo(291.2782761317, 10);
    expect(result[1][0]).toBeCloseTo(19.7474369825644, 10);
    expect(result[2][0]).toBeCloseTo(1.10149026748664, 10);
    expect(result[3][0]).toBeCloseTo(61.1310452265662, 10);
    expect(result[4][0]).toBeCloseTo(154.31339412696, 10);
    expect(result[5][0]).toBeCloseTo(4.30165803301067, 4);
    expect(result[6][0]).toBeCloseTo(14.4191153154662, 5);
});

test('AndersonDarlingEvaluation.uniform(291.2782761317, dataShape) should be 0.', () => {
    expect(AndersonDarlingEvaluation.uniform(291.2782761317, aqiDataShape)).toBeCloseTo(5.18999529922001e-046, 40);
});

test('ADE.uniform(), KSE.uniform on uniformSynData should be close to 0.1199872754481357 and 0.1835615939079147 respectively.', () => {

    let testValues = prepareTestValue(uniformSynData, uniformDataShape, ['uniform']);

    expect(AndersonDarlingEvaluation.uniform(testValues[0][0], uniformDataShape)).toBeCloseTo(0.1199872754481357, 10);

    // console.log(testValues[0].length);

    // console.log(testValues[0][1]);

    expect(KolmogorovSmirnov.uniform(testValues[0][1], uniformDataShape)).toBeCloseTo(0.1835615939079147, 10);
});