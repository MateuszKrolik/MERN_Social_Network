const { expect } = await import('chai');

import authMiddleware from '../middleware/is-auth.js';

describe('Auth Middleware', () => {
  it('should throw an error if no authorization header is present', () => {
    const req = {
      get: () => null,
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated.'
    );
  });

  it('should throw an error if the authorization header is only one string', () => {
    const req = {
      get: (headerName) => {
        return 'xyz';
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});

// Auth Middleware
// ✔ should throw an error if no authorization header is present
// ✔ should throw an error if the authorization header is only one string


// 2 passing (4ms)