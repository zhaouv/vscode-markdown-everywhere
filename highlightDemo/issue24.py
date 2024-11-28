# %% [markdown]
a=11231231231
a=123123123123

# [markdown]
a=11231231231
a=123123123123

# [markdown]
# a=11231231231
a=123
a=123

# 123
# 234


"""
# Basic Type Annotations
For basic type annotations, we will cover annotating variables for basic
container types and simple functions.

In this post we will be using the function [reveal_type]
(https://docs.python.org/3/library/typing.html#typing.reveal_type) to
ask the static type checker to reveal the inferred type of its argument.

Most type checkers support reveal_type() even if the name is not
imported from typing. However, to avoid runtime errors it should be
imported from the typing module. At runtime, this function prints the
runtime type of its argument and returns the argument unchanged.
"""

# %% [markdown]
"""
# Basic Type Annotations
For basic type annotations, we will cover annotating variables for basic
container types and simple functions.

In this post we will be using the function [reveal_type]
(https://docs.python.org/3/library/typing.html#typing.reveal_type) to
ask the static type checker to reveal the inferred type of its argument.

Most type checkers support reveal_type() even if the name is not
imported from typing. However, to avoid runtime errors it should be
imported from the typing module. At runtime, this function prints the
runtime type of its argument and returns the argument unchanged.
"""