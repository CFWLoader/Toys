# Notes

- For exponential distribution, $E(X) = \frac{1}{\lambda}$.
- Gamma Distribution, (<font color="red">deprecated</font>)$E(X) = \alpha\beta, Var(X) = \frac{\alpha}{\beta^2}$.
- Estimating parameters of gamma, beta, weibull distribution, using [Maximum Likehood Estimation](https://en.wikipedia.org/wiki/Gamma_distribution#Maximum_likelihood_estimation), note that $\Psi$ is [Digamma function](https://en.wikipedia.org/wiki/Digamma_function).
- [Digamma's library](https://www.npmjs.com/package/math-digamma), and $\Psi'$ is derivative of digamma function, called `trigamma`. [Trigamma's implementation](https://github.com/math-io/trigamma).
- CDF of Gamma Distribution, $F(x; \alpha, \beta) = \int_{0}^{x}f(u; \alpha, \beta)du = \frac{\gamma(\alpha, \beta x)}{\Gamma(\alpha)}$, where function $\gamma$ is lower [Incomplete Gamma Function](https://en.wikipedia.org/wiki/Incomplete_gamma_function). Using [Compute-io's implementation](https://github.com/compute-io/gammainc).
- Beta Distribution, (<font color="red">deprecated</font>)$\alpha = (\frac{1 - \mu}{\sigma^2} - \frac{1}{\mu})\mu^2, \beta = \alpha(\frac{1}{\mu} - 1)$. [Source](https://stats.stackexchange.com/questions/12232/calculating-the-parameters-of-a-beta-distribution-using-the-mean-and-variance).
- Weibull Distribution, (<font color="red">deprecated</font>)[estimate parameters](https://stats.stackexchange.com/questions/159452/how-can-i-recreate-a-weibull-distribution-given-mean-and-standard-deviation-and).
- Use [Lanczos Approximation](https://en.wikipedia.org/wiki/Lanczos_approximation) for [gamma function](https://en.wikipedia.org/wiki/Gamma_function)'s [implementation](https://rosettacode.org/wiki/Gamma_function).
- Details of parameters estimation from [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSLVMB_22.0.0/com.ibm.spss.statistics.algorithms/alg_simplan_distfit_continuous_beta.htm).