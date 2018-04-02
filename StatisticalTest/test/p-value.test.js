'use strict';

import {measures, AndersonDarlingEvaluation, KolmogorovSmirnov} from '../lib/p-values';

import {uniform_g, uniform_gg} from '../lib/p-value-tables';

import mathjs from 'mathjs';

/**
 * Validate the calculation by synthetic values.
 */

/**
 * Tests of ADE.uniform().
 */
test('ADE.uniform(0.5, null) should be 1 - (0.5)^(-1/2)e^(-1.2337141/0.5)uniform_g(0.5)', () => {
    expect(AndersonDarlingEvaluation.uniform(0.5, null)).toBe(1 - mathjs.pow(0.5, -1/2) * mathjs.exp(-1.2337141/0.5) * uniform_g(0.5));
});

test('ADE.uniform(1, null) should be 1 - 1^(-1/2)e^(-1.2337141)uniform_g(1)', () => {
    expect(AndersonDarlingEvaluation.uniform(1, null)).toBe(1 - mathjs.pow(1, -1/2) * mathjs.exp(-1.2337141) * uniform_g(1));
});

test('ADE.uniform(1.5, null) should be 1 - (1.5)^(-1/2)e^(-1.2337141/1.5)uniform_g(1.5)', () => {
    expect(AndersonDarlingEvaluation.uniform(1.5, null)).toBe(1 - mathjs.pow(1.5, -1/2) * mathjs.exp(-1.2337141 / 1.5) * uniform_g(1.5));
});

test('ADE.uniform(2.5, null) should be 1 - exp(-exp(uniform_gg(2.5))).', () => {
    expect(AndersonDarlingEvaluation.uniform(2.5, null)).toBe(1 - mathjs.exp(-mathjs.exp(uniform_gg(2.5))));
});

test('ADE.normality(-0.15 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 1 - exp(-13.436 + 101.14 * (-0.15) - 223.73 * (-0.15)**2).', () => {
    let params = new Map([['validLength', 10]]);
    let zStar = -0.15;
    expect(AndersonDarlingEvaluation.normality(zStar / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        1 - mathjs.exp(-13.436 + 101.14 * zStar - 223.73 * zStar**2)
    );
});

test('ADE.normality(0.15 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 1 - exp(-13.436 + 101.14 * 0.15 - 223.73 * 0.15**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.15 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        1 - mathjs.exp(-13.436 + 101.14 * 0.15 - 223.73 * 0.15**2)
    );
});

test('ADE.normality(0.2 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 1 - exp(-13.436 + 101.14 * 0.2 - 223.73 * 0.2**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.2 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        1 - mathjs.exp(-13.436 + 101.14 * 0.2 - 223.73 * 0.2**2)
    );
});

test('ADE.normality(0.21 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 1 - exp(-8.318 + 42.796 * 0.21 - 59.938 * 0.21**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.21 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        1 - mathjs.exp(-8.318 + 42.796 * 0.21 - 59.938 * 0.21**2)
    );
});

test('ADE.normality(0.29 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 1 - exp(-8.318 + 42.796 * 0.29 - 59.938 * 0.29**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.29 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        1 - mathjs.exp(-8.318 + 42.796 * 0.29 - 59.938 * 0.29**2)
    );
});

test('ADE.normality(0.34 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 1 - exp(-8.318 + 42.796 * 0.34 - 59.938 * 0.34**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.34 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        1 - mathjs.exp(-8.318 + 42.796 * 0.34 - 59.938 * 0.34**2)
    );
});

test('ADE.normality(0.34001 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(0.9177 - 4.279 * 0.34001 - 1.38 * 0.34001**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.34001 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(0.9177 - 4.279 * 0.34001 - 1.38 * 0.34001**2)
    );
});

test('ADE.normality(0.5 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(0.9177 - 4.279 * 0.5 - 1.38 * 0.5**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.5 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(0.9177 - 4.279 * 0.5 - 1.38 * 0.5**2)
    );
});

test('ADE.normality(0.6 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(0.9177 - 4.279 * 0.6 - 1.38 * 0.6**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.6 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(0.9177 - 4.279 * 0.6 - 1.38 * 0.6**2)
    );
});

test('ADE.normality(0.60001 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(1.2937 - 5.709 * 0.60001 + 0.0186 * 0.60001**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(0.60001 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(1.2937 - 5.709 * 0.60001 + 0.0186 * 0.60001**2)
    );
});


test('ADE.normality(1 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(1.2937 - 5.709 * 1 + 0.0186 * 1**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(1 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(1.2937 - 5.709 * 1 + 0.0186 * 1**2)
    );
});

test('ADE.normality(16 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(1.2937 - 5.709 * 16 + 0.0186 * 16**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(16 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(1.2937 - 5.709 * 16 + 0.0186 * 16**2)
    );
});

test('ADE.normality(26 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(1.2937 - 5.709 * 26 + 0.0186 * 26**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(26 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(1.2937 - 5.709 * 26 + 0.0186 * 26**2)
    );
});

test('ADE.normality(56 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(1.2937 - 5.709 * 56 + 0.0186 * 56**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(56 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(1.2937 - 5.709 * 56 + 0.0186 * 56**2)
    );
});

test('ADE.normality(126 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(1.2937 - 5.709 * 126 + 0.0186 * 126**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(126 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(1.2937 - 5.709 * 126 + 0.0186 * 126**2)
    );
});

test('ADE.normality(153.467 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be exp(1.2937 - 5.709 * 153.467 + 0.0186 * 153.467**2).', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(153.467 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(
        mathjs.exp(1.2937 - 5.709 * 153.467 + 0.0186 * 153.467**2)
    );
});

test('ADE.normality(153.4671 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 0.', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(153.4671 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(0);
});

test('ADE.normality(153000 / (1.0 + 0.75 / 10 + 2.25 / 10**2), Map{\'validLength\'=10}) should be 0.', () => {
    let params = new Map([['validLength', 10]]);
    expect(AndersonDarlingEvaluation.normality(153000 / (1.0 + 0.75 / 10 + 2.25 / 10**2), params)).toBe(0);
});

/**
 * Tests of ADE.exponent().
 */
test('[zStar=-1.6]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-12.2204 + 67.459zStar - 110.3zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = -1.6;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-12.2204 + 67.459 * zStar - 110.3 * zStar**2)
    );
});

test('[zStar=0]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-12.2204 + 67.459zStar - 110.3zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-12.2204 + 67.459 * zStar - 110.3 * zStar**2)
    );
});

test('[zStar=0.1]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-12.2204 + 67.459zStar - 110.3zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.1;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-12.2204 + 67.459 * zStar - 110.3 * zStar**2)
    );
});

test('[zStar=0.19]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-12.2204 + 67.459zStar - 110.3zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.19;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-12.2204 + 67.459 * zStar - 110.3 * zStar**2)
    );
});

test('[zStar=0.25]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-12.2204 + 67.459zStar - 110.3zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.25;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-12.2204 + 67.459 * zStar - 110.3 * zStar**2)
    );
});

test('[zStar=0.25999999]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-12.2204 + 67.459zStar - 110.3zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.25999999;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-12.2204 + 67.459 * zStar - 110.3 * zStar**2)
    );
});

test('[zStar=0.26]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-12.2204 + 67.459zStar - 110.3zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.26;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-12.2204 + 67.459 * zStar - 110.3 * zStar**2)
    );
});

test('[zStar=0.2600001]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-6.1327 + 20.218 * zStart - 18.663 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.2600001;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-6.1327 + 20.218 * zStar - 18.663 * zStar**2)
    );
});

test('[zStar=0.34]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-6.1327 + 20.218 * zStart - 18.663 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.34;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-6.1327 + 20.218 * zStar - 18.663 * zStar**2)
    );
});

test('[zStar=0.51]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 1 - exp(-6.1327 + 20.218 * zStart - 18.663 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.51;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        1 - mathjs.exp(-6.1327 + 20.218 * zStar - 18.663 * zStar**2)
    );
});

test('[zStar=0.5100001]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.9209 - 3.353 * zStart + 0.3 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.5100001;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.9209 - 3.353 * zStar + 0.3 * zStar**2)
    );
});

test('[zStar=0.72]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.9209 - 3.353 * zStart + 0.3 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.72;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.9209 - 3.353 * zStar + 0.3 * zStar**2)
    );
});

test('[zStar=0.82]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.9209 - 3.353 * zStart + 0.3 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.82;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.9209 - 3.353 * zStar + 0.3 * zStar**2)
    );
});

test('[zStar=0.95]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.9209 - 3.353 * zStart + 0.3 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.95;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.9209 - 3.353 * zStar + 0.3 * zStar**2)
    );
});

test('[zStar=0.9500001]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.731 - 3.009 * zStart + 0.15 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 0.9500001;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.731 - 3.009 * zStar + 0.15 * zStar**2)
    );
});

test('[zStar=1.95]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.731 - 3.009 * zStart + 0.15 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 1.95;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.731 - 3.009 * zStar + 0.15 * zStar**2)
    );
});

test('[zStar=7.95]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.731 - 3.009 * zStart + 0.15 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 7.95;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.731 - 3.009 * zStar + 0.15 * zStar**2)
    );
});

test('[zStar=10.03]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be exp(0.731 - 3.009 * zStart + 0.15 * zStar**2).', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 10.03;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(
        mathjs.exp(0.731 - 3.009 * zStar + 0.15 * zStar**2)
    );
});

test('[zStar=11]ADE.exponent(zStar/(1 + 0.6/11), Map{\'validLength\'=11}) should be 0.', () => {
    let params = new Map([['validLength', 11]]);
    let zStar = 11;
    expect(AndersonDarlingEvaluation.exponent(zStar/(1 + 0.6/11), params)).toBe(0);
});