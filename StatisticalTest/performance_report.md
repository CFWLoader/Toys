<style>
    table{
        border-collapse: collapse;
        border-spacing: 0;
        border:2px solid #000000;
    }

    th{
        border:2px solid #000000;
    }

    td{
        border:1px solid #000000;
    }
</style>

# Performance Report

## Notice:
- `Triangular distribution` and `Beta distribution` have no calculation of p-value evaluation. Thus their p-values are always `N/A`.
- Once the dataset has negative numeric, `p-value` wouldn't be calculated with `Log-Normal distribution` and `Exponential distribution`. Then the values would be placed by `N/A`.
- Except `Uniform distribution`, all `p-values` from `Kolmogorov Smirnov Test` are only a approximate range. Thus `0.15+` means this `p-value` is greater than `0.15` but we cannot know exact value, so does `0.01-`.

<br/><br/><br/><br/>

## Dataset: AQI

### Distribution Shape
![](./aqi.png)

### Performance
| Hypothetical Distribution | AD-Value | p-Value(AD) | KS-Value | p-Value(KS) |
|:----:|:----:|:----:|:----:|:----:|
|Normal|33.50748|0.00000|0.14955|0.01-|
|Log-Normal|Infinity|0.00000|1.00000|0.01-|
|Uniform|114.04911|0.00000|0.32678|0.00000|
|Triangular|351.40173|N/A|1.00000|N/A|
|Exponential|163.86112|0.00000|0.37514|0.01-|

<br/><br/><br/><br/>

## Dataset: PM2.5

### Distribution Shape
![](./pm25.png)

### Performance
| Hypothetical Distribution | AD-Value | p-Value(AD) | KS-Value | p-Value(KS) |
|:----:|:----:|:----:|:----:|:----:|
|Normal|13.89068|0.00000|0.10220|0.01-|
|Log-Normal|576.85933|0.00000|1.00000|0.01-|
|Uniform|130.82067|0.00000|0.27920|0.00000|
|Triangular|190.69525|N/A|1.00000|N/A|
|Exponential|111.64493|0.00000|0.29785|0.01-|

<br/><br/><br/><br/>

## Synthetic Data: Normal Distribution

### Distribution Shape
![](./norm_dist1.png)

### Performance
| Hypothetical Distribution | AD-Value | p-Value(AD) | KS-Value | p-Value(KS) |
|:----:|:----:|:----:|:----:|:----:|
|Normal|0.21602|<font color="green">0.84547</font>|0.01327|<font color="green">0.15+</font>|
|Log-Normal|N/A|N/A|N/A|N/A|
|Uniform|120.07088|0.00000|0.25759|0.00000|
|Triangular|26.80576|N/A|0.09849|N/A|
|Exponential|N/A|N/A|N/A|N/A|

<br/><br/><br/><br/>

## Synthetic Data: Log-Normal Distribution

### Distribution Shape
![](./lgnorm_dist1.png)

### Performance
| Hypothetical Distribution | AD-Value | p-Value(AD) | KS-Value | p-Value(KS) |
|:----:|:----:|:----:|:----:|:----:|
|Normal|Infinity|0.00000|0.15029|0.01-|
|Log-Normal|0.76841|<font color="red">0.04571*</font>|0.02013|<font color="green">0.15+</font>|
|Uniform|1057.10698|0.00000|0.66225|0.00000|
|Triangular|219.24527|N/A|0.39526|N/A|
|Exponential|62.94554|0.00000|0.19471|0.01-|
-------------------------------------------------------------------------------------
This Hypothesis should be rejected according to regular threshold 0.05.

<br/><br/><br/><br/>

## Synthetic Data: Uniform Distribution

### Distribution Shape
![](./unif_dist1.png)

### Performance
| Hypothetical Distribution | AD-Value | p-Value(AD) | KS-Value | p-Value(KS) |
|:----:|:----:|:----:|:----:|:----:|
|Normal|11.46687|0.00000|0.06584|0.01-|
|Log-Normal|1169.98580|0.00000|1.00000|0.01-|
|Uniform|1.98831|<font color="green">0.09321</font>|0.03666|<font color="green">0.13602</font>|
|Triangular|94.62122|N/A|0.13900|N/A|
|Exponential|74.96612|0.00000|0.17860|0.01-|

<br/><br/><br/><br/>

## Synthetic Data: Triangular Distribution

### Distribution Shape
![](./tri_dist1.png)

### Performance
| Hypothetical Distribution | AD-Value | p-Value(AD) | KS-Value | p-Value(KS) |
|:----:|:----:|:----:|:----:|:----:|
|Normal|10.82141|0.00000|0.08167|0.01-|
|Log-Normal|7.56202|0.00000|0.05423|0.01-|
|Uniform|84.54097|0.00000|0.19844|0.00000|
|Triangular|1.10605|N/A|0.02677|N/A|
|Exponential|163.98213|0.00000|0.31782|0.01-|

<br/><br/><br/><br/>

## Synthetic Data: Exponential Distribution

### Distribution Shape
![](./exp_dist1.png)

### Performance
| Hypothetical Distribution | AD-Value | p-Value(AD) | KS-Value | p-Value(KS) |
|:----:|:----:|:----:|:----:|:----:|
|Normal|49.94726|0.00000|0.16526|0.01-|
|Log-Normal|Infinity|0.00000|1.00000|0.01-|
|Uniform|912.39265|0.00000|0.57583|0.00000|
|Triangular|155.24215|N/A|0.36371|N/A|
|Exponential|0.84787|<font color="green">0.18127</font>|0.02811|<font color="green">0.15+</font>|