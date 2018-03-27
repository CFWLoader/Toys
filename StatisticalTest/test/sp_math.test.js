import {erf, gamma, mean, means} from '../mylib/sp_math';

/**
 * Tests of erf function.
 */
test("erf(3) should be 0.9999779.", () => {
    expect(erf(3)).toBeCloseTo(0.9999779);
});

test("erf(1000) should be 1.", () => {
    expect(erf(1000)).toBeCloseTo(1);
});

test("erf(NaN) should be NaN.", () => {
    expect(erf(NaN)).toBe(NaN);
});

/**
 * Tests of gamma function.
 */
test("gamma(1) should be 1.", () => {
    expect(gamma(1)).toBeCloseTo(1);
});

test("erf(1000) should be 1.", () => {
    expect(gamma(2.1)).toBeCloseTo(1.046486);
});

/**
 * Tests of mean function.
 */
test("mean([1, 1, 1]) should be 1.", () => {
    expect(mean([1, 1, 1])).toBe(1);
});

test("mean([]) should be 0.", () => {
    expect(mean([])).toBe(0);
});

/**
 * Tests of means function.
 */
test("means([]) should be [].", () => {
    expect(means([])).toEqual([]);
});

test("means([[1]]) should be [1].", () => {
    expect(means([[1]])).toEqual([1]);
});

test("means([1, 2, 3, 4]) should be [].", () => {
    expect(means([1, 2, 3, 4])).toEqual([]);
});

test("means([[1], [1], [1], [1]]) should be [1].", () => {
    expect(means([[1], [1], [1], [1]])).toEqual([1]);
});

test("means([[1, null], [1, null], [1, 4], [1, null]]) should be [1, 1].", () => {
    expect(means([[1, null], [1, null], [1, 4], [1, null]])).toEqual([1, 1]);
});

test("means([[1, null], [1, null], [1, null], [1, null]]) should be [1, 1].", () => {
    expect(means([[1, null], [1, null], [1, null], [1, null]])).toEqual([1, 0]);
});