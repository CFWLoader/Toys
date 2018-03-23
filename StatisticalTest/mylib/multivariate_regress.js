'use strict';

// function getData(dataset)
// {
//     console.log(dataset[0][0]);
// }

function extractColumn(dataset, targetColumn)
{
    if(dataset.length == 0)
    {
        return [];
    }

    if(Object.prototype.toString.call(dataset[0]) != '[object Array]' || dataset[0].length <= targetColumn)
    {
        return [];
    }

    var result = [], tupleLen = dataset[0].length;
    
    for(var row = 0; row < dataset.length; ++row)
    {
        result.push(dataset[row][targetColumn]);
    }

    return result;
}

function excludeColumn(dataset, targetColumn)
{   
    if(dataset.length == 0)
    {
        return [];
    }

    if(Object.prototype.toString.call(dataset[0]) != '[object Array]')
    {
        return [];
    }

    var result = [], tupleLen = dataset[0].length, col, rwVal;
    
    for(var row = 0; row < dataset.length; ++row)
    {
        col = 0;

        rwVal = [];

        for(; col < targetColumn; ++col)
        {
            rwVal.push(dataset[row][col]);
        }

        for(col = targetColumn + 1; col < tupleLen; ++col)
        {
            rwVal.push(dataset[row][col]);
        }
        
        result.push(rwVal);
    }

    return result;  
}

module.exports = {
    "extractColumn" : extractColumn,
    "excludeColumn" : excludeColumn
};