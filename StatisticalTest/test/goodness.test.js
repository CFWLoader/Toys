'use strict';

import {goodnessOfFit} from '../lib/goodness';

import {aqiData} from './test-datasets';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import {shape} from '../lib/shape';

test('Total', () => {
    let result = goodnessOfFit(aqiData, DEFAULT_CONSTRIBUTION_NAME_LIST);

    expect(result.length).toEqual(5);

    console.log(result);
});