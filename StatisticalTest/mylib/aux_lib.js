'use strict'

const fs = require('fs');

function readCSVsync(filePath, encoding = 'UTF-8', delimiter = ',', readHeader = true)
{
    var lines = fs.readFileSync(filePath, encoding).split('\r\n');

    var result = [];

    for(var i = readHeader ? 0 : 1; i < lines.length; ++i)
    {
        result.push(lines[i].trim().split(delimiter));
    }

    return result;
}

module.exports = 
{
    'readCSVsync' : readCSVsync
}