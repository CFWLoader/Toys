# Notes

- For exponential distribution, $E(X) = \frac{1}{\lambda}$.
- Gamma Distribution, $E(X) = \alpha\beta, Var(X) = \frac{\alpha}{\beta^2}$.
- CDF of Gamma Distribution, $F(x; \alpha, \beta) = \int_{0}^{x}f(u; \alpha, \beta)du = \frac{\gamma(\alpha, \beta x)}{\Gamma(\alpha)}$, where function $\gamma$ is lower [Incomplete Gamma Function](https://en.wikipedia.org/wiki/Incomplete_gamma_function).
- Beta Distribution, $\alpha = (\frac{1 - \mu}{\sigma^2} - \frac{1}{\mu})\mu^2, \beta = \alpha(\frac{1}{\mu} - 1)$. [Source](https://stats.stackexchange.com/questions/12232/calculating-the-parameters-of-a-beta-distribution-using-the-mean-and-variance).
- Weibull Distribution, [estimate parameters](https://stats.stackexchange.com/questions/159452/how-can-i-recreate-a-weibull-distribution-given-mean-and-standard-deviation-and).
- Use [Lanczos Approximation](https://en.wikipedia.org/wiki/Lanczos_approximation) for [gamma function](https://en.wikipedia.org/wiki/Gamma_function)'s [implementation](https://rosettacode.org/wiki/Gamma_function).