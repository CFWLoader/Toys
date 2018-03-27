import spMath from '../mylib/sp_math';

test("erf(3) should be", () => {
    expect(spMath.erf(3).toFixed(6)).toBe(0.9999779);
});