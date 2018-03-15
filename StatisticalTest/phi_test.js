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

    miu = Math.log(mean / Math.sqrt(1 + variance / mean**2));

    log_var = Math.log(1 + variance / mean**2);

    log_std = Math.sqrt(log_var);

    for(i = 0; i < data.length; ++i)
    {
        // transformed.push(Math.exp(-(data[i] - mean)**2 / (2 * variance)) / (Math.sqrt(2 * Math.PI) * std_var))

        transformed.push(0.5 + erf((Math.log(data[i]) - miu) / (Math.SQRT2 * log_std)) / 2);
        
    }

    transformed.sort()

    return transformed;

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

var fs = require('fs');

var file = ".\\lgnorm_dist2.json"

var dist_data = JSON.parse(fs.readFileSync(file));

// Calculating p value for lognormal dist.
transformed = transformLognormality(dist_data);

console.log(transformed[99]);

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

// console.log("|Log-Normal|" + z.toString() + "|" + pvalue.toString() + "|" + dn.toString() + "|" + ksp + "|");

console.log('Lognor:');

console.log("AD-Value: " + z.toString() + "    p-Value(AD): " + pvalue.toString() + "    KS-Value: " + dn.toString() + "    p-Value(KS): " + ksp);
