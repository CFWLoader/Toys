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