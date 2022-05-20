const exercise1 = require('../exercise1');
describe('test fizzBuzz function', () => {
  it('should throw error if type of input is not number', () => {
    expect(() => {
      const args = ['a', true, NaN, null, undefined];
      args
        .forEach((a) => {
          exercise1.fizzBuzz(a);
        })
        .throwError(/number/);
    });
  });
  it('should return FizzBuzz if input is divisible by 3 and 5', () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  it('should return Fizz if input is only divisible by 3', () => {
    const result = exercise1.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  it('should return Fizz if input is only divisible by 5', () => {
    const result = exercise1.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  it('otherwise should return input value', () => {
    const result = exercise1.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
