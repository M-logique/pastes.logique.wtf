from typing import Any, overload, Optional
from functools import wraps


class Typed:
    def __init__(self, expected_type: Any, is_subclass: bool = False):
        self.expected_type = expected_type
        self.is_subclass = is_subclass

    def __set_name__(self, owner, name):
        self.property_name = name
    
    def __get__(self, instance, owner):
        return instance.__dict__[self.property_name]

    def __set__(self, instance, value):
        self.check_type(value)
        instance.__dict__[self.property_name] = value

    def check_type(self, value):
        type_error = TypeError(f"{self.property_name} must be of type '{self.expected_type.__name__}'")
        value_error = ValueError(f"{self.property_name} cannot be empty or falsy")

        if self.is_subclass:
            if not issubclass(value, self.expected_type):
                raise type_error
        elif not isinstance(value, self.expected_type):
            raise type_error
        elif not value:
            raise value_error


class IsInstance:
    instance_type = Typed(type)
    error_type = Typed(BaseException, True)
    error_text = Typed(str)

    @overload
    def __init__(self, value: Any, instance_type: type, /): ...

    @overload
    def __init__(self, instance_type: type, error_type: Exception, error_text: str, /): ...

    def __init__(self, value: Optional[Any], instance_type: type, error_type: Exception, error_text: str, /) -> None:
        self.value = value
        self.instance_type = instance_type
        self.error_type = error_type
        self.error_text = error_text
    
    def __call__(self, func):
        @wraps(func)
        def wrapper(value):
            if isinstance(value, self.instance_type):
                return func(value)
            elif self.error_type and self.error_text:
                raise self.error_type(f"{self.error_text}")
        return wrapper

    def __bool__(self):
        if isinstance(self.value, self.instance_type):
            return True
        elif self.error_type and self.error_text:
            raise self.error_type(f"{self.error_text}")
        return False


# if True and issubclass(ValueError, Exception):
#     print(1)
# elif isinstance(int, type):
#     print(2)
# print((True and isinstance(ValueError, BaseException)) or False)
# print("\n__________________________\n")
xxx = IsInstance(int, ValueError, "2")

@IsInstance(int, ValueError, "Must be an integer")
def xxxxx(value):
    print(1)

xxxxx(1)

print(IsInstance(12, int))