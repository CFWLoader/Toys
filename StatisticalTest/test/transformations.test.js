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