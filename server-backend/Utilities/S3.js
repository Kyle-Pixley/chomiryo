const aws = require("aws-sdk");
const crypto = require("crypto");

const region = "us-east-2";
const bucketName = "chomiryo-bucket";
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY_ID;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
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