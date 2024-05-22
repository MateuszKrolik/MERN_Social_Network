// util/gcp.js
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const os = require("os");
const { Storage } = require("@google-cloud/storage");

let serviceAccountKey;
let storage;

if (process.env.GCP_CREDENTIALS) {
    try {
        serviceAccountKey = JSON.parse(process.env.GCP_CREDENTIALS);
        storage = new Storage({ credentials: serviceAccountKey });
    } catch (error) {
        console.error(
            "GCP_CREDENTIALS environment variable is not a valid JSON string"
        );
        process.exit(1);
    }
} else {
    console.error("GCP_CREDENTIALS environment variable is not set");
    process.exit(1);
}

const keyFilePath = path.join(os.tmpdir(), "gcp_key.json");
fs.writeFileSync(keyFilePath, JSON.stringify(serviceAccountKey));

module.exports = { serviceAccountKey, storage, keyFilePath };
