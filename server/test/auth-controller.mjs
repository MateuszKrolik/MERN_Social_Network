const { expect } = await import('chai');
import sinon from 'sinon';

import User from '../models/user.js';
import AuthController from '../controllers/auth.js';

// async
describe('Auth Controller - Login', () => {
  it('should throw an error with code 500 if accessing the database fails', (done) => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'password',
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    });

    User.findOne.restore();
  });
});

// Auth Controller - Login
// ✔ should throw an error with code 500 if accessing the database fails

// Auth Middleware
// ✔ should throw an error if no authorization header is present
// ✔ should yield a userId after decoding the token
// ✔ should throw an error if the authorization header is only one string

// 4 passing (7ms)
