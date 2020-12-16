const { spy } = require('sinon');
const { deepStrictEqual } = require('assert');

const Fibonacci = require('./Fibonacci');
const { getFibonacciSequenceCallCount } = require('./utils');

const FIBONACCI_SEQUENCE_MOCK_VALUE = 3;

(async () => {
  // Should be able to return the correct value of a Fibonacci sequence
  {
    const fibonacci = new Fibonacci();

    const [...results] = fibonacci.execute(FIBONACCI_SEQUENCE_MOCK_VALUE);

    const expectedResult = [0, 1, 1];

    deepStrictEqual(results, expectedResult);
  }

  // Should call recursive Fibonacci algorithm with a valid calls count number
  {
    const fibonacci = new Fibonacci();

    const fibonacciExecuteSpy = spy(fibonacci, fibonacci.execute.name);

    for await (
      const _sequenceResult of fibonacci.execute(FIBONACCI_SEQUENCE_MOCK_VALUE)
    ){} 

    const expectedCallCount = getFibonacciSequenceCallCount(FIBONACCI_SEQUENCE_MOCK_VALUE);

    deepStrictEqual(fibonacciExecuteSpy.callCount, expectedCallCount);
  }

  // Should assign correct params for a given Fibonacci call 
  {
    const fibonacci = new Fibonacci();

    const fibonacciExecuteSpy = spy(fibonacci, fibonacci.execute.name);

    for await (
      const _sequenceResult of fibonacci.execute(FIBONACCI_SEQUENCE_MOCK_VALUE)
    ){} 

    const secondCallExpectedParams = Object.values({
      input: 2,
      current: 1,
      next: 1,
    });

    const thirdCallExpectedParams = Object.values({
      input: 1,
      current: 1,
      next: 2,
    });

    const fourthCallExpectedParams = Object.values({
      input: 0,
      current: 2,
      next: 3,
    });

    deepStrictEqual(fibonacciExecuteSpy.getCall(1).args, secondCallExpectedParams);
    deepStrictEqual(fibonacciExecuteSpy.getCall(2).args, thirdCallExpectedParams);
    deepStrictEqual(fibonacciExecuteSpy.getCall(3).args, fourthCallExpectedParams);
  }
})();