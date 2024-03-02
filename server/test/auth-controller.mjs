const { expect } = await import('chai');
import sinon from 'sinon';

import User from '../models/user.js';
import AuthController from '../controllers/auth.js';

// async
describe('Auth Controller - Login', () => {
  it('should throw an error with code 500 if accessing the database fails', () => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    expect(AuthController.login).to.throw();

    User.findOne.restore();
  });
});
