import {inv, det, transpose, multiply} from 'mathjs';

import {removeMissings, fillMissingsWithGlobal, fillMissingsWithMean, fillMissingsWithMLR} from '../mylib/data-preprocessor';

const originalDataset = [
    [1, 2, 3, 4],
    [2, 2, null, 3],
    [1, 2, 4, 8],
    [null, null, 1, 2]
];

const originalDataset1 = [
    [1, 2, 3, 4],
    [2, 2, null, 3],
    [1, 12, 4, 8],
    [null, null, 1, 2],
    [7, 2, 3, 4],
    [2, 93, null, 3],
    [1, 2, 4, 8],
    [11, null, 1, 2]
];

const globalValues = [1, 2, 3, 4];

/**
 * Tests of removeMissings().
 */
test("removeMissings(originalDataset) should be [[1,2,3,4], [1,2,4,8]].", () => {
    expect(removeMissings(originalDataset)).toEqual([[1,2,3,4], [1,2,4,8]]);
});

/**
 * Tests of fillMissingsWithGlobal().
 */
test("fillMissingsWithGloabl(originalDataset) should be [[1, 2, 3, 4], [2, 2, 3, 3], [1, 2, 4, 8], [1, 2, 1, 2]]", () => {
    expect(fillMissingsWithGlobal(originalDataset, globalValues)).toEqual([[1, 2, 3, 4], [2, 2, 3, 3], [1, 2, 4, 8], [1, 2, 1, 2]]);
});

/**
 * Tests of fillMissingsWithMean().
 */
test("fillMissingsWithMean(originalDataset) should trigger determinant zero.", () => {
    let result = fillMissingsWithMean(originalDataset);
    expect(result[1][2]).toBeCloseTo(2.66666666666);
    expect(result[3][0]).toBeCloseTo(1.33333333333);
    expect(result[3][1]).toBe(2);
});

/**
 * Tests of fillMissingsWithMLR().
 */
test('fillMissingsWithMLR(originalDataset) should throw determinant zero error.', () => {
    expect(() => fillMissingsWithMLR(originalDataset)).toThrowError('Cannot calculate inverse, determinant is zero');
    // let result = fillMissingsWithMLR(originalDataset);
    // expect(originalDataset[1][2]).toBe(null);
    // expect(result[1][2]).toBeCloseTo(2.66666666666);
    // expect(result[3][0]).toBeCloseTo(1.33333333333);
    // expect(result[3][1]).toBe(2);
});

test('fillMissingsWithMLR(originalDataset1) should fix null cells.', () => {
    
    let result = fillMissingsWithMLR(originalDataset1);
    
    // console.log(result);

    let passed = true;

    for(let row of result)
    {
        for(let cell of row)
        {
            if(cell == null)
            {
                passed = false;

                break;
            }
        }

        if(!passed)
        {
            break;
        }
    }

    expect(passed).toBe(true);
});

/**
 * Other tests.
 */
// test("Trying catch exception from mathJS.inv(), should receive determinant zero error.", () => {
//     const zeroDeterm = [
//         [2, 3, 4, 1],
//         [2, 4, 8, 1]
//     ];

//     const zdMul = multiply(transpose(zeroDeterm), zeroDeterm);

//     expect(() => {inv(zdMul)}).toThrow();
    
// });