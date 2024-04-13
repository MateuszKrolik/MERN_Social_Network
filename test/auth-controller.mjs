import { config } from "dotenv";
config();

const { expect } = await import("chai");
import sinon from "sinon";
import mongoose from "mongoose";

import User from "../models/user.js";
import AuthController from "../controllers/auth.js";

describe("Auth Controller", () => {
    before(() => {
        return mongoose
            .connect(
                `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gdjmk4f.mongodb.net/${process.env.MONGO_DEFAULT_TEST_DATABASE}`
            )
            .then((result) => {
                const user = new User({
                    email: "test1@test.com",
                    password: "tester",
                    name: "Test",
                    posts: [],
                    _id: "5c0f66b979af55031b34728a",
                });
                return user.save();
            })
            .catch((error) => {
                console.error("Error connecting to MongoDB:", error);
            });
    });

    it("should throw an error with code 500 if accessing the database fails", () => {
        sinon.stub(User, "findOne");
        User.findOne.throws();

        const req = {
            body: {
                email: "test@test.com",
                password: "password",
            },
        };

        return AuthController.login(req, {}, () => {})
            .then((result) => {
                expect(result).to.be.an("error");
                expect(result).to.have.property("statusCode", 500);
            })
            .finally(() => {
                User.findOne.restore();
            });
    });

    it("should send a response with a valid user status for an existing user", () => {
        const req = { userId: "5c0f66b979af55031b34728a" };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            },
        };
        return AuthController.getStatus(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal("I am new!");
        });
    });

    after(() => {
        return User.deleteMany({}).then(() => {
            return mongoose.disconnect();
        });
    });
});

//npm test:
// Auth Controller
// ✔ should throw an error with code 500 if accessing the database fails
// ✔ should send a response with a valid user status for an existing user (40ms)
