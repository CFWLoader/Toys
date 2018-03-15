function erf(x)
{
    // constants
    a1 =  0.254829592;
    a2 = -0.284496736;
    a3 =  1.421413741;
    a4 = -1.453152027;
    a5 =  1.061405429;
    p  =  0.3275911;

    // Save the sign of x
    sign = 1;

    if (x < 0)
    {
        sign = -1;
    }

    x = Math.abs(x);

    // A&S formula 7.1.26
    t = 1.0/(1.0 + p*x);
    
    y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x*x);

    return sign*y;
}

function transformNormality(data)
{
    transformed = [];

    mean = 0;

    for(i = 0; i < data.length; ++i)
    {
        mean += data[i];
    }

    mean /= data.length;

    variance = 0;

    for(i = 0; i < data.length; ++i)
    {
        variance += (mean - data[i])**2;
    }

    variance /= (data.length - 1);

    std_var = Math.sqrt(variance);

    for(i = 0; i < data.length; ++i)
    {
        // transformed.push(Math.exp(-(data[i] - mean)**2 / (2 * variance)) / (Math.sqrt(2 * Math.PI) * std_var))

        transformed.push(0.5 + erf((data[i] - mean) / (Math.SQRT2 * std_var)) / 2)
        
    }

    transformed.sort()

    return transformed;

}

function transformLognormality(data)
{
    transformed = [];

    mean = 0;

    for(i = 0; i < data.length; ++i)
    {
        if(data[i] <= 0)
        {
            return 0;
        }

        mean += data[i];
    }

    mean /= data.length;

    variance = 0;

    for(i = 0; i < data.length; ++i)
    {
        variance += (mean - data[i])**2;
    }

    variance /= (data.length - 1);

    std_var = Math.sqrt(variance);

    for(i = 0; i < data.length; ++i)
    {
        // transformed.push(Math.exp(-(data[i] - mean)**2 / (2 * variance)) / (Math.sqrt(2 * Math.PI) * std_var))

        transformed.push(0.5 + erf((Math.log(data[i]) - Math.log(mean)) / (Math.SQRT2 * std_var)) / 2);
        
    }

    transformed.sort()

    return transformed;

}

function transformUniform(data)
{
    a = data.reduce(function(a,b){return a < b ? a : b;}) - 0.001;

    b = data.reduce(function(a,b){return a > b ? a : b;}) + 0.001;

    len = b - a;

    transformed = [];

    for(i = 0; i < data.length; ++i)
    {
        transformed.push((data[i] - a) / len);
    }

    return transformed.sort();
}

function transformTriangle(data)
{
    var a = b = c = data[0], mean = 0;

    for(i = 0; i < data.length; ++i)
    {
        if(a > data[i])
        {
            a = data[i];
        }

        if(c < data[i])
        {
            c = data[i];
        }

        mean += data[i];
    }

    a -= 0.001;

    c += 0.001;

    mean /= data.length;

    // console.log(a);

    // console.log(c);

    // console.log(mean);

    b = 3 * mean - a - c;           // From mean = (a + b + c) / 3

    transformed = [];

    len = c - a;

    for(i = 0; i < data.length; ++i)
    {
        if(data[i] < b)
        {
            transformed.push((data[i] - a)**2 / (len * (b - a)));
        }
        else if(data[i] == b)
        {
            transformed.push((b - a) / len);
        }
        else
        {
            transformed.push(1 - (c - data[i])**2 / (len * (c - b)));
        }
    }

    return transformed.sort();
}

function transformExponent(data)
{
    mean = 0;

    for(i = 0; i < data.length; ++i)
    {
        if(data[i] < 0)
        {
            return 0;
        }

        mean += data[i];
    }

    // mean /= data.length;

    lambda = data.length / mean;

    transformed = [];

    for(i = 0; i < data.length; ++i)
    {
        transformed.push(1 - Math.exp(- lambda * data[i]));
    }

    return transformed.sort();
}

function andersonDarlingTest(data)
{
    n = data.length;

    s = 0;

    for(i = 0; i < data.length; ++i)
    {
        // console.log(data[i]);

        s += (2 * i + 1) * Math.log(data[i] * (1 - data[n - 1 - i]))      // Notice original is (2 * i - 1) and data[n + 1 - i]. Fix head offset.
    }

    // console.log(s);

    return -n - s / n;
}

function adpValueNormal(z, n)
{
    zStar = z * (1 + 0.75 / n + 2.25 / (n**2));

    // var math = require('mathjs');

    // console.log(zStar);

    if(zStar <= 0.2)
    {
        return 1 - Math.exp(-13.436 + 101.14 * zStar - 223.73 * (zStar**2));
    }
    else if(zStar <= 0.34)
    {
        return 1 - Math.exp(-8.318 + 42.796 * zStar - 59.938 * (zStar**2));
    }
    else if(zStar <= 0.6)
    {
        return Math.exp(0.9177 - 4.279 * zStar - 1.38 * (zStar**2));
    }
    else if(zStar <= 153.467)
    {
        return Math.exp(1.2937 - 5.709 * zStar + 0.0186 * (zStar**2));
    }
    else
    {
        return 0;
    }
}

function adpValueUniform(z)
{
    p = 0;

    g = function (zz)
    {
        return (2.00012 + (0.247105 - (0.0649821 - (0.0347962 - (0.0116720 - 0.00168691 * zz) * zz) * zz) * zz) * zz);
    }

    gg = function(zz)
    {
        return (1.0776 - (2.30695 - (0.43424 - (0.082433 - (0.008056 - 0.0003146 * zz) * zz) * zz) * zz) * zz);
    }

    if(z < 2)
    {
        p = 1 - Math.pow(z, - 0.5) * Math.exp(-1.2337141/z) * g(z);
    }
    else
    {
        p = 1 - Math.exp(-Math.exp(gg(z)));
    }

    return p;
}

function adpValueExponent(adValue, n)
{
    zStar = adValue * (1 + 0.6 / n);

    // console.log(zStar);

    if(zStar <= 0.26)
    {
        return 1 - Math.exp(-12.2204 + 67.459 * zStar - 110.3 * (zStar**2));
    }
    else if(zStar <= 0.51)
    {
        return 1 - Math.exp(-6.1327 + 20.218 * zStar - 18.663 * zStar**2);
    }
    else if(zStar <= 0.95)
    {
        return Math.exp(0.9209 - 3.353 * zStar + 0.3 * zStar**2);
    }
    else if(zStar <= 10.03)
    {
        return Math.exp(0.731 - 3.008 * zStar + 0.15 * zStar**2);
    }
    
    return 0;
}

function kolmogorovSmirnovTest(data)
{
    len = wn = data.length;

    wi = 1;

    dplus = dminus = 0;

    for(i = 0; i < len; ++i, ++wi)
    {
        dp = Math.abs(data[i] - wi / wn);

        dm = Math.abs(data[i] - (wi - 1) / wn);

        dplus = dplus > dp ? dplus : dp;

        dminus = dminus > dm ? dminus : dm;
    }

    return Math.max(dplus, dminus);

    // D = Math.sqrt(dn) * dn;

    // k = 100;

    // var ak;

    // while(true)
    // {
    //     ak = 0;

    //     for(i = -k; i <= k; ++i)
    //     {
    //         ak += Math.pow(-1, i) * Math.exp(-2 * (i * D)**2);
    //     }

    //     if((Math.pow(-1, k + 1) * Math.exp(-2 * ((k + 1) * D)**2)) < 0.00001)
    //     {
    //         break;
    //     }
    // }

    // return 1 - ak;
}

function kspValueUniform(wn, dn)
{
    D = Math.sqrt(wn) * dn;

    k = 100;

    var ak;

    while(true)
    {
        ak = 0;

        for(i = -k; i <= k; ++i)
        {
            ak += Math.pow(-1, i) * Math.exp(-2 * (i * D)**2);
        }

        if((Math.pow(-1, k + 1) * Math.exp(-2 * ((k + 1) * D)**2)) < 0.00001)
        {
            break;
        }
    }

    return 1 - ak;
}

function kspValueNormal(wn, dn)
{
    d = dn * (Math.sqrt(wn) - 0.01 + 0.85 / Math.sqrt(wn));

    if(d < 0.775)
    {
        return "0.15+";
    }
    else if(d < 0.819)
    {
        return "0.1~0.15";
    }
    else if(d < 0.895)
    {
        return "0.05~0.1";
    }
    else if(d < 0.995)
    {
        return "0.025~0.05";
    }
    else if(d < 1.035)
    {
        return "0.01~0.025";
    }
    else
    {
        return "0.01-"
    }
}

function kspValueExponent(wn, dn)
{
    d = (dn - 0.2 / wn) * (Math.sqrt(wn) + 0.25 + 0.5 / Math.sqrt(wn));

    if(d < 0.926)
    {
        return "0.15+";
    }
    else if(d < 0.995)
    {
        return "0.1~0.15";
    }
    else if(d < 1.094)
    {
        return "0.05~0.1";
    }
    else if(d < 1.184)
    {
        return "0.025~0.05";
    }
    else if(d < 1.298)
    {
        return "0.01~0.025";
    }
    else
    {
        return "0.01-"
    }
}

var fs = require('fs');

// var file = ".\\aqi_dist.json"
// var file = ".\\lgnorm_dist1.json";
// var file = ".\\norm_dist1.json";
// var file = ".\\pm25_dist.json"
// var file = ".\\unif_dist1.json"
// var file = ".\\tri_dist1.json"
var file = ".\\exp_dist1.json"

var dist_data = JSON.parse(fs.readFileSync(file));

// dist_data = [5.02144572057012,5.27095462697867,4.24098779700312,3.77693811629623,3.8922761911524,4.19199197366233,5.15760329903681,4.54092656396069,1.845727713764,2.69368890351628,3.92682789931376,4.61465311445803,2.47493412356073,5.61245516829378,3.54970515174603,2.38674835535991,3.13868868087249,3.95401538679392,4.5920237667083,5.11075611912838,3.83482723185007,4.01759665149544,5.20915847831284,2.64979395448603,4.78217113856739,2.54436622158851,5.68924394751701,2.93200146739065,4.52792551572647,2.21060363564674];

// dist_data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Calculating p value for normal dist.
transformed = transformNormality(dist_data);

z = andersonDarlingTest(transformed);

dn = kolmogorovSmirnovTest(transformed);

console.log("|Normal|" + z.toFixed(5).toString() + "|" + adpValueNormal(z, transformed.length).toFixed(5).toString() + "|" + dn.toFixed(5).toString() + "|" + kspValueNormal(transformed.length, dn).toString() + "|");

// console.log('Nor:');

// console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + adpValueNormal(z, transformed.length) + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + kspValueNormal(transformed.length, dn).toString());

// Calculating p value for lognormal dist.
transformed = transformLognormality(dist_data);

var z, pvalue, dn, ksp;

if(transformed == 0)
{
    z = 'N/A';

    pvalue = 'N/A';

    dn = 'N/A'

    ksp = 'N/A'
}
else
{   
    z = andersonDarlingTest(transformed).toFixed(5);

    pvalue = adpValueNormal(z, transformed.length).toFixed(5);

    dn = kolmogorovSmirnovTest(transformed).toFixed(5);

    ksp = kspValueNormal(transformed.length, dn);
}

console.log("|Log-Normal|" + z.toString() + "|" + pvalue.toString() + "|" + dn.toString() + "|" + ksp + "|");

// console.log('Lognor:');

// console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + pvalue.toString() + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + ksp);

// Calculating p value for uniform dist.
transformed = transformUniform(dist_data);

// transformed.shift();

// transformed.pop();

z = andersonDarlingTest(transformed);

dn = kolmogorovSmirnovTest(transformed);

console.log("|Uniform|" + z.toFixed(5).toString() + "|" + adpValueUniform(z).toFixed(5).toString() + "|" + dn.toFixed(5).toString() + "|" + kspValueUniform(transformed.length, dn).toString() + "|");

// console.log('Unif:');

// console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + adpValueUniform(z).toString() + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + kspValueUniform(transformed.length, dn).toString());

// Calculating ad value for trangular dist.
transformed = transformTriangle(dist_data);

transformed.shift();

transformed.pop();

z = andersonDarlingTest(transformed);

dn = kolmogorovSmirnovTest(transformed);

console.log("|Triangular|" + z.toFixed(5).toString() + "|N/A" + "|" + dn.toFixed(5).toString() + "|N/A|");

// console.log('Tria:');

// console.log("AD-Value: " + z.toString() + "    p-Value(AD): N/A" + "    KS-Value: " + dn.toString() + "    p-Value(KS): N/A");

// Calculating p value for exponent dist.
transformed = transformExponent(dist_data);

var pvalue, z;

if(transformed == 0)
{
    z = 'N/A';

    pvalue = 'N/A';

    dn = 'N/A';

    ksp = 'N/A';
}
else
{
    z = andersonDarlingTest(transformed).toFixed(5);

    pvalue = adpValueExponent(z, transformed.length).toFixed(5);

    dn = kolmogorovSmirnovTest(transformed).toFixed(5);

    ksp = kspValueExponent(transformed.length, dn);
}

console.log("|Exponential|" + z.toString() + "|" + pvalue.toString() + "|" + dn.toString() + "|" + ksp + "|");

// console.log('Exp:')

// console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + pvalue.toString() + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + ksp);