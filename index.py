def factorial(n):
  if n == 0 or n == 1:
    return 1
  else:
    return n * factorial(n - 1)
print(factorial(5))


# f(5)

# 5 * f(5-1)
# 20


# f(4)