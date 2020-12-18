class Fibonacci {
  *execute(input, current = 0, next = 1) {
    const hasEndedSequence = input === 0;

    if (hasEndedSequence) {
      return input;
    }

    yield current;

    const nextInput = input - 1;
    const nextValue = current + next;
    const nextCurrent = next;

    yield* this.execute(nextInput, nextCurrent, nextValue);
  }
}

module.exports = Fibonacci;