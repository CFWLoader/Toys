'use strict';

import {KolmogorovSmirnov} from '../lib/p-values';

import * as mathjs from 'mathjs';

/**
 * Tests of KSE.uniform().
 */

// pass. May be add test cases in future.

/**
 * Tests of KSE.normality().
 */
test('[D=0.7]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.15.', () => {
    let d = 0.7, params = new Map([['validLength', 233]]);

    expect(KolmogorovSmirnov.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), params))).toBe(0.15);
});