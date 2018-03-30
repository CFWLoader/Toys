'use strict';

import {shape} from '../lib/shape';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import {prepareCalculations} from '../lib/prepare-calculations';

const allDistributions = DEFAULT_CONSTRIBUTION_NAME_LIST.slice(0);

allDistributions.push('beta');

allDistributions.push('gamma');

allDistributions.push('weibull');

test('prepareCalculations(shape([1, 2]), [\'uniform\'])[0](0.5) should be 0, [0](1.5) should be 0.5.', () => {

    let calculations = prepareCalculations(shape([1, 2]), ['uniform']);

    expect(calculations[0](0.5)).toBe(0);
    expect(calculations[0](1.5)).toBe(0.5);
});

test('prepareCalculations(shape([1, 2, 3]), [\'normality\'])[0](0.5) should be 0.03309629, [0](1.5) should be 0.2701457.', () => {

    let calculations = prepareCalculations(shape([1, 2, 3]), ['normality']);

    console.log(shape([1,2,3]).get('mean'));

    console.log(shape([1,2,3]).get('sigma'));

    expect(calculations[0](0.5)).toBeCloseTo(0.03309629, 6);
    expect(calculations[0](1.5)).toBeCloseTo(0.2701457, 6);
});