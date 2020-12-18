class BankAccount {
  balance = 0;
  password = 'Random Password';

  constructor(initialBalance) {
    this.balance = initialBalance ?? 0;

    Object.defineProperty(this, 'password', {
      enumerable: false,
    });
  }

  deposit(money) {
    this.balance += money;
  }

  blockAccount() {
    Object.defineProperty(this, 'balance', {
      writable: false,
    });
  }
}

module.exports = BankAccount;