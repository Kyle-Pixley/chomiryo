require('dotenv').config();

const aws = require("aws-sdk");
const crypto = require("crypto");

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY_ID = process.env.AWS_SECRET_ACCESS_KEY_ID;

const s3 = new aws.S3({
    region,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY_ID,
    signatureVersion: "v4",
});

const generateURL = async () => {
    const rawBytes = await crypto.randomBytes(16);
    const imgName = rawBytes.toString("hex");

    const params = {
        Bucket: bucketName,
        Key: imgName,
        Expires: 15,
    }

    return await s3.getSignedUrlPromise("putObject", params);
}

module.exports = generateURL;