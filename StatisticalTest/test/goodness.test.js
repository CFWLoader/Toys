'use strict';

import {goodnessOfFit} from '../lib/goodness';

import {aqiData} from './test-datasets';

import {DEFAULT_CONSTRIBUTION_NAME_LIST} from '../lib/constants';

import {shape} from '../lib/shape';

test('Total', () => {
    expect(goodnessOfFit(aqiData, DEFAULT_CONSTRIBUTION_NAME_LIST)).toEqual([])
});