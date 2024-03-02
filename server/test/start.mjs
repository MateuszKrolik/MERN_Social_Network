const { expect } = await import('chai');

it('should add numbers correctly', function () {
  const num1 = 2;
  const num2 = 3;
  expect(num1 + num2).to.equal(5);
});

it('should not give a result of 6', function () {
  const num1 = 3;
  const num2 = 3;
  expect(num1 + num2).not.to.equal(6);
});

// ✔ should add numbers correctly
// 1) should not give a result of 6

// 1 passing (4ms)
// 1 failing

// 1) should not give a result of 6:

//     AssertionError: expected 6 to not equal 6
//     + expected - actual
