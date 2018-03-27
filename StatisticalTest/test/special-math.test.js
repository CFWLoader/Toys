import {readFileSync} from 'fs';

import {erf, gamma, trigamma, mean, means, gammaParameters, betaParameters, weibullParameters} from '../mylib/special-math';

const aqiData = JSON.parse(readFileSync('./dataset/aqi_dist.json'));

// const betaSynData = JSON.parse(readFileSync('./dataset/beta_dist1.json'));

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
 * Tests of trigamma().
 */
test("trigamma(1) should be 1.644934.", () => {
    expect(trigamma(1)).toBeCloseTo(1.644934);
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

/**
 * Tests of gammaParameters().
 */
test("gammaParameters(aqiData) should be {\"shape1\": 6.0726199636486, \"shape2\": 0.0861069903735485}", () => {
    // expect(gammaParameters(aqiData)).toEqual({"shape1" : 1, "shape2" : 2});
    let result = gammaParameters(aqiData);
    expect(result["shape1"]).toBeCloseTo(6.0726199636486);
    expect(result["shape2"]).toBeCloseTo(0.0861069903735485);
});

test("gammaParameters([]) should be {}", () => {
    expect(gammaParameters([])).toEqual({});
});

/**
 * Tests of betaParameters().
 */
test("betaParameters(aqiData) should be {}", () => {
    let result = betaParameters(aqiData);
    expect(result).toEqual({});
});

test("betaParameters([]) should be {}", () => {
    let result = betaParameters([]);
    expect(result).toEqual({});
});

// test("betaParameters(aqiData) should be {}", () => {
//     let result = betaParameters(aqiData);
//     expect(result).toEqual({});
// });

/**
 * Tests of weibullParameters().
 */
test("weibullParameters(aqiData) should be {\"shape1\": 79.678440486807, \"shape2\": 2.40870475769043}", () => {
    let result = weibullParameters(aqiData);
    expect(result["shape1"]).toBeCloseTo(79.678440486807);
    expect(result["shape2"]).toBeCloseTo(2.40870475769043);
});

/**
 * Other tests.
 */
// test("aqiData.reduce(val => Math.log(val), 0) == logSum?", () => {
//     let logSum = 0;

//     for(let val of aqiData)
//     {
//         logSum += Math.log(val);
//     }

//     expect(aqiData.reduce((pre, val) => {return pre + Math.log(val)})).toBe(logSum);
// });