from sympy import *

init_printing()

x = Symbol('x')

expr1 = exp(sqrt(1/x))

print(pretty(Integral(expr1, x)))
# pprint(Integral(expr1, x))

pprint(integrate(expr1, x))

# Print latex expression.
print(latex(Integral(expr1, x)))