const path = require("path");
const fs = require("fs");
const https = require("https");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");

const MulterGoogleCloudStorage = require("multer-google-storage");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

// console.log(process.env.NODE_ENV);

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: new MulterGoogleCloudStorage.storageEngine({
        projectId: "mern-social-network-416113",
        keyFilename: "./mern-social-network-416113-190cc246ad8f.json",
        bucket: "mern-social-network-416113.appspot.com",
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString() + "-" + file.originalname);
        },
    }),
    fileFilter: fileFilter,
});

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   },
// });

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
        flags: "a",
    }
);

app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
app.use(upload.single("image"));
// app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); //allow access to any client
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   ); //allow these methods
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //allow these headers
//   next();
// });
app.use(cors());

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.use(helmet());

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gdjmk4f.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`
    )
    .then((result) => {
        const server = app.listen(process.env.PORT || 8080);
        // https.createServer({ key: privateKey, cert: certificate }, app)
        const io = require("./socket").init(server, {
            cors: {
                origin: "*",
            },
        });
    })
    .catch((err) => {
        console.log(err);
    });

// OpenSSL CMD
// openssl req -nodes -new -x509 -keyout server.key -out server.cert
