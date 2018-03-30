'use strict';

import {shape} from '../lib/shape';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import {filterDistributions} from '../lib/filter-distributions';

/**
 * Tests of filterDistributions().
 */
test('filterDistributions(shape([]), DEFAULT_CONSTRIBUTION_NAME_LIST) should be [].', () => {
    expect(filterDistributions(shape([]), DEFAULT_CONSTRIBUTION_NAME_LIST)).toEqual([]);
});

test('filterDistributions(666, DEFAULT_CONSTRIBUTION_NAME_LIST) should be [].', () => {
    expect(filterDistributions(666, DEFAULT_CONSTRIBUTION_NAME_LIST)).toEqual([]);
});

test('filterDistributions(shape([null, null]), DEFAULT_CONSTRIBUTION_NAME_LIST) should be [].', () => {
    expect(filterDistributions(shape([null, null]), DEFAULT_CONSTRIBUTION_NAME_LIST)).toEqual([]);
});

test('filterDistributions(shape([1]), 33) should be [].', () => {
    expect(filterDistributions(shape([1]), 33)).toEqual([]);
});

test('filterDistributions(shape([1]), ) should be [].', () => {
    expect(filterDistributions(shape([1]), [])).toEqual([]);
});