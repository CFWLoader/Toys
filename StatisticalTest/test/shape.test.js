import {shape} from '../lib/shape';

import {aqiData, betaSynData} from './test-datasets';

/**
 * Tests of shape() function.
 */
test('shape(3) should throw TypeError(\'Array type required.\')', () => {
    expect(() => shape(3)).toThrowError('Array type required.');
});

test('shape(\'hello\') should throw TypeError(\'Array type required.\')', () => {
    expect(() => shape('hello')).toThrowError('Array type required.');
});

test('shape([]) should be map(Map([[\'length\', 0], [\'mean\', 0], [\'sigma\', 0], [\'logMean\', 0], [\'logSigma\', 0], [\'min\', 0], [\'max\', 0], [\'mode\', 0],[\'logOneMinusSum\', 0]])).', () => {
    
    let result = shape([]);

    expect(result).toBeInstanceOf(Map);

    expect(result.get('length')).toBe(0);
    expect(result.get('mean')).toBe(0);
    expect(result.get('sigma')).toBe(0);
    expect(result.get('logMean')).toBe(0);
    expect(result.get('logSigma')).toBe(0);
    expect(result.get('min')).toBe(0);
    expect(result.get('max')).toBe(0);
    expect(result.get('mode')).toBe(0);
    expect(result.get('logOneMinusSum')).toBe(0);
});

test('shape([1]) should be Map([length: 1, mean:1, sigma: 0, logMean: 0, logOneMinusSum: -Inf, logSigma: 0, min: 1, max: 1, mode: 1]).', () => {
    
    let result = shape([1]);

    expect(result.get('length')).toBe(1);
    expect(result.get('mean')).toBe(1);
    expect(result.get('sigma')).toBe(0);
    expect(result.get('logMean')).toBe(0);
    expect(result.get('logSigma')).toBe(0);
    expect(result.get('min')).toBe(1);
    expect(result.get('max')).toBe(1);
    expect(result.get('mode')).toBe(1);
    expect(result.get('logOneMinusSum')).toBe(-Infinity);
});

test('shape([1, null]) should be Map([length: 2, mean:1, sigma: 0, logMean: 0, logOneMinusSum: -Inf, logSigma: 0, min: 1, max: 1, mode: 1, validLength: 1, nullIndexes = [1]]).', () => {
    
    let result = shape([1, null]);

    expect(result.get('length')).toBe(2);
    expect(result.get('mean')).toBe(1);
    expect(result.get('sigma')).toBe(0);
    expect(result.get('logMean')).toBe(0);
    expect(result.get('logSigma')).toBe(0);
    expect(result.get('min')).toBe(1);
    expect(result.get('max')).toBe(1);
    expect(result.get('mode')).toBe(1);
    expect(result.get('logOneMinusSum')).toBe(-Infinity);
    expect(result.get('validLength')).toBe(1);
    expect(result.get('nullIndexes')).toEqual([1]);
});

test('shape([null, null, null]) should be Map([length: 3, mean:0, sigma: 0, logMean: 0, logOneMinusSum: 0, logSigma: 0, min: 0, max: 0, mode: 0, validLength: 0, nullIndexes = []]).', () => {
    
    let result = shape([null, null, null]);

    expect(result.get('length')).toBe(3);
    expect(result.get('mean')).toBe(0);
    expect(result.get('sigma')).toBe(0);
    expect(result.get('logMean')).toBe(0);
    expect(result.get('logSigma')).toBe(0);
    expect(result.get('min')).toBe(0);
    expect(result.get('max')).toBe(0);
    expect(result.get('mode')).toBe(0);
    expect(result.get('logOneMinusSum')).toBe(0);
    expect(result.get('validLength')).toBe(0);
    expect(result.get('nullIndexes')).toEqual([]);
});

test('shape(aqiData) should be Map{length: 912, mean:70.5241228070175, sigma: 30.66384223583148, logMean: 4.171365, logSigma: 0.407784223583148, min: 17, max: 205, mode: 17}.', () => {

    let result = shape(aqiData);

    expect(result.get('length')).toBe(912);
    expect(result.get('mean')).toBeCloseTo(70.5241228070175, 5);
    expect(result.get('sigma')).toBeCloseTo(30.66384223583148, 5);
    expect(result.get('logMean')).toBeCloseTo(4.171365, 5);
    expect(result.get('logSigma')).toBeCloseTo(0.407784223583148, 5);
    expect(result.get('min')).toBe(17);
    expect(result.get('max')).toBe(205);
    expect(result.get('mode')).toBe(17);
});

/**
 * Others tests.
 */