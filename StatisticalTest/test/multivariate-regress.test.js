'use strict';

import {extractColumn} from '../mylib/multivariate-regress';

/**
 * Tests of extractColumn().
 */
test('extractColumn(0, 0) should be []', () => {
    expect(extractColumn(0, 0)).toEqual([]);
});

test('extractColumn([], 11) should be []', () => {
    expect(extractColumn([], 11)).toEqual([]);
});

test('extractColumn([[]], 0) should be []', () => {
    expect(extractColumn([[]], 0)).toEqual([]);
});

test('extractColumn([[0]], 0) should be [0]', () => {
    expect(extractColumn([[0]], 0)).toEqual([0]);
});

test('extractColumn([[0]], 1) should be []', () => {
    expect(extractColumn([[0]], 0)).toEqual([0]);
});