// import { gamma } from 'mathfn/functions/gamma';

import transformations from "./lib/transformations";

import {AndersonDarling as adTest, OneKeyTestReport as oneKey} from "./lib/statistic-test";

import digamma from "math-digamma";

import spMath from "./lib/special-math";

import mathjs from "mathjs";

import fs from "fs";

// console.log("Uniform:")
// var file = ".\\unif_dist1.json";
// var dist_data = JSON.parse(fs.readFileSync(file));

// var transformed = transformations.uniform(dist_data);

// for(i = 0; i < transformed.length; ++i)
// {
//     if(transformed[i] <= 0 || transformed[i] >= 1)
//     {
//         console.log("[" + i.toString() + "]:" + transformed[i]);
//     }
// }

let file = ".\\dataset\\beta_dist1.json";
let distData = JSON.parse(fs.readFileSync(file));

console.log(oneKey.formatReportString(oneKey.beta(distData)));