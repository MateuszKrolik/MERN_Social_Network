const { expect } = await import('chai');
import jwt from 'jsonwebtoken';
import sinon from 'sinon';

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

  it('should yield a userId after decoding the token', () => {
    const req = {
      get: (headerName) => {
        return 'Bearer xyz';
      },
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
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
// ✔ should yield a userId after decoding the token
// ✔ should throw an error if the authorization header is only one string

// 3 passing (6ms)
