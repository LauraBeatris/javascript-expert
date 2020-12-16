const { spy } = require('sinon');
const { deepStrictEqual } = require('assert');

const Factorial = require('./Factorial');
const { getFactorialCallCount } = require('./utils');

const FACTORIAL_NUMBER_MOCK_VALUE = 5;

(() => {
  // Should be able to correctly calculate the factorial of a number
  {
    const factorial = new Factorial();

    const expectedResult = 120;

    deepStrictEqual(factorial.execute(FACTORIAL_NUMBER_MOCK_VALUE), expectedResult);
  }

  // Should call recursive Factorial algorithm with a valid calls count number
  {
    const factorial = new Factorial();

    const factorialExecuteSpy = spy(factorial, factorial.execute.name);

    factorial.execute(FACTORIAL_NUMBER_MOCK_VALUE);

    const expectedCountCall = getFactorialCallCount(FACTORIAL_NUMBER_MOCK_VALUE);

    deepStrictEqual(factorialExecuteSpy.callCount, expectedCountCall);
  }
})();