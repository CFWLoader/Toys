'use strict';

import {aqiData, betaSynData} from './test-datasets';

import {shape} from '../lib/shape';

import {gammaParameters, betaParameters, weibullParameters} from '../lib/estimators';

/**
 * Tests of gammaParameters().
 */
test('gammaParameters(null) should throw TypeError(\'Map or Array type required.\').', () => {
    expect(() => gammaParameters(null)).toThrowError('Map or Array type required.');
});

test('gammaParameters(3) should throw TypeError(\'Map or Array type required.\').', () => {
    expect(() => gammaParameters(3)).toThrowError('Map or Array type required.');
});

test('gammaParameters(\'hello\') should throw TypeError(\'Map or Array type required.\').', () => {
    expect(() => gammaParameters('hello')).toThrowError('Map or Array type required.');
});

test('gammaParameters(aqiData) should be Map([["shape1", 6.0726199636486]], ["shape2", 0.0861069903735485]].', () => {
    let result = gammaParameters(aqiData);
    expect(result.get('shape1')).toBeCloseTo(6.0726199636486, 4);
    expect(result.get('shape2')).toBeCloseTo(0.0861069903735485, 4);
});

test('gammaParameters(aqiShape) should be Map([[\"shape1\", 6.0726199636486]], [\"shape2\", 0.0861069903735485]].', () => {
    const aqiShape = shape(aqiData);
    let result = gammaParameters(aqiShape);
    expect(result.get('shape1')).toBeCloseTo(6.0726199636486, 4);
    expect(result.get('shape2')).toBeCloseTo(0.0861069903735485, 4);
});

/**
 * Tests of betaParameters().
 */
test('betaParameters(null) should throw TypeError(\'Map or Array type required.\').', () => {
    expect(() => betaParameters(null)).toThrowError('Map or Array type required.');
});

test('betaParameters(3) should throw TypeError(\'Map or Array type required.\').', () => {
    expect(() => betaParameters(3)).toThrowError('Map or Array type required.');
});

test('betaParameters(\'hello\') should throw TypeError(\'Map or Array type required.\').', () => {
    expect(() => betaParameters('hello')).toThrowError('Map or Array type required.');
});

test('betaParameters(betaSynData) should be Map([["shape1", 2.84255334896478], ["shape2", 1.897010225091196]].', () => {
    let result = betaParameters(betaSynData);
    expect(result).toEqual(new Map([['shape1', 2.84255334896478], ['shape2', 1.897010225091196]]));
});

test('betaParameters(shape) should be Map([["shape1", 2.84255334896478], ["shape2", 1.897010225091196]].', () => {
    let result = betaParameters(shape(betaSynData));
    expect(result).toEqual(new Map([['shape1', 2.84255334896478], ['shape2', 1.897010225091196]]));
});

/**
 * Tests of weibullParameters().
 */
test("weibullParameters(aqiData) should be Map{\"shape1\": 79.678440486807, \"shape2\": 2.40870475769043}", () => {
    let result = weibullParameters(aqiData);
    expect(result.get('shape1')).toBeCloseTo(79.678440486807, 4);
    expect(result.get('shape2')).toBeCloseTo(2.40870475769043, 4);
});

test("weibullParameters(dataShape) should throw TypeError(\'Array type required.\')", () => {
    expect(() => weibullParameters(shape(aqiData))).toThrowError('Array type required.');
});