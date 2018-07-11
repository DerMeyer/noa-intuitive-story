const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const { s3upload } = require('./s3');
const { s3Url, iconUrls } = require('./config');
const { MY_SECRET, SMTP_USER, SMTP_PASS } = (process.env.NODE_ENV === 'production' && process.env) || require('./confidential.json');

const { hashPW, checkPW, login, register, getVCode, setVCode, verifyAccount, getAllGroups, getAllUsers, setGroup, setSoul } = require('./db');

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
            const { id, verified, first, last, mail, phone, icon_url } = result.rows[0];
            req.session.user = {
                id,
                verified,
                first,
                last,
                alias: req.body.alias,
                mail,
                phone,
                icon_url
            };
            res.json({
                success: true,
                user: {
                    ...req.session.user
                }
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

const sendMail = (alias, mail, vCode) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.1und1.de',
        port: 587,
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });
    const mailOptions = {
        from: 'theintuitivestory@gmail.com',
        to: mail,
        subject: 'Please confirm your Intuitive Story account.',
        html: `<h2>Hi ${alias}, your confirmation code is:</h2><h1>${vCode}</h1>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Message ID at register:', info.messageId);
        }
    });
}

app.post('/api/register', async (req, res) => {
    try {
        const vCode = Math.floor(1000 + (Math.random() * 9000));
        const hashedPW = await hashPW(req.body.pw);
        const result = await register(
            vCode,
            req.body.first,
            req.body.last,
            req.body.alias,
            req.body.mail,
            req.body.phone,
            hashedPW,
            iconUrls[0]
        );
        req.session.user = result.rows[0];
        sendMail(req.body.alias, req.body.mail, vCode);
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

app.post('/api/new_v_code', async (req, res) => {
    try {
        const vCode = Math.floor(1000 + (Math.random() * 9000));
        const result = await setVCode(vCode, req.body.alias);
        sendMail(req.body.alias, result.rows[0].mail, vCode);
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.post('/api/verify_account', async (req, res) => {
    try {
        const result = await getVCode(req.body.alias);
        if (result.rows[0].v_code == req.body.vCode) {
            const result = await verifyAccount(req.body.alias);
            req.session.user.verified = 1;
            res.json({
                success: true
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

app.post('/api/create_group', async (req, res) => {
    if (!req.session.user || req.session.user.id !== 1) {
        res.end();
    }
    try {
        const result = await setGroup(
            req.body.group.name,
            req.body.group.year,
            req.body.group.story,
            req.body.group.gul_id,
            req.body.group.grun_id,
            req.body.group.vermel_id,
            req.body.group.bezrechu_id,
            req.body.group.sagol_id
        );
        const [ one, two, three, four, five ] = req.body.souls;
        if (one) {
            await setSoul(one.id, result.rows[0].id, one.soul);
        }
        if (two) {
            await setSoul(two.id, result.rows[0].id, two.soul);
        }
        if (three) {
            await setSoul(three.id, result.rows[0].id, three.soul);
        }
        if (four) {
            await setSoul(four.id, result.rows[0].id, four.soul);
        }
        if (five) {
            await setSoul(five.id, result.rows[0].id, five.soul);
        }
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.get('/api/get_users', async (req, res) => {
    try {
        const result = await getAllUsers();
        res.json({
            success: true,
            users: result.rows
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
