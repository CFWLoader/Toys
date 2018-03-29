import {shape} from '../lib/shape';

import datasets from './test-datasets';

/**
 * Tests of shape() function.
 */
test('shape([]) should be map([]).', () => {
    
    let result = expect(shape([]));

    result.toBeInstanceOf(Map);

    result.toEqual(new Map([]));
});

test('shape([1]) should be Map([length: 1, mean:1, sigma: 0, logMean: 0, logOneMinusSum: -Inf, logSigma: 0, min: 1, max: 1, mode: 1]).', () => {
    expect(shape([1])).toEqual(
        new Map([
            ['length', 1], 
            ['mean', 1],
            ['sigma', 0],
            ['logMean', 0], 
            ['logOneMinusSum', -Infinity], 
            ['logSigma', 0],
            ['min', 1], 
            ['max', 1], 
            ['mode', 1]
        ]));
});

test('shape(aqiData) should be {length: 912, mean:70.5241228070175, sigma: 30.66384223583148, logMean: 4.171365, logSigma: 0.407784223583148, min: 17, max: 205, mode: 17}.', () => {

    let aqiData = datasets.aqiData;

    let result = shape(aqiData);

    expect(result.get('length')).toBe(912);
    expect(result.get('mean')).toBeCloseTo(70.5241228070175);
    expect(result.get('sigma')).toBeCloseTo(30.66384223583148);
    expect(result.get('logMean')).toBeCloseTo(4.171365);
    expect(result.get('logSigma')).toBeCloseTo(0.407784223583148);
    expect(result.get('min')).toBe(17);
    expect(result.get('max')).toBe(205);
    expect(result.get('mode')).toBe(17);
});

/**
 * Others tests.
 */
// test('Testing Map.isMap({}).', () => {
//     let mapInstance = new Map();

//     expect(mapInstance instanceof Map).toBe(true);

//     expect(Array.isArray(mapInstance)).toBe(false);
// });