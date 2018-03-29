'use strict';

import {aqiData, betaSynData} from './test-datasets';

import {shape} from '../lib/shape';

import {gammaParameters, betaParameters, weibullParameters} from '../lib/estimators';

/**
 * Tests of gammaParameters().
 */
test('gammaParameters(aqiShape) should be Map([[\"shape1\", 6.0726199636486]], [\"shape2\", 0.0861069903735485]].', () => {
    // expect(gammaParameters(aqiData)).toEqual({"shape1" : 1, "shape2" : 2});
    const aqiShape = shape(aqiData);
    let result = gammaParameters(aqiShape);
    expect(result.get('shape1')).toBeCloseTo(6.0726199636486);
    expect(result.get('shape2')).toBeCloseTo(0.0861069903735485);
});

// test("gammaParameters([]) should be {}", () => {
//     expect(gammaParameters([])).toEqual({});
// });

/**
 * Tests of betaParameters().
 */
test('betaParameters(shape) should be Map([["shape1", 2.84255334896478], ["shape2", 1.897010225091196]].', () => {
    let result = betaParameters(shape(betaSynData));
    expect(result).toEqual(new Map([['shape1', 2.84255334896478], ['shape2', 1.897010225091196]]));
});

// test("betaParameters([]) should be {}", () => {
//     let result = betaParameters([], shape([]));
//     expect(result).toEqual({});
// });

// test("betaParameters(aqiData) should be {}", () => {
//     let result = betaParameters(aqiData);
//     expect(result).toEqual({});
// });

/**
 * Tests of weibullParameters().
 */
// test("weibullParameters(aqiData) should be {\"shape1\": 79.678440486807, \"shape2\": 2.40870475769043}", () => {
//     let result = weibullParameters(aqiData);
//     expect(result["shape1"]).toBeCloseTo(79.678440486807);
//     expect(result["shape2"]).toBeCloseTo(2.40870475769043);
// });