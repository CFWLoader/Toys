'use strict';

import {shape} from '../lib/shape';

import {aqiData} from './test-datasets';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import {filterDistributions} from '../lib/filter-distributions';

let allDistributions = DEFAULT_CONSTRIBUTION_NAME_LIST.slice(0);

allDistributions.push('beta');

allDistributions.push('gamma');

allDistributions.push('weibull');

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

test('filterDistributions(shape([1]), []) should be [].', () => {
    expect(filterDistributions(shape([1]), [])).toEqual([]);
});

test('filterDistributions(shape([1, 1, 1]), DEFAULT_CONSTRIBUTION_NAME_LIST) should be [].', () => {
    expect(filterDistributions(shape([1, 1, 1]), [])).toEqual([]);
});

test('filterDistributions(shape([1, 2, 1]), [\'uniform\']) should be [\'uniform\'].', () => {
    expect(filterDistributions(shape([1, 2, 1]), ['uniform'])).toEqual(['uniform']);
});

test('filterDistributions(shape([1, 2, 1]), allDistributions) should be [\'uniform\', \'normality\', \'lognormality\', \'triangle\', \'exponent\', \'gamma\', \'weibull\'].', () => {
    expect(filterDistributions(shape([1, 2, 1]), allDistributions)).toEqual(['uniform', 'normality', 'lognormality', 'triangle', 'exponent', 'gamma', 'weibull']);
});

test('filterDistributions(shape([1, 0, 1]), allDistributions) should be [\'uniform\', \'normality\', \'triangle\', \'exponent\', \'beta\', \'weibull\'].', () => {
    expect(filterDistributions(shape([1, 0, 1]), allDistributions)).toEqual(['uniform', 'normality', 'triangle', 'exponent', 'beta', 'weibull']);
});

test('filterDistributions(shape([1, 0.5, 1]), allDistributions) should be allDistirbutions.', () => {
    expect(filterDistributions(shape([1, 0.5, 1]), allDistributions)).toEqual(allDistributions);
});

test('filterDistributions(shape([-1, 0, 1]), allDistributions) should be [\'uniform\', \'normality\', \'triangle\'].', () => {
    expect(filterDistributions(shape([-1, 0, 1]), allDistributions)).toEqual(['uniform', 'normality', 'triangle']);
});

test('filterDistributions(shape([-1, 0, 1, 5]), allDistributions) should be [\'uniform\', \'normality\', \'triangle\'].', () => {
    expect(filterDistributions(shape([-1, 0, 1, 5]), allDistributions)).toEqual(['uniform', 'normality', 'triangle']);
});

test('filterDistributions(shape(aqiData), allDistributions) should be [\'uniform\', \'normality\', \'lognormality\', \'triangle\', \'exponent\', \'gamma\', \'weibull\'].', () => {
    expect(filterDistributions(shape(aqiData), allDistributions)).toEqual(['uniform', 'normality', 'lognormality', 'triangle', 'exponent', 'gamma', 'weibull']);
});