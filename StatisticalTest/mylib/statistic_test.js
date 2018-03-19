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

        var g = function (zz) {
            return (2.00012 + (0.247105 - (0.0649821 - (0.0347962 - (0.0116720 - 0.00168691 * zz) * zz) * zz) * zz) * zz);
        }

        var gg = function (zz) {
            return (1.0776 - (2.30695 - (0.43424 - (0.082433 - (0.008056 - 0.0003146 * zz) * zz) * zz) * zz) * zz);
        }

        if (adValue < 2) {
            p = 1 - Math.pow(adValue, - 0.5) * Math.exp(-1.2337141 / adValue) * g(adValue);
        }
        else {
            p = 1 - Math.exp(-Math.exp(gg(adValue)));
        }

        return p;
    }

    static pValueExponential(data)
    {
        var adValue = AndersonDarling.test(data, transformatioins.exponent);

        if(adValue == null)
        {
            return 'N/A';
        }

        var n = data.length;

        var zStar = adValue * (1 + 0.6 / n);

        if (zStar <= 0.26) {
            return 1 - Math.exp(-12.2204 + 67.459 * zStar - 110.3 * (zStar ** 2));
        }
        else if (zStar <= 0.51) {
            return 1 - Math.exp(-6.1327 + 20.218 * zStar - 18.663 * zStar ** 2);
        }
        else if (zStar <= 0.95) {
            return Math.exp(0.9209 - 3.353 * zStar + 0.3 * zStar ** 2);
        }
        else if (zStar <= 10.03) {
            return Math.exp(0.731 - 3.008 * zStar + 0.15 * zStar ** 2);
        }

        return 0;
    }

    static pValueGamma(data)
    {
        var adValue = AndersonDarling.test(data, transformatioins.gamma);

        if(adValue == null)
        {
            return 'N/A';
        }

        var mu = spMath.mean(data), sigmaSqr = spMath.variance(data);

        var alpha = mu**2 / sigmaSqr;

        if(alpha <= 1)
        {
            if(adValue <= 0.486)
            {
                return "0.25+";
            }
            else if(adValue <= 0.657)
            {
                return "0.10~0.25";
            }
            else if(adValue <= 0.786)
            {
                return "0.05~0.10";
            }
            else if(adValue <= 0.917)
            {
                return "0.025~0.05";
            }
            else if(adValue <= 1.092)
            {
                return "0.01~0.025";
            }
            else if(adValue <= 1.227)
            {
                return "0.005~0.01";
            }
            else
            {
                return "0.005-";
            }
        }
        else if(alpha <= 8)
        {
            if(adValue <= 0.473)
            {
                return "0.25+";
            }
            else if(adValue <= 0.637)
            {
                return "0.10~0.25";
            }
            else if(adValue <= 0.759)
            {
                return "0.05~0.10";
            }
            else if(adValue <= 0.883)
            {
                return "0.025~0.05";
            }
            else if(adValue <= 1.048)
            {
                return "0.01~0.025";
            }
            else if(adValue <= 1.173)
            {
                return "0.005~0.01";
            }
            else
            {
                return "0.005-";
            }
        }
        else
        {
            if(adValue <= 0.47)
            {
                return "0.25+";
            }
            else if(adValue <= 0.631)
            {
                return "0.10~0.25";
            }
            else if(adValue <= 0.752)
            {
                return "0.05~0.10";
            }
            else if(adValue <= 0.873)
            {
                return "0.025~0.05";
            }
            else if(adValue <= 1.035)
            {
                return "0.01~0.025";
            }
            else if(adValue <= 1.159)
            {
                return "0.005~0.01";
            }
            else
            {
                return "0.005-";
            }
        }

        return "0";
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

    static pValueUniform(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformatioins.uniform);

        var wn = data.length;

        var D = Math.sqrt(wn) * ksValue;

        var k = 100;

        var ak;

        while (true) 
        {
            ak = 0;

            for (i = -k; i <= k; ++i) {
                ak += Math.pow(-1, i) * Math.exp(-2 * (i * D) ** 2);
            }

            if ((Math.pow(-1, k + 1) * Math.exp(-2 * ((k + 1) * D) ** 2)) < 0.00001) {
                break;
            }
        }

        return 1 - ak;
    }

    static pValueExponential(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformatioins.exponent);

        if(ksValue == null)
        {
            return 'N/A';
        }

        var wn = data.length;
        
        var d = (ksValue - 0.2 / wn) * (Math.sqrt(wn) + 0.25 + 0.5 / Math.sqrt(wn));

        if (d < 0.926) {
            return "0.15+";
        }
        else if (d < 0.995) {
            return "0.1~0.15";
        }
        else if (d < 1.094) {
            return "0.05~0.1";
        }
        else if (d < 1.184) {
            return "0.025~0.05";
        }
        else if (d < 1.298) {
            return "0.01~0.025";
        }
        else {
            return "0.01-"
        }
    }

    static pValueGamma(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformatioins.gamma);

        if(ksValue == null)
        {
            return 'N/A';
        }

        var wn = data.length;

        var d = ksValue * (Math.sqrt(wn) + 0.3 / Math.sqrt(wn));

        if(d <= 0.74)
        {
            return "0.25+";
        }
        else if(d <= 0.78)
        {
            return "0.2~0.25";
        }
        else if(d <= 0.8)
        {
            return "0.15~0.2";
        }
        else if(d <= 0.858)
        {
            return "0.1~0.15";
        }
        else if(d <= 0.928)
        {
            return "0.05~0.1";
        }
        else if(d <= 0.99)
        {
            return "0.025~0.05";
        }
        else if(d <= 1.069)
        {
            return "0.01~0.025";
        }
        else if(d <= 1.13)
        {
            return "0.005~0.01";
        }
        else 
        {
            return "0.005-";
        }
    }
};

module.exports = 
{
    "AndersonDarling" : AndersonDarling,
    "KolmogorovSmirnov" : KolmogorovSmirnov
};