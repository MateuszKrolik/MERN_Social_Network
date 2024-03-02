const { expect } = await import('chai');

import authMiddleware from '../middleware/is-auth.js';

it('should throw an error if no authorization header is present', () => {
  const req = {
    get: () => null,
  };
  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
    'Not authenticated.'
  );
});

// ✔ should throw an error if no authorization header is present

// 1 passing (3ms)
