'use strict'

import fs from 'fs';

/**
 * Read a csv file synchronously. Data in every cells would be read as a string.
 * @param {String} filePath 
 * @param {String} encoding 
 * @param {String} delimiter 
 * @param {Boolean} readHeader 
 * @returns {Array[]}
 */
function readCSVsync(filePath, encoding = 'UTF-8', delimiter = ',', readHeader = true)
{
    let lines = fs.readFileSync(filePath, encoding).split('\r\n');

    let result = [];

    for(let line of lines)
    {
        result.push(line.trim().split(delimiter));
    }

    return result;
}

exports = { readCSVsync };