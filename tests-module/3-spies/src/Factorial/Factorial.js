class Factorial {
  execute(factorialNumber) {
    return factorialNumber 
      ? factorialNumber * this.execute(factorialNumber - 1) 
      : 1;
  }
}

module.exports = Factorial;