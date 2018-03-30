'use strict';

import {shape} from '../lib/shape';

import * as transformations from '../lib/transformations';

import * as datasets from './test-datasets';

const aqiShape = shape(datasets.aqiData);

const betaShape = shape(datasets.betaSynData);

/**
 * Tests of uniform().
 */
test('uniform(1, 9, 4) should be 0.', () => {
    expect(transformations.uniform(1, 9, 4)).toBe(0);
});

test('uniform(1, 2, 3) should be 0.', () => {
    expect(transformations.uniform(1, 2, 3)).toBe(0);
});

test('uniform(1, 0, 1) should be 0.', () => {
    expect(transformations.uniform(1, 0, 1)).toBe(0);
});

test('uniform(0.5, 0, 1) should be 0.5.', () => {
    expect(transformations.uniform(0.5, 0, 1)).toBe(0.5);
});

/**
 * Tests of uniformBatch().
 */
test('uniformBatch(aqiData, aqiShape) should match [0]=0, [1]=0, [2]=0.005319148936170213, [3]=0.02127659574468085, [911]=0.9840425531914894', () => {
    let result = transformations.uniformBatch(datasets.aqiData, aqiShape);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(0);
    expect(result[2]).toBeCloseTo(0.005319148936170213);
    expect(result[3]).toBeCloseTo(0.02127659574468085);
    expect(result[911]).toBeCloseTo(0.9840425531914894);
});

/**
 * Tests of normality().
 */
test('normality(0, 0, 1) should be close to 0.5.', () => {
    expect(transformations.normality(0, 0, 1)).toBeCloseTo(0.5, 6);
});

test('normality(3, 0, 1) should be close to 0.9986501.', () => {
    expect(transformations.normality(3, 0, 1)).toBeCloseTo(0.9986501, 6);
});

test('normality(1, 2, 3) should be close to 0.3694413.', () => {
    expect(transformations.normality(1, 2, 3)).toBeCloseTo(0.3694413, 6);
});

/**
 * Tests of normalityBatch().
 */
test('normalityBatch(aqiData, aqiShape) should match [0]=0.04044785134308876, [911]=0.9840425531914894', () => {
    let result = transformations.normalityBatch(datasets.aqiData, aqiShape);
    expect(result[0]).toBeCloseTo(0.04044785134308876, 6);
    expect(result[911]).toBeCloseTo(0.9999942136598872, 6);
});

/**
 * Tests of logNormality().
 */
test('logNormality(0, 0, 1) should be 0.', () => {
    expect(transformations.logNormality(0, 0, 1)).toBe(0);
});

test('logNormality(1, 2, 3) should be 0.', () => {
    expect(transformations.logNormality(1, 2, 3)).toBeCloseTo(0.2524925, 6);
});

/**
 * Tests of logNormalityBatch().
 */
test('logNormalityBatch(aqiData, aqiShape) should match [0]=0.0005162492206695068, [911]=0.9976297166500032', () => {
    let result = transformations.logNormalityBatch(datasets.aqiData, aqiShape);
    expect(result[0]).toBeCloseTo(0.0005162492206695068, 10);
    expect(result[911]).toBeCloseTo(0.9976297166500032, 10);
});

/**
 * Tests of triangle().
 */
test('triangle(1, 9, 4, 3) should be 0.', () => {
    expect(transformations.triangle(1, 9, 4, 3)).toBe(0);
});

test('triangle(1, 0, 2, 1) should be 0.5.', () => {
    expect(transformations.triangle(1, 0, 2, 1)).toBe(0.5);
});

test('triangle(0.5, 0, 2, 1) should be 0.125.', () => {
    expect(transformations.triangle(0.5, 0, 2, 1)).toBe(0.125);
});

test('triangle(2.1, 2, 3, 2.5) should be close to 0.02.', () => {
    expect(transformations.triangle(2.1, 2, 3, 2.5)).toBeCloseTo(0.02, 10);
});

test('triangle(2.9, 2, 3, 2.5) should be close to 0.02.', () => {
    expect(transformations.triangle(2.9, 2, 3, 2.5)).toBeCloseTo(0.98, 10);
});

/**
 * Tests of triangleBatch().
 */
test('triangleBatch(aqiData, aqiShape) should has [0]=, [911]=', () => {
    let result = transformations.triangleBatch(datasets.aqiData, aqiShape);

    expect(result[0]).toBe(0);

    expect(result[911]).toBeCloseTo(0.9997453598913536, 10);
});

/**
 * Tests of exponent().
 */
test('exponent(1, 6) should be close to 0.9975212.', () => {
    expect(transformations.exponent(1, 6)).toBeCloseTo(0.9975212, 6);
});

test('exponent(0.001, 1) should be close to 0.0009995002.', () => {
    expect(transformations.exponent(1, 6)).toBeCloseTo(0.9975212, 7);
});

/**
 * Tests of exponentBatch().
 */
test('exponent(aqiData, aqiShape) should has [0]=, [911]=.', () => {
    let result = transformations.exponentBatch(datasets.aqiData, aqiShape);

    expect(result[0]).toBeCloseTo(0.2141994496789832, 10);
    expect(result[911]).toBeCloseTo(0.9453500404046185, 10);
});

/**
 * Tests of beta().
 */
test('beta(0, 1, 1) should be 0.', () => {
    expect(transformations.beta(0, 1, 1)).toBe(0);
});

test('beta(0.1, 1, 1) should be close to 0.1.', () => {
    expect(transformations.beta(0.1, 1, 1)).toBeCloseTo(0.1, 8);
});

test('beta(0.1, 2, 3) should be close to 0.0523.', () => {
    expect(transformations.beta(0.1, 2, 3)).toBeCloseTo(0.0523, 4);
});

test('beta(0.33, 0.21, 0.13) should be close to 0.3331312.', () => {
    expect(transformations.beta(0.33, 0.21, 0.13)).toBeCloseTo(0.3331312, 6);
});

/**
 * Tests of betaBatch().
 */
test('betaBatch(betaSynData, betaShape) should has [0]=, [911]=', () => {
    let result = transformations.betaBatch(datasets.betaSynData, betaShape);
    expect(result[0]).toBeCloseTo(0.00039836209898537033, 10);
    expect(result[911]).toBeCloseTo(0.9147515498866492, 10);
});

/**
 * Tests of gamma().
 */
test('gamma(1, 1, 1) should be close to 0.6321206.', () => {
    expect(transformations.gamma(1, 1, 1)).toBeCloseTo(0.6321206, 6);
});

test('gamma(6, 11, 0.25) should be close to 0.998915.', () => {
    expect(transformations.gamma(6, 11, 0.25)).toBeCloseTo(0.998915, 2);
});

/**
 * Tests of gammaBatch().
 */
test('gammaBatch(aqiData, aqiShape) should has [0]=0.00009784321525305008, [911]=.', () => {
    let result = transformations.gammaBatch(datasets.aqiData, aqiShape);
    expect(result[0]).toBeCloseTo(0.00009784321525305008, 10);
    expect(result[911]).toBeCloseTo(0.9935652453695955, 10);
});

/**
 * Tests of weibull().
 */
test('weibull(1, 1, 1) should be close to 0.6321206', () => {
    expect(transformations.weibull(1, 1, 1)).toBeCloseTo(0.6321206, 6);
});

test('weibull(3, 6, 6) should be close to 0.01550356', () => {
    expect(transformations.weibull(3, 6, 6)).toBeCloseTo(0.01550356, 6);
});

/**
 * Tests of weibullBatch().
 */
test('weibullBatch(aqiData) should has [0]=0.02392054075670158, [911]=0.9999411268344259', () => {
    let result = transformations.weibullBatch(datasets.aqiData);
    expect(result[0]).toBeCloseTo(0.02392054075670158, 10);
    expect(result[911]).toBeCloseTo(0.9999411268344259, 10);
});