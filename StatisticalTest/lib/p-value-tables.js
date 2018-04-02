'use strict';

/**
 * Function for assisting AD's p-value of uniform.
 */
function uniform_g(zz){
    return (2.00012 + (0.247105 - (0.0649821 - (0.0347962 - (0.0116720 - 0.00168691 * zz) * zz) * zz) * zz) * zz);
}

function uniform_gg(zz){
    return (1.0776 - (2.30695 - (0.43424 - (0.082433 - (0.008056 - 0.0003146 * zz) * zz) * zz) * zz) * zz);
}

/**
 * Table of (Log)Normality in AD's method.
 * Format: [Threshold, param1, param2, param3]
 */
export const AD_NORMALITY_TABLE = [
    [0.2, -13.436, 101.14, - 223.73],
    [0.34, -8.318, 42.796, - 59.938],
    [0.6, 0.9177, -4.279, - 1.38],
    [153.467, 1.2937, -5.709, 0.0186]
];

/**
 * Table of Exponent in AD's method.
 * Format: [Threshold, param1, param2, param3]
 */
export const AD_EXPONENT_TABLE = [
    [0.26, -12.2204, 67.459, -110.3],
    [0.51, -6.1327, 20.218, -18.663],
    [0.95, 0.9209, -3.353, 0.3],
    [10.03, 0.731, -3.009, 0.15]
];

/**
 * Table of Gamma in AD's method.
 * Format: [Threshold of Alpha, [Threshold of params, probability]]
 */
export const AD_GAMMA_TABLE = [
    [1, [
        [0.486, 0.25],
        [0.657, 0.1],
        [0.786, 0.05],
        [0.917, 0.025],
        [1.092, 0.01],
        [1.227, 0.005]
    ]],
    [8, [
        [0.473, 0.25],
        [0.637, 0.1],
        [0.759, 0.05],
        [0.883, 0.025],
        [1.048, 0.01],
        [1.173, 0.005]
    ]],
    [Infinity, [
        [0.47, 0.25],
        [0.631, 0.1],
        [0.752, 0.05],
        [0.873, 0.025],
        [1.035, 0.01],
        [1.159, 0.005]
    ]]
];

/**
 * Table of Weibull in AD's method.
 * Format: [Threshold, probability]
 */
export const AD_WEIBULL_TABLE = [
    [0.474, 0.25],
    [0.637, 0.1],
    [0.757, 0.05],
    [0.877, 0.025],
    [1.038, 0.01]
];

/**
 * Table of (Log)Normality in KS's method.
 * Format: [Threshold, probability]
 */
export const KS_NORMALITY_TABLE = [
    [0.775, 0.15],
    [0.819, 0.1],
    [0.895, 0.05],
    [0.995, 0.025],
    [1.035, 0.01]
];

/**
 * Table of Exponent in KS's method.
 * Format: [Threshold, probability]
 */
export const KS_EXPONENT_TABLE = [
    [0.926, 0.15],
    [0.995, 0.1],
    [1.094, 0.05],
    [1.184, 0.025],
    [1.298, 0.01]
];

/**
 * Table of Gamma in KS's method.
 * Format: [Threshold, probability]
 */
export const KS_GAMMA_TABLE = [
    [0.74, 0.25], 
    [0.78, 0.2],
    [0.8, 0.15],
    [0.858, 0.1],
    [0.928, 0.05],
    [0.99, 0.025],
    [1.069, 0.01],
    [1.13, 0.005]
];

/**
 * Table of Weibull in KS's method.
 * Format: [Threshold, probability]
 */
export const KS_WEIBULL_TABLE = [
    [1.372, 0.1],
    [1.477, 0.05],
    [1.557, 0.025],
    [1.671, 0.01]
];

export {uniform_g, uniform_gg};