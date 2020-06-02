import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY
});

let s3 = new AWS.S3();

export const getS3Url = async (key: string, expiration: number) => {
    return await s3.getSignedUrlPromise("getObject", {
        Bucket: "lkphotography",
        Key: key,
        Expires: expiration
    });
};
