function gamma(x)
{
    var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
 
    var g = 7;
    if (x < 0.5) {
        return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
    }
 
    x -= 1;
    var a = p[0];
    var t = x + g + 0.5;
    for (var i = 1; i < p.length; i++) {
        a += p[i] / (x + i);
    }
 
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}

function erf(x) {
    // constants
    a1 = 0.254829592;
    a2 = -0.284496736;
    a3 = 1.421413741;
    a4 = -1.453152027;
    a5 = 1.061405429;
    p = 0.3275911;

    // Save the sign of x
    sign = 1;

    if (x < 0) {
        sign = -1;
    }

    x = Math.abs(x);

    // A&S formula 7.1.26
    t = 1.0 / (1.0 + p * x);

    y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

function mean(data)
{
    mu = 0;

    for(i = 0; i < data.length; ++i)
    {
        mu += data[i];
    }

    return mu /= data.length;
}

function variance(data)
{
    mu = mean(data);

    varia = 0;

    for(i = 0; i < data.length; ++i)
    {
        varia += (data[i] - mu)**2;
    }

    return varia /= (data.length - 1);
}

module.exports =
{
    "gamma" : gamma,
    "erf" : erf,
    "mean" : mean,
    "variance" : variance
};