'use strict';

import {goodnessOfFit} from '../lib/goodness';

import {aqiData} from './test-datasets';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import {shape} from '../lib/shape';

const allDistributions = DEFAULT_CONSTRIBUTION_NAME_LIST.slice(0);

allDistributions.push('beta');

allDistributions.push('gamma');

allDistributions.push('weibull');

test('On AQI1.', () => {

    let result = goodnessOfFit(aqiData, DEFAULT_CONSTRIBUTION_NAME_LIST);

    expect(result.length).toEqual(5);

    expect(result[0].get('distName')).toBe('lognormality');
    expect(result[1].get('distName')).toBe('normality');
    expect(result[2].get('distName')).toBe('exponent');
    expect(result[3].get('distName')).toBe('uniform');
    expect(result[4].get('distName')).toBe('triangle');
});


test('On AQI1.', () => {

    let distName = DEFAULT_CONSTRIBUTION_NAME_LIST.slice(0);

    distName.push('gamma');

    let result = goodnessOfFit(aqiData, distName);

    expect(result.length).toEqual(6);

    expect(result[0].get('distName')).toBe('lognormality');
    expect(result[1].get('distName')).toBe('gamma');
    expect(result[2].get('distName')).toBe('normality');
    expect(result[3].get('distName')).toBe('exponent');
    expect(result[4].get('distName')).toBe('uniform');
    expect(result[5].get('distName')).toBe('triangle');
});

test('On AQI3.', () => {

    let result = goodnessOfFit(aqiData, allDistributions);

    expect(result.length).toEqual(7);

    // console.log(result[2].get('params').get('shape1'));

    expect(result[0].get('distName')).toBe('weibull');
    expect(result[1].get('distName')).toBe('lognormality');
    expect(result[2].get('distName')).toBe('gamma');
    expect(result[3].get('distName')).toBe('normality');
    expect(result[4].get('distName')).toBe('exponent');
    expect(result[5].get('distName')).toBe('uniform');
    expect(result[6].get('distName')).toBe('triangle');
});