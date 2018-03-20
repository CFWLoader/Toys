spMath = require('./sp_math.js');

transformations = require('./transformations.js');

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
        var adValue = AndersonDarling.test(data, transformations.normality);

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
        var adValue = AndersonDarling.test(data, transformations.logNormality);

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
        var adValue = AndersonDarling.test(data, transformations.uniform);

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
        var adValue = AndersonDarling.test(data, transformations.exponent);

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
        var adValue = AndersonDarling.test(data, transformations.gamma);

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
                // return "0.10~0.25";
                return (adValue - 0.486) * (0.1 - 0.25) / (0.657 - 0.486) + 0.25;
            }
            else if(adValue <= 0.786)
            {
                // return "0.05~0.10";
                return (adValue - 0.657) * (0.05 - 0.1) / (0.786 - 0.657) + 0.1;
            }
            else if(adValue <= 0.917)
            {
                // return "0.025~0.05";
                return (adValue - 0.786) * (0.025 - 0.05) / (0.917 - 0.786) + 0.05;
            }
            else if(adValue <= 1.092)
            {
                // return "0.01~0.025";
                return (adValue - 0.917) * (0.01 - 0.025) / (1.092 - 0.917) + 0.025;
            }
            else if(adValue <= 1.227)
            {
                // return "0.005~0.01";
                return (adValue - 1.092) * (0.005 - 0.01) / (1.227 - 1.092) + 0.01;
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
                // return "0.10~0.25";
                return (adValue - 0.473) * (0.1 - 0.25) / (0.637 - 0.473) + 0.25;
            }
            else if(adValue <= 0.759)
            {
                // return "0.05~0.10";
                return (adValue - 0.637) * (0.05 - 0.1) / (0.759 - 0.637) + 0.1;
            }
            else if(adValue <= 0.883)
            {
                // return "0.025~0.05";
                return (adValue - 0.759) * (0.025 - 0.05) / (0.883 - 0.759) + 0.05;
            }
            else if(adValue <= 1.048)
            {
                // return "0.01~0.025";
                return (adValue - 0.883) * (0.01 - 0.025) / (1.048 - 0.883) + 0.025;
            }
            else if(adValue <= 1.173)
            {
                // return "0.005~0.01";
                return (adValue - 1.048) * (0.005 - 0.01) / (1.173 - 1.038) + 0.01;
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
                // return "0.10~0.25";
                return (adValue - 0.47) * (0.1 - 0.25) / (0.631 - 0.47) + 0.25;
            }
            else if(adValue <= 0.752)
            {
                // return "0.05~0.10";
                return (adValue - 0.631) * (0.05 - 0.1) / (0.752 - 0.631) + 0.1;
            }
            else if(adValue <= 0.873)
            {
                // return "0.025~0.05";
                return (adValue - 0.752) * (0.025 - 0.05) / (0.873 - 0.752) + 0.05;
            }
            else if(adValue <= 1.035)
            {
                // return "0.01~0.025";
                return (adValue - 0.873) * (0.01 - 0.025) / (1.035 - 0.873) + 0.025;
            }
            else if(adValue <= 1.159)
            {
                // return "0.005~0.01";
                return (adValue - 1.035) * (0.005 - 0.01) / (1.159 - 1.035) + 0.01;
            }
            else
            {
                return "0.005-";
            }
        }

        return "0";
    }

    static pValueWeibull(data)
    {
        var adValue = AndersonDarling.test(data, transformations.weibull);

        var wn = data.length;

        if(adValue == null)
        {
            return 'N/A';
        }

        var zStar = adValue * (1 + 0.2 / Math.sqrt(wn));

        if(zStar <= 0.474)
        {
            return "0.25+";
        }
        else if(zStar <= 0.637)
        {
            return (zStar - 0.474) * (0.1 - 0.25) / (0.637 - 0.474) + 0.25;
        }
        else if(zStar <= 0.757)
        {
            return (zStar - 0.637) * (0.05 - 0.01) / (0.757 - 0.637) + 0.1;
        }
        else if(zStar <= 0.877)
        {
            return (zStar - 0.757) * (0.025 - 0.05) / (0.877 - 0.757) + 0.05;
        }
        else if(zStar <= 1.038)
        {
            return (zStar - 0.877) * (0.01 - 0.025) / (1.038 - 0.877) + 0.025;
        }
        else
        {
            return '0.01-';
        }
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
        var ksValue = KolmogorovSmirnov.test(data, transformations.normality);

        var n = data.length;

        var d = ksValue * (Math.sqrt(n) - 0.01 + 0.85 / Math.sqrt(n));

        if (d < 0.775) {
            return "0.15+";
        }
        else if (d < 0.819) {
            // return "0.1~0.15";
            return (d - 0.775) * (0.1 - 0.15) / (0.819 - 0.775) + 0.15;
        }
        else if (d < 0.895) {
            // return "0.05~0.1";
            return (d - 0.819) * (0.05 - 0.1) / (0.895 - 0.819) + 0.1;
        }
        else if (d < 0.995) {
            // return "0.025~0.05";
            return (d - 0.895) * (0.025 - 0.05) / (0.995 - 0.895) + 0.05;
        }
        else if (d < 1.035) {
            // return "0.01~0.025";
            return (d - 0.995) * (0.01 - 0.025) / (1.035 - 0.995) + 0.025;
        }
        else {
            return "0.01-";
        }
    }

    static pValueLogNormal(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformations.logNormality);

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
            // return "0.1~0.15";
            return (d - 0.775) * (0.1 - 0.15) / (0.819 - 0.775) + 0.15;
        }
        else if (d < 0.895) {
            // return "0.05~0.1";
            return (d - 0.819) * (0.05 - 0.1) / (0.895 - 0.819) + 0.1;
        }
        else if (d < 0.995) {
            // return "0.025~0.05";
            return (d - 0.895) * (0.025 - 0.05) / (0.995 - 0.895) + 0.05;
        }
        else if (d < 1.035) {
            // return "0.01~0.025";
            return (d - 0.995) * (0.01 - 0.025) / (1.035 - 0.995) + 0.025;
        }
        else {
            return "0.01-";
        }
    }

    static pValueUniform(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformations.uniform);

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
        var ksValue = KolmogorovSmirnov.test(data, transformations.exponent);

        if(ksValue == null)
        {
            return 'N/A';
        }

        var wn = data.length;
        
        var d = (ksValue - 0.2 / wn) * (Math.sqrt(wn) + 0.25 + 0.5 / Math.sqrt(wn));

        if (d <= 0.926) {
            return "0.15+";
        }
        else if (d <= 0.995) {
            // return "0.1~0.15";
            return (d - 0.926) * (0.1 - 0.15) / (0.995 - 0.926) + 0.15;
        }
        else if (d <= 1.094) {
            // return "0.05~0.1";
            return (d - 0.995) * (0.05 - 0.1) / (1.094 - 0.995) + 0.1;
        }
        else if (d <= 1.184) {
            // return "0.025~0.05";
            return (d - 1.094) * (0.025 - 0.05) / (1.184 - 1.094) + 0.05;
        }
        else if (d <= 1.298) {
            // return "0.01~0.025";
            return (d - 1.184) * (0.01 - 0.025) / (1.298 - 1.184) + 0.025;
        }
        else {
            return "0.01-"
        }
    }

    static pValueGamma(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformations.gamma);

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
            // return "0.2~0.25";
            return (d - 0.74) * (0.2 - 0.25) / (0.78 - 0.74) + 0.25;
        }
        else if(d <= 0.8)
        {
            // return "0.15~0.2";
            return (d - 0.78) * (0.15 - 0.2) / (0.8 - 0.78) + 0.2;
        }
        else if(d <= 0.858)
        {
            // return "0.1~0.15";
            return (d - 0.8) * (0.1 - 0.15) / (0.858 - 0.8) + 0.15;
        }
        else if(d <= 0.928)
        {
            // return "0.05~0.1";
            return (d - 0.858) * (0.05 - 0.1) / (0.928 - 0.858) + 0.1;
        }
        else if(d <= 0.99)
        {
            // return "0.025~0.05";
            return (d - 0.928) * (0.025 - 0.05) / (0.99 - 0.928) + 0.05;
        }
        else if(d <= 1.069)
        {
            // return "0.01~0.025";
            return (d - 0.99) * (0.01 - 0.025) / (1.069 - 0.99) + 0.025;
        }
        else if(d <= 1.13)
        {
            // return "0.005~0.01";
            return (d - 1.069) * (0.005 - 0.01) / (1.13 - 1.069) + 0.01;
        }
        else 
        {
            return "0.005-";
        }
    }

    static pValueWeibull(data)
    {
        var ksValue = KolmogorovSmirnov.test(data, transformations.weibull);

        if(ksValue == null)
        {
            return 'N/A';
        }

        var wn = data.length;

        var d = Math.sqrt(wn) * ksValue;

        if(d <= 1.372)
        {
            return '0.1+';
        }
        else if(d <= 1.477)
        {
            return (d - 1.372) * (0.05 - 0.1) / (1.477 - 1.372) + 0.1;
        }
        else if(d <= 1.557)
        {
            return (d - 1.477) * (0.025 - 0.5) / (1.557 - 1.477) + 0.05;
        }
        else if(d <= 1.671)
        {
            return (d - 1.557) * (0.01 - 0.025) / (1.671 - 1.557) + 0.025;
        }
        else
        {
            return '0.01-';
        }
    }
};

class OneKeyTestReport
{
    static normality(data)
    {
        var transformed = transformations.normality(data);

        var result = {
            "type" : "normality",
            "mu" : spMath.mean(data),
            "sigma" : Math.sqrt(spMath.variance(data)),
            "adValue" : AndersonDarling.test(transformed),
            "adPvalue" : AndersonDarling.pValueNormal(data),
            "ksValue" : KolmogorovSmirnov.test(transformed),
            "ksPvalue" : KolmogorovSmirnov.pValueNormal(data)
        };

        return result;
    }

    static logNormality(data)
    {
        var transformed = transformations.logNormality(data);

        var mu = spMath.mean(data), sigmaSqr = spMath.variance(data);

        var log_mean = Math.log(mu / Math.sqrt(1 + sigmaSqr / mu ** 2));

        var log_sd = Math.sqrt(Math.log(1 + sigmaSqr / mu ** 2));

        var result = {
            "type" : "lognormality",
            "mu" : mu,
            "sigma" : sigma,
            "logMu" : log_mean,
            "logSigma" : log_sd,
            "adValue" : AndersonDarling.test(transformed),
            "adPvalue" : AndersonDarling.pValueLogNormal(data),
            "ksValue" : KolmogorovSmirnov.test(transformed),
            "ksPvalue" : KolmogorovSmirnov.pValueLogNormal(data)
        };

        return result;
    }

    static gamma(data)
    {
        var mu = spMath.mean(data), sigmaSqr = spMath.variance(data);

        var beta = mu / sigmaSqr, alpha = mu * beta;

        var transformed = transformations.gamma(data);

        var result = {
            "type" : "gamma",
            "mu" : mu,
            "sigma" : Math.sqrt(sigmaSqr),
            "shape1" : alpha,
            "shape2" : beta,
            "adValue" : AndersonDarling.test(transformed),
            "adPvalue" : AndersonDarling.pValueNormal(data),
            "ksValue" : KolmogorovSmirnov.test(transformed),
            "ksPvalue" : KolmogorovSmirnov.pValueNormal(data)
        };

        return result;
    }

    static exponent(data)
    {
        var mu = spMath.mean(data), sigma = Math.sqrt(spMath.variance(data));

        var transformed = transformations.exponent(data);

        var result = {
            "type" : "exponent",
            "mu" : mu,
            "shape" : 1 / mu,
            "sigma" : sigma,
            "adValue" : AndersonDarling.test(transformed),
            "adPvalue" : AndersonDarling.pValueExponential(data),
            "ksValue" : KolmogorovSmirnov.test(transformed),
            "ksPvalue" : KolmogorovSmirnov.pValueExponential(data)
        };

        return result;
    }

    static triangle(data)
    {
        var mu = spMath.mean(data), sigma = Math.sqrt(spMath.variance(data));

        var transformed = transformations.triangle(data);

        var result = {
            "type" : "triangle",
            "mu" : mu,
            "sigma" : sigma,
            "adValue" : AndersonDarling.test(transformed),
            "adPvalue" : "N/A",
            "ksValue" : KolmogorovSmirnov.test(transformed),
            "ksPvalue" : "N/A"
        };

        return result;
    }

    static uniform(data)
    {
        var minVal = data.reduce(function (a, b) { return a < b ? a : b; }) - 0.001, maxVal = data.reduce(function (a, b) { return a > b ? a : b; }) + 0.001;

        var transformed = transformations.uniform(data);        

        var result = {
            "type" : "uniform",
            "min" : minVal,
            "max" : maxVal,
            "adValue" : AndersonDarling.test(transformed),
            "adPvalue" : AndersonDarling.pValueUniform(data),
            "ksValue" : KolmogorovSmirnov.test(transformed),
            "ksPvalue" : KolmogorovSmirnov.pValueUniform(data)
        };

        return result;
    }

    static weibull(data)
    {
        var mu = spMath.mean(data);

        var sigmaSqr = spMath.variance(data);

        var k = Math.pow(Math.sqrt(sigmaSqr) / mu, -1.086);

        var lambda = mu / spMath.gamma(1 + 1 / k);

        var transformed = transformations.weibull(data);        

        var result = {
            "type" : "weibull",
            "shape1" : lambda,
            "shape2" : k,
            "mu" : mu,
            "sigma" : Math.sqrt(sigmaSqr),
            "adValue" : AndersonDarling.test(transformed),
            "adPvalue" : AndersonDarling.pValueWeibull(data),
            "ksValue" : KolmogorovSmirnov.test(transformed),
            "ksPvalue" : KolmogorovSmirnov.pValueWeibull(data)
        };

        return result;
    }

    static formatReportString(data)
    {
        var header;

        if(data["type"] == "normality")
        {
            header = "Normality[mean=" + data["mu"].toString() + ", std_dev=" + data["sigma"].toString() + "]:";
        }
        else if(data["type"] == "lognormality")
        {
            header = "Log-Normality[log-mean=" + data["logMu"].toString() + ", log-std_dev=" + data["logSigma"].toString() + "]:";
        }
        else if(data["type"] == "exponent")
        {
            header = "Exponent[shape=" + data["shape"].toString() + "]:";
        }
        else if(data["type"] == "gamma")
        {
            header = "Gamma[shape1=" + data["shape1"].toString() + ", shape2=" + data["shape2"].toString() + "]:";
        }
        else if(data["type"] == "triangle")
        {
            header = "Triangle[Not-Available now]:";
        }
        else if(data["type"] == "uniform")
        {
            header = "Uniform[min=" + data["min"].toString() + ", max=" + data["max"].toString() + "]:";
        }
        else if(data["type"] == "weibull")
        {
            header = "Weibull[shape1=" + data["shape1"].toString() + ", shape2=" + data["shape2"].toString() + "]:";
        }

        return header + "\nAD: " + data["adValue"].toString() + ", ADP: " + data["adPvalue"].toString() + ", KS: " + data["ksValue"].toString() + ", KSP: " + data["ksPvalue"].toString();
    }
};

module.exports = 
{
    "AndersonDarling" : AndersonDarling,
    "KolmogorovSmirnov" : KolmogorovSmirnov,
    "OneKeyTestReport" : OneKeyTestReport
};