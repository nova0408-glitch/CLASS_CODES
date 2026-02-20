# CP 215 Lab 8 - Test Preparation Notes

This folder contains one Java file per lab question:
- `Lab8Q1.java`
- `Lab8Q2.java`
- `Lab8Q3.java`
- `Lab8Q4.java`
- `Lab8Q5.java`
- `Lab8Q6.java`
- `Lab8Q7.java`

## Q1: Catching Exceptions with Superclasses (`Lab8Q1.java`)
Technique used:
- Inheritance hierarchy for exceptions:
  - `ExceptionA` <- `ExceptionB` <- `ExceptionC`
- Catching with superclass type (`catch (ExceptionA e)`)

What it proves:
- A catch block for a parent class can handle objects of child exception classes.

Exam point:
- Catching a superclass is broader and catches subclass exceptions too.

## Q2: Catching with `Exception` (`Lab8Q2.java`)
Technique used:
- A single generic catch type: `catch (Exception e)`
- Throwing both custom exceptions (`ExceptionA`, `ExceptionB`) and built-in ones (`NullPointerException`, `IOException`)

What it proves:
- `Exception` can catch many checked and unchecked exception types.

Exam point:
- This is flexible, but too generic catches can hide specific error handling details.

## Q3: Order of Catch Blocks (`Lab8Q3.java`)
Technique used:
- Correct order: subclass catch first, then superclass catch
- Included a commented wrong-order example that causes compile error

What it proves:
- Catch order matters. If superclass comes first, subclass catch becomes unreachable.

Exam point:
- Java compiler checks reachability of catch blocks at compile time.

## Q4: Constructor Failure (`Lab8Q4.java`)
Technique used:
- Constructor declares `throws Exception`
- Constructor throws immediately
- Object creation wrapped in `try-catch` in `main`

What it proves:
- Constructors can fail and pass failure details to caller via exceptions.

Exam point:
- If constructor throws checked exception, caller must handle or declare it.

## Q5: Rethrowing Exceptions (`Lab8Q5.java`)
Technique used:
- `someMethod2` throws initial exception
- `someMethod` catches and rethrows
- `main` catches rethrown exception and prints stack trace

What it proves:
- Exception can be handled partially (log/print) then forwarded upward.

Exam point:
- Rethrow keeps propagation chain; stack trace is important for debugging.

## Q6: Catching in Outer Scope (`Lab8Q6.java`)
Technique used:
- Inner method catches only one exception type
- Different exception (`ArithmeticException`) is not caught there
- Outer scope catches it

What it proves:
- A method's try-catch does not have to handle every possible exception.
- Unhandled exceptions move to caller scope.

Exam point:
- Exception handling can be layered across methods.

## Q7: Exception Propagation (`Lab8Q7.java`)
Technique used:
- `propagator1` throws `ArithmeticException` (division by zero)
- `propagator2` catches and rethrows
- `main` handles and prints stack trace

What it proves:
- Exceptions propagate method-to-method until a matching catch handles them.

Exam point:
- Understand call stack flow: throw -> intermediate method -> caller.

## Common Test Mistakes to Avoid
- Wrong catch order (superclass before subclass).
- Forgetting `throws` for checked exceptions.
- Catching too generally when question asks specific catch type.
- Swallowing exceptions silently (empty catch block).
- Forgetting to show propagation path in output/stack trace questions.

## How to Run
Compile all:
```bash
javac Lab8Q1.java Lab8Q2.java Lab8Q3.java Lab8Q4.java Lab8Q5.java Lab8Q6.java Lab8Q7.java
```

Run one program:
```bash
java Lab8Q1
```
