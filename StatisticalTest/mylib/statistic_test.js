spMath = require('./sp_math.js');

transformatioins = require('./transformations.js');

class AndersonDarling
{
    static test(data, transformation = null) 
    {
        if(transformation != null)
        {   
            data = transformation(data);
        }

        if(data.length < 1)
        {
            return null;
        }

        var n = data.length, s = 0;
    
        for (i = 0; i < data.length; ++i)
        {
            s += (2 * i + 1) * Math.log(data[i] * (1 - data[n - 1 - i]))      // Notice original is (2 * i - 1) and data[n + 1 - i]. Fix head offset.
        }
    
        return -n - s / n;
    }

    static pValueNormal(data)
    {
        var adValue = AndersonDarling.test(data, transformatioins.normality);

        var n = data.length;

        var zStar = adValue * (1 + 0.75 / n + 2.25 / (n ** 2));

        if (zStar <= 0.2) {
            return 1 - Math.exp(-13.436 + 101.14 * zStar - 223.73 * (zStar ** 2));
        }
        else if (zStar <= 0.34) {
            return 1 - Math.exp(-8.318 + 42.796 * zStar - 59.938 * (zStar ** 2));
        }
        else if (zStar <= 0.6) {
            return Math.exp(0.9177 - 4.279 * zStar - 1.38 * (zStar ** 2));
        }
        else if (zStar <= 153.467) {
            return Math.exp(1.2937 - 5.709 * zStar + 0.0186 * (zStar ** 2));
        }
        else {
            return 0;
        }
    }

    static pValueLogNormal(data)
    {
        var adValue = AndersonDarling.test(data, transformatioins.logNormality);

        if(adValue == null)
        {
            return 'N/A';
        }

        var n = data.length;

        var zStar = adValue * (1 + 0.75 / n + 2.25 / (n ** 2));

        if (zStar <= 0.2) {
            return 1 - Math.exp(-13.436 + 101.14 * zStar - 223.73 * (zStar ** 2));
        }
        else if (zStar <= 0.34) {
            return 1 - Math.exp(-8.318 + 42.796 * zStar - 59.938 * (zStar ** 2));
        }
        else if (zStar <= 0.6) {
            return Math.exp(0.9177 - 4.279 * zStar - 1.38 * (zStar ** 2));
        }
        else if (zStar <= 153.467) {
            return Math.exp(1.2937 - 5.709 * zStar + 0.0186 * (zStar ** 2));
        }
        else {
            return 0;
        }
    }

    static pValueUniform(data)
    {
        var adValue = AndersonDarling.test(data, transformatioins.uniform);

        var p = 0;

        g = function (zz) {
            return (2.00012 + (0.247105 - (0.0649821 - (0.0347962 - (0.0116720 - 0.00168691 * zz) * zz) * zz) * zz) * zz);
        }

        gg = function (zz) {
            return (1.0776 - (2.30695 - (0.43424 - (0.082433 - (0.008056 - 0.0003146 * zz) * zz) * zz) * zz) * zz);
        }

        if (z < 2) {
            p = 1 - Math.pow(z, - 0.5) * Math.exp(-1.2337141 / z) * g(z);
        }
        else {
            p = 1 - Math.exp(-Math.exp(gg(z)));
        }

        return p;
    }
};

class KolmogorovSmirnov
{
    static test(data, transformation = null) 
    {
        if(transformation != null)
        {   
            data = transformation(data);
        }

        if(data.length < 1)
        {
            return null;
        }

        var len = data.length;

        var wn = len;

        var wi = 1;

        var dplus = 0,  dminus = 0, dp, dm;

        for (i = 0; i < len; ++i, ++wi) 
        {
            dp = Math.abs(data[i] - wi / wn);

            dm = Math.abs(data[i] - (wi - 1) / wn);

            dplus = dplus > dp ? dplus : dp;

            dminus = dminus > dm ? dminus : dm;
        }

        return Math.max(dplus, dminus);
    }

    static pValueNormal(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformatioins.normality);

        var n = data.length;

        var d = ksValue * (Math.sqrt(n) - 0.01 + 0.85 / Math.sqrt(n));

        if (d < 0.775) {
            return "0.15+";
        }
        else if (d < 0.819) {
            return "0.1~0.15";
        }
        else if (d < 0.895) {
            return "0.05~0.1";
        }
        else if (d < 0.995) {
            return "0.025~0.05";
        }
        else if (d < 1.035) {
            return "0.01~0.025";
        }
        else {
            return "0.01-"
        }
    }

    static pValueLogNormal(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformatioins.logNormality);

        if(ksValue == null)
        {
            return 'N/A';
        }

        var n = data.length;

        var d = ksValue * (Math.sqrt(n) - 0.01 + 0.85 / Math.sqrt(n));

        if (d < 0.775) {
            return "0.15+";
        }
        else if (d < 0.819) {
            return "0.1~0.15";
        }
        else if (d < 0.895) {
            return "0.05~0.1";
        }
        else if (d < 0.995) {
            return "0.025~0.05";
        }
        else if (d < 1.035) {
            return "0.01~0.025";
        }
        else {
            return "0.01-"
        }
    }
};

module.exports = 
{
    "AndersonDarling" : AndersonDarling,
    "KolmogorovSmirnov" : KolmogorovSmirnov
};