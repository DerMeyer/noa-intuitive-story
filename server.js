const express = require('express');
const app = express();
const compression = require('compression');
const bp = require('body-parser');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const { s3upload } = require('./s3');
const { s3Url } = require('./config');

const { hashPW, checkPW } = require('./db');

const PORT = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => res.json({
    success: true,
    message: `Hi, I'm Noa's Server. Node express proxy on port ${PORT}.`
}));

app.use(express.static(`${__dirname}/client/build`));

app.get('*', (req, res) => res.sendFile(`${__dirname}/client/build/index.html`));

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
