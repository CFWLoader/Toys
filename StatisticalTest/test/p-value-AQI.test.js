'use strict';

import {measures, AndersonDarlingEvaluation, KolmogorovSmirnov} from '../lib/p-values';

import {aqiData, uniformSynData} from './test-datasets';

import {shape} from '../lib/shape';

import {filterDistributions} from '../lib/filter-distributions';

import {prepareCalculations} from '../lib/prepare-calculations';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import * as transformations from '../lib/transformations';

import {uniform_g, uniform_gg} from '../lib/p-value-tables';

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

/**
 * Tests on AQI dataset.
 */
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

test('AndersonDarlingEvaluation.uniform(291.2782761317, aqiDataShape) should be 0.', () => {
    expect(AndersonDarlingEvaluation.uniform(291.2782761317, aqiDataShape)).toBe(0);
});

test('ADE.uniform(), KSE.uniform on uniformSynData should be close to 0.1199872754481357 and 0.1835615939079147 respectively.', () => {

    let testValues = prepareTestValue(uniformSynData, uniformDataShape, ['uniform']);

    expect(AndersonDarlingEvaluation.uniform(testValues[0][0], uniformDataShape)).toBeCloseTo(0.1199872754481357, 10);

    expect(KolmogorovSmirnov.uniform(testValues[0][1], uniformDataShape)).toBeCloseTo(0.1835615939079147, 10);
});

test('AndersonDarlingEvaluation.normality(19.7474369825644, aqiDataShape) should beCloseTo 5.18999529922001e-46.', () => {
    expect(AndersonDarlingEvaluation.normality(19.7474369825644, aqiDataShape)).toBeCloseTo(5.18999529922001e-46, 57);
});

test('AndersonDarlingEvaluation.normality(1.10149026748664, aqiDataShape) should beCloseTo 0.0068927023396101.', () => {
    expect(AndersonDarlingEvaluation.normality(1.10149026748664, aqiDataShape)).toBeCloseTo(0.0068927023396101, 10);
});

test('AndersonDarlingEvaluation.exponent(154.31339412696, aqiDataShape) should be 0.', () => {
    expect(AndersonDarlingEvaluation.exponent(154.31339412696, aqiDataShape)).toBe(0);
});

test('AndersonDarlingEvaluation.gamma(4.30165803301067, aqiDataShape) should be 0.005.', () => {
    let params = new Map([['shape1', 6.0726199636468]]);
    expect(AndersonDarlingEvaluation.gamma(4.30165803301067, aqiDataShape, params)).toBe(0.005);
});

test('AndersonDarlingEvaluation.weibull(14.4191153154662, aqiDataShape) should be 0.01.', () => {
    expect(AndersonDarlingEvaluation.weibull(14.4191153154662, aqiDataShape)).toBe(0.01);
});