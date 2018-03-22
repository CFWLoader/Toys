# Data Preprocessing<sup>[1]</sup>

### Outliers Detection

- Normal distribution. When this data's value is greater/less than $\mu \pm 3\sigma$. We might take it as outlier.
- Multinomial distribution.
- Mahalanobis distance.
- $X^2$ statistic.
- PCA.
- Matrix factorization.
- Machine Learning.

### Missing data

- Ignore this tuple.
- Fill this cell manually.
- Use a global constant.
- Use mean or mode value.
- Use mean or median from tuple in same class(Require classification at first).
- Use most probable value:
    - Bayesian decision tree.
    - Regression.

<cite>[1] Data Mining Concepts and Techniques, 3rd. Han</cite>