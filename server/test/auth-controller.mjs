const { expect } = await import('chai');
import sinon from 'sinon';
import mongoose from 'mongoose';

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

  it('should send a response with a valid user status for an existing user', (done) => {
    mongoose
      .connect(
        'mongodb+srv://mateuszkrolik87:1I9UbNZqMksVzkNk@cluster0.gdjmk4f.mongodb.net/test-messages'
      )
      .then((result) => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'Test',
          posts: [],
        });
        return user.save();
      })
      .then(() => {});
      .catch((err) => {
        console.log(err);
      });
  });
});

// Auth Controller - Login
// ✔ should throw an error with code 500 if accessing the database fails

// Auth Middleware
// ✔ should throw an error if no authorization header is present
// ✔ should yield a userId after decoding the token
// ✔ should throw an error if the authorization header is only one string

// 4 passing (7ms)
