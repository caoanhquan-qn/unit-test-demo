const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');
describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Quan');
    expect(result).toMatch('Quan');
  });
});
describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(['AUD', 'USD', 'EUR']));
  });
});
describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('price');
  });
});
describe('registerUser', () => {
  it('should throw error if username is falsy', () => {
    const args = [null, undefined, '', 0, NaN, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrowError(/required/);
    });
  });
  it('should return user object if valid username is passed', () => {
    const result = lib.registerUser('caoanhquan');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('username', 'caoanhquan');
  });
});
describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function (customerId) {
      console.log('Fake reading a customer from MongoDB...');
      return { id: customerId, points: 11 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'})
    mail.send = jest.fn();
    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
  });
});
