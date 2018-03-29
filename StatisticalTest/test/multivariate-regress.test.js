'use strict';

import {extractColumn, excludeColumn, deriveMultivariateLinearParameters} from '../mylib/multivariate-regress';

/**
 * Tests of extractColumn().
 */
test('extractColumn(0, 0) should be [].', () => {
    expect(extractColumn(0, 0)).toEqual([]);
});

test('extractColumn([], 11) should be [].', () => {
    expect(extractColumn([], 11)).toEqual([]);
});

test('extractColumn([[]], 0) should be [].', () => {
    expect(extractColumn([[]], 0)).toEqual([]);
});

test('extractColumn([[0]], 0) should be [0].', () => {
    expect(extractColumn([[0]], 0)).toEqual([0]);
});

test('extractColumn([[0]], 1) should be [].', () => {
    expect(extractColumn([[0]], 0)).toEqual([0]);
});

test('extractColumn([[0], [1]], 0) should be [0, 1].', () => {
    expect(extractColumn([[0], [1]], 0)).toEqual([0, 1]);
});

/**
 * Tests of extractColumn().
 */
test('excludeColumn(0, 0) should be [].', () => {
    expect(extractColumn(0, 0)).toEqual([]);
});

test('excludeColumn([], 11) should be [].', () => {
    expect(excludeColumn([], 11)).toEqual([]);
});

test('extractColumn([[]], 0) should be [].', () => {
    expect(excludeColumn([[]], 0)).toEqual([]);
});

test('extractColumn([[1,2],[1,2]], 0) should be [[2],[2]].', () => {
    expect(excludeColumn([[1,2],[1,2]], 0)).toEqual([[2], [2]]);
});

test('extractColumn([[1,2],[1,2]], 2) should be [].', () => {
    expect(excludeColumn([[1,2],[1,2]], 2)).toEqual([]);
});

/**
 * Tests of deriveMultivariateLinearParameters().
 */
test('deriveMultivariateLinearParameters(0, 0) should be [].', () => {
    expect(deriveMultivariateLinearParameters(0, 0)).toEqual([]);
});

test('deriveMultivariateLinearParameters([], 11) should be [].', () => {
    expect(deriveMultivariateLinearParameters([], 11)).toEqual([]);
});

test('deriveMultivariateLinearParameters([[]], 0) should be [].', () => {
    expect(deriveMultivariateLinearParameters([[]], 0)).toEqual([]);
});

test('deriveMultivariateLinearParameters([[1,2],[1,2]], 0) should throw zero determinant error.', () => {
    expect(() => deriveMultivariateLinearParameters([[1,2],[1,2]], 0).length).toThrowError('Cannot calculate inverse, determinant is zero');
});

test('extractColumn([[1,2],[1,2]], 2) should be [].', () => {
    expect(excludeColumn([[1,2],[1,2]], 2)).toEqual([]);
});

/**
 * Other tests.
 */
// test('mathfn.incBeta(1, 2, 3) should be equal to jstat.ibeta(1, 2, 3).', () => {
//     expect(mathfn.incBeta(1,2,3)).toBe(jstat.ibeta(1,2,3));
// });