const express = require('express');
const app = express();

const { s3upload } = require('./s3');
const { s3Url, iconUrls } = require('./config');
const { MY_SECRET } = (process.env.NODE_ENV === 'production' && process.env) || require('./confidential.json');

const { hashPW, checkPW, login, register, getAllGroups } = require('./db');

const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 4194304
    }
});

const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: MY_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 1
});
app.use(cookieSessionMiddleware);

const csurf = require('csurf');
app.use(csurf());
app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken());
    next();
});

const compression = require('compression');
app.use(compression());

const bp = require('body-parser');
app.use(bp.json());

const PORT = process.env.PORT || 5000;

app.get('/api/logout', (req, res) => {
    req.session = null;
    res.json({
        success: true
    });
});

app.get('/api/check_login', (req, res) => {
    if (req.session.user) {
        res.json({
            success: true,
            user: { ...req.session.user }
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const result = await login(req.body.alias);
        const correctPW = await checkPW(req.body.pw, result.rows[0].pw);
        if (correctPW) {
            const { id, verified } = result.rows[0];
            req.session.user = {
                id,
                alias: req.body.alias,
                verified
            };
            res.json({
                success: true,
                user: { ...req.session.user }
            });
        } else {
            res.json({
                success: false
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const hashedPW = await hashPW(req.body.pw);
        const result = await register(
            req.body.first,
            req.body.last,
            req.body.alias,
            req.body.mail,
            req.body.phone,
            hashedPW,
            iconUrls[0]
        );
        req.session.user = result.rows[0];
        res.json({
            success: true,
            user: { ...req.session.user }
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.get('/api/groups', async (req, res) => {
    try {
        const result = await getAllGroups();
        res.json({
            success: true,
            groups: result.rows
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.get('/api/hello', (req, res) => res.json({
    success: true,
    message: `Hi, I'm Noa's Server. Node express proxy on port ${PORT}.`
}));

app.use(express.static(`${__dirname}/client/build`));

app.get('*', (req, res) => res.sendFile(`${__dirname}/client/build/index.html`));

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
