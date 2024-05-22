const { expect } = await import("chai");
import sinon from "sinon";
import mongoose from "mongoose";
// import io from "../socket.js";

import User from "../models/user.js";
import FeedController from "../controllers/feed.js";

describe("Feed Controller", () => {
    before((done) => {
        mongoose
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
            .then(() => {
                done();
            });
    });
    it("should add a created post to the posts of creator", function (done) {
        const req = {
            body: {
                title: "Test Post",
                content: "A Test Post",
            },
            file: {
                path: "abc",
            },
            userId: "5c0f66b979af55031b34728a",
        };
        const res = {
            status: function () {
                return this;
            },
            json: () => {},
        };
        // const mockSocket = { emit: sinon.stub() };
        // sinon.stub(io, "getIO").callsFake(() => mockSocket);
        FeedController.createPost(req, res, () => {}).then((savedUser) => {
            expect(savedUser).to.have.property("posts");
            expect(savedUser.posts).to.have.length(1);
            // io.getIO.restore();
            done();
        });
    });

    after((done) => {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
});

//npm test:
// Feed Controller
// ✔ should add a created post to the posts of creator (117ms)

// 6 passing (2s)
