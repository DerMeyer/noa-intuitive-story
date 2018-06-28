const fs = require('fs');
const knox = require('knox');

let secrets;
console.log(process.env.NODE_ENV);
try {
    secrets = require('./confidential');
} catch (err) {
    console.log(err);
    secrets = process.env;
}
const { AWS_KEY, AWS_SECRET } = secrets;

const client = knox.createClient({
    key: AWS_KEY,
    secret: AWS_SECRET,
    bucket: 'basebookfoundation'
});

exports.s3upload = (req, res, next) => {
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size,
        "x-amz-acl": "public-read"
    });
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);
    s3Request.on('response', s3Response => s3Response.statusCode === 200 ? next() : res.sendStatus(500));
};
