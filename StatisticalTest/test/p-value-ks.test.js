'use strict';

import {KolmogorovSmirnovEvaluation as KolmogorovSmirnov} from '../lib/p-values';

import {sqrt, abs} from 'mathjs';

/**
 * Tests of KSE.uniform().
 */

// pass. May be add test cases in future.

/**
 * Tests of KSE.normality().
 */
test('[D=0.7]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.15.', () => {
    let d = 0.7, params = new Map([['validLength', 233]]);
    expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params)).toBe(0.15);
});

test('[D=0.775]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.15.', () => {
    let d = 0.775, params = new Map([['validLength', 233]]);
    expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params)).toBe(0.15);
});

test('[D=0.8]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be in (0.1, 0.15).', () => {
    let d = 0.8, params = new Map([['validLength', 233]]);
    let expected = expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params));
    expected.toBeGreaterThan(0.1);
    expected.toBeLessThan(0.15);
});

test('[D=0.819]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.1.', () => {
    let d = 0.819, params = new Map([['validLength', 233]]);
    expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params)).toBe(0.1);
});

test('[D=0.85]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be in (0.05, 0.1).', () => {
    let d = 0.85, params = new Map([['validLength', 233]]);
    let expected = expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params));
    expected.toBeGreaterThan(0.05);
    expected.toBeLessThan(0.1);
});

test('[D=0.895]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.05.', () => {
    let d = 0.895, params = new Map([['validLength', 233]]);
    expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params)).toBe(0.05);
});

test('[D=0.92]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be in (0.025, 0.05).', () => {
    let d = 0.92, params = new Map([['validLength', 233]]);
    let expected = expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params));
    expected.toBeGreaterThan(0.025);
    expected.toBeLessThan(0.05);
});

test('[D=0.995]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.025.', () => {
    let d = 0.995, params = new Map([['validLength', 233]]);
    expect(abs(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params) - 0.025) < Number.EPSILON).toBe(true);
});

test('[D=1.01]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be in (0.01, 0.025).', () => {
    let d = 1.01, params = new Map([['validLength', 233]]);
    let expected = expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params));
    expected.toBeGreaterThan(0.01);
    expected.toBeLessThan(0.025);
});

test('[D=1.035]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.01.', () => {
    let d = 1.035, params = new Map([['validLength', 233]]);
    expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params)).toBe(0.01);
});

test('[D=2]KSE.normality(D/(sqrt(233) - 0.01 + 0.85/sqrt(233), Map{\'validLength\'=233}) should be 0.01.', () => {
    let d = 2, params = new Map([['validLength', 233]]);
    expect(KolmogorovSmirnov.normality(d/(sqrt(233) - 0.01 + 0.85/sqrt(233)), params)).toBe(0.01);
});

/**
 * Tests of KSE.exponent().
 */
test('[D=0.5]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be 0.15.', () => {
    let d = 0.5, params = new Map([['validLength', 171]]);
    expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params)).toBe(0.15);
});

test('[D=0.926]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be 0.15.', () => {
    let d = 0.926, params = new Map([['validLength', 171]]);
    expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params)).toBe(0.15);
});

test('[D=0.95]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be in (0.1, 0.15).', () => {
    let d = 0.95, params = new Map([['validLength', 171]]);
    let expected = expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params))
    expected.toBeGreaterThan(0.1);
    expected.toBeLessThan(0.15);
});

test('[D=0.995]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be 0.1.', () => {
    let d = 0.995, params = new Map([['validLength', 171]]);
    expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params)).toBe(0.1);
});

test('[D=1.001]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be in (0.05, 0.1).', () => {
    let d = 1.001, params = new Map([['validLength', 171]]);
    let expected = expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params))
    expected.toBeGreaterThan(0.05);
    expected.toBeLessThan(0.1);
});

test('[D=1.094]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be 0.05.', () => {
    let d = 1.094, params = new Map([['validLength', 171]]);
    expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params)).toBe(0.05);
});

test('[D=1.125]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be in (0.025, 0.05).', () => {
    let d = 1.125, params = new Map([['validLength', 171]]);
    let expected = expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params))
    expected.toBeGreaterThan(0.025);
    expected.toBeLessThan(0.05);
});

test('[D=1.184]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be 0.025.', () => {
    let d = 1.184, params = new Map([['validLength', 171]]);
    expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params)).toBe(0.025);
});

test('[D=1.2]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be in (0.01, 0.025).', () => {
    let d = 1.2, params = new Map([['validLength', 171]]);
    let expected = expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params))
    expected.toBeGreaterThan(0.01);
    expected.toBeLessThan(0.025);
});

test('[D=1.298]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be 0.01.', () => {
    let d = 1.298, params = new Map([['validLength', 171]]);
    expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params)).toBe(0.01);
});

test('[D=2]KSE.exponent(D/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, Map{\'validLength\'=171}) should be 0.01.', () => {
    let d = 2, params = new Map([['validLength', 171]]);
    expect(KolmogorovSmirnov.exponent(d/(sqrt(171) + 0.26 + 0.5/sqrt(171)) + 0.2 / 171, params)).toBe(0.01);
});

/**
 * Tests of KSE.gamma().
 */
test('[D=0.5]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.25.', () => {
    let d = 0.5, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.25);
});

test('[D=0.74]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.25.', () => {
    let d = 0.74, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.25);
});

test('[D=0.77]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be in (0.2, 0.25).', () => {
    let d = 0.77, params = new Map([['validLength', 123]]);
    let expected = expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params));
    expected.toBeGreaterThan(0.2);
    expected.toBeLessThan(0.25);
});

test('[D=0.78]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.2.', () => {
    let d = 0.78, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBeCloseTo(0.2, 10);
});

test('[D=0.79]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be in (0.15, 0.2).', () => {
    let d = 0.79, params = new Map([['validLength', 123]]);
    let expected = expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params));
    expected.toBeGreaterThan(0.15);
    expected.toBeLessThan(0.2);
});

test('[D=0.8]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.15.', () => {
    let d = 0.8, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.15);
});

test('[D=0.82]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be in (0.1, 0.15).', () => {
    let d = 0.82, params = new Map([['validLength', 123]]);
    let expected = expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params));
    expected.toBeGreaterThan(0.1);
    expected.toBeLessThan(0.15);
});

test('[D=0.858]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.1.', () => {
    let d = 0.858, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.1);
});

test('[D=0.9]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be in (0.05, 0.1).', () => {
    let d = 0.9, params = new Map([['validLength', 123]]);
    let expected = expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params));
    expected.toBeGreaterThan(0.05);
    expected.toBeLessThan(0.1);
});

test('[D=0.928]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.05.', () => {
    let d = 0.928, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.05);
});

test('[D=0.95]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be in (0.025, 0.05).', () => {
    let d = 0.95, params = new Map([['validLength', 123]]);
    let expected = expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params));
    expected.toBeGreaterThan(0.025);
    expected.toBeLessThan(0.05);
});

test('[D=0.99]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.025.', () => {
    let d = 0.99, params = new Map([['validLength', 123]]);
    expect(abs(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params) - 0.025) < Number.EPSILON).toBe(true);
});

test('[D=1.05]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be in (0.01, 0.025).', () => {
    let d = 1.05, params = new Map([['validLength', 123]]);
    let expected = expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params));
    expected.toBeGreaterThan(0.01);
    expected.toBeLessThan(0.025);
});

test('[D=1.069]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.01.', () => {
    let d = 1.069, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.01);
});

test('[D=1.1]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be in (0.005, 0.01).', () => {
    let d = 1.1, params = new Map([['validLength', 123]]);
    let expected = expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params));
    expected.toBeGreaterThan(0.005);
    expected.toBeLessThan(0.01);
});

test('[D=1.13]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.005.', () => {
    let d = 1.13, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.005);
});

test('[D=1.5]KSE.gamma(D/(sqrt(123) + 0.3/sqrt(123)), Map{\'validLength\'=123}) should be 0.005.', () => {
    let d = 1.5, params = new Map([['validLength', 123]]);
    expect(KolmogorovSmirnov.gamma(d/(sqrt(123) + 0.3/sqrt(123)), params)).toBe(0.005);
});

/**
 * Tests of KSE.weibull().
 */
test('[D=1]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be 0.1.', () => {
    let d = 1, params = new Map([['validLength', 1771]]);
    expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params)).toBe(0.1);
});

test('[D=1.372]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be 0.1.', () => {
    let d = 1.372, params = new Map([['validLength', 1771]]);
    expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params)).toBe(0.1);
});

test('[D=1.4]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be in (0.05, 0.1).', () => {
    let d = 1.4, params = new Map([['validLength', 1771]]);
    let expected = expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params));
    expected.toBeGreaterThan(0.05);
    expected.toBeLessThan(0.1);
});

test('[D=1.477]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be 0.05.', () => {
    let d = 1.477, params = new Map([['validLength', 1771]]);
    expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params)).toBe(0.05);
});

test('[D=1.5]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be in (0.025, 0.5).', () => {
    let d = 1.5, params = new Map([['validLength', 1771]]);
    let expected = expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params));
    expected.toBeGreaterThan(0.025);
    expected.toBeLessThan(0.05);
});

test('[D=1.557]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be 0.025.', () => {
    let d = 1.557, params = new Map([['validLength', 1771]]);
    expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params)).toBe(0.025);
});

test('[D=1.6]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be in (0.01, 0.025).', () => {
    let d = 1.6, params = new Map([['validLength', 1771]]);
    let expected = expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params));
    expected.toBeGreaterThan(0.01);
    expected.toBeLessThan(0.025);
});

test('[D=1.671]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be 0.01.', () => {
    let d = 1.671, params = new Map([['validLength', 1771]]);
    expect(abs(KolmogorovSmirnov.weibull(d/sqrt(1771), params) - 0.01) < Number.EPSILON).toBe(true);
});

test('[D=2]KSE.weibull(D/sqrt(1771), Map{\'validLength\'=1771}) should be 0.01.', () => {
    let d = 2, params = new Map([['validLength', 1771]]);
    expect(KolmogorovSmirnov.weibull(d/sqrt(1771), params)).toBe(0.01);
});