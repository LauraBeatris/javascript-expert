const { deepStrictEqual, throws, ok } = require('assert');

const BankAccount = require('./src/BankAccount');

(() => {
  // Should be able to deposit money to bank account
  {
    const initialBalance = 1000;

    const bankAccount = new BankAccount(initialBalance);

    const depositValue = 1000;

    bankAccount.deposit(depositValue);

    const expectedBalance = initialBalance + depositValue;

    deepStrictEqual(bankAccount.balance, expectedBalance);
  }

  // Should not be able to deposit money to bank account after blocking it
  {
    const bankAccount = new BankAccount();

    bankAccount.blockAccount();

    const expectedError = {
      name: 'TypeError', 
      message: "Cannot assign to read only property 'balance' of object '#<BankAccount>'"
    };

    throws(() => bankAccount.deposit(1000), expectedError);
  }

  // Should not be able to access the password value on an enumeration
  {
    const bankAccount = new BankAccount();

    const bankAccountKeys = Object.keys(bankAccount);

    ok(!bankAccountKeys.includes('password'));
  }
})();