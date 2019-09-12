const express = require('express');
const app = express();

const { s3upload } = require('./s3');
const { s3Url, iconUrls } = require('./config');
const { MY_SECRET, SMTP_USER, SMTP_PASS } =
    (process.env.NODE_ENV === 'production' && process.env) ||
    require('./confidential.json');

const {
    hashPW,
    checkPW,
    signin,
    signup,
    getVerificationCode,
    setVerificationCode,
    verifyAccount,
    newPW,
    updatePW,
    updateProfile,
    updateProfileImage,
    getGroups,
    getHistory,
    createHistory,
    createGroup,
    updateGroup,
    getUser,
    getUsers,
    getPages,
    getMenu,
    savePage
} = require('./db');

const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `${__dirname}/uploads`);
    },
    filename: function(req, file, callback) {
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
    maxAge: 1000 * 60 * 60 * 24 * 14
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

const nodemailer = require('nodemailer');
const sendMail = (alias, mail, verificationCode, pw, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.1und1.de',
        port: 587,
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });
    const mailOptions = {};
    if (verificationCode) {
        mailOptions.from = 'theintuitivestory@gmail.com';
        mailOptions.to = mail;
        mailOptions.subject = 'Please confirm your Intuitive Story account.';
        mailOptions.html = `<h2>Hi ${alias}, your confirmation code is:</h2><h1>${verificationCode}</h1>`;
    } else if (pw) {
        mailOptions.from = 'theintuitivestory@gmail.com';
        mailOptions.to = mail;
        mailOptions.subject = `New password for ${alias}.`;
        mailOptions.html = `<h2>Hi ${alias}, your new password is:</h2><h1>${pw}</h1>`;
    } else if (subject && text) {
        mailOptions.from = mail;
        mailOptions.to = 'theintuitivestory@gmail.com';
        mailOptions.subject = subject;
        mailOptions.html = `<p style="white-space: pre-line;">${text}</p>`;
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Message ID at register:', info.messageId);
        }
    });
};

const PORT = process.env.PORT || 5000;

app.post('/api/send_contact_form', (req, res) => {
    sendMail(null, req.body.mail, null, null, req.body.subject, req.body.text);
    res.json({
        success: true
    });
});

app.get('/api/check_cookies', (req, res) => {
    res.json({
        success: true,
        cookies: req.session.cookies
    });
});

app.get('/api/accept_cookies', (req, res) => {
    req.session.cookies = true;
    res.json({
        success: true
    });
});

app.get('/api/check_signin', (req, res) => {
    if (req.session.user) {
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
});

app.get('/api/signout', (req, res) => {
    req.session.user = null;
    res.json({
        success: true
    });
});

app.post('/api/signin', async (req, res) => {
    try {
        const result = await signin(req.body.alias);
        const correctPW = await checkPW(req.body.pw, result.rows[0].pw);
        if (correctPW) {
            const {
                id,
                verified,
                first,
                last,
                mail,
                phone,
                icon_url,
                created_at
            } = result.rows[0];
            req.session.user = {
                id,
                verified,
                first,
                last,
                alias: req.body.alias,
                mail,
                phone,
                icon_url,
                created_at
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

app.post('/api/signup', async (req, res) => {
    try {
        const verificationCode = Math.floor(1000 + Math.random() * 9000);
        const hashedPW = await hashPW(req.body.pw);
        const result = await signup(
            verificationCode,
            req.body.first,
            req.body.last,
            req.body.alias,
            req.body.mail,
            req.body.phone,
            hashedPW
        );

        sendMail(req.body.alias, req.body.mail, verificationCode);
        const {
            id,
            verified,
            first,
            last,
            alias,
            mail,
            phone,
            icon_url,
            created_at
        } = result.rows[0];
        req.session.user = {
            id,
            verified,
            first,
            last,
            alias,
            mail,
            phone,
            icon_url,
            created_at
        };
        res.json({
            success: true,
            user: {
                ...req.session.user
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.post('/api/new_verification_code', async (req, res) => {
    try {
        const verificationCode = Math.floor(1000 + Math.random() * 9000);
        const result = await setVerificationCode(
            verificationCode,
            req.body.alias
        );

        sendMail(req.body.alias, result.rows[0].mail, verificationCode);
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
        const result = await getVerificationCode(req.body.alias);
        if (result.rows[0].v_code == req.body.verificationCode) {
            await verifyAccount(req.body.alias);
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

app.post('/api/get_new_pw', async (req, res) => {
    try {
        const result = await newPW(req.body.alias);
        if (result.newPW) {
            sendMail(req.body.alias, result.mail, null, result.newPW);
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

app.post('/api/update_profile', async (req, res) => {
    try {
        if (req.body.newPW) {
            const hashedPW = await hashPW(req.body.newPW);
            await updatePW(req.body.alias, hashedPW);
        }
        const result = await updateProfile(
            req.body.id,
            req.body.first,
            req.body.last,
            req.body.alias,
            req.body.mail,
            req.body.phone
        );
        const {
            id,
            verified,
            first,
            last,
            alias,
            mail,
            phone,
            icon_url,
            created_at
        } = result.rows[0];
        req.session.user = {
            id,
            verified,
            first,
            last,
            alias,
            mail,
            phone,
            icon_url,
            created_at
        };
        res.json({
            success: true,
            user: {
                ...req.session.user
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.post(
    '/api/upload_image',
    uploader.single('file'),
    s3upload,
    async (req, res) => {
        if (req.file) {
            try {
                const url = `${s3Url}${req.file.filename}`;
                const result = await updateProfileImage(req.body.user_id, url);
                req.session.user.icon_url = result.rows[0].icon_url;
                res.json({
                    success: true,
                    icon_url: req.session.user.icon_url
                });
            } catch (err) {
                console.log(err);
                res.json({
                    success: false
                });
            }
        } else {
            res.json({
                success: false,
                fileTooLarge: true
            });
        }
    }
);

app.get('/api/get_groups', async (req, res) => {
    try {
        const result = await getGroups();
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

app.get('/api/get_history', async (req, res) => {
    try {
        const result = await getHistory();
        res.json({
            success: true,
            history: result.rows
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.post('/api/create_history', async (req, res) => {
    if (!req.session.user) {
        res.end();
    }
    try {
        const result = await createHistory(
            req.body.user_id,
            req.body.name,
            req.body.time_period,
            req.body.place,
            req.body.link,
            req.body.comment
        );
        res.json({
            success: true,
            historyEntry: result.rows[0]
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
        await createGroup(
            req.body.name,
            req.body.time_period,
            req.body.story,
            req.body.gul_id,
            req.body.grun_id,
            req.body.vermel_id,
            req.body.bezrechu_id,
            req.body.sagol_id,
            req.body.gul_role,
            req.body.grun_role,
            req.body.vermel_role,
            req.body.bezrechu_role,
            req.body.sagol_role,
            req.body.gul_character,
            req.body.grun_character,
            req.body.vermel_character,
            req.body.bezrechu_character,
            req.body.sagol_character
        );
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

app.post('/api/update_group', async (req, res) => {
    if (!req.session.user || req.session.user.id !== 1) {
        res.end();
    }
    try {
        await updateGroup(
            req.body.id,
            req.body.name,
            req.body.time_period,
            req.body.story,
            req.body.gul_id,
            req.body.grun_id,
            req.body.vermel_id,
            req.body.bezrechu_id,
            req.body.sagol_id,
            req.body.gul_role,
            req.body.grun_role,
            req.body.vermel_role,
            req.body.bezrechu_role,
            req.body.sagol_role,
            req.body.gul_character,
            req.body.grun_character,
            req.body.vermel_character,
            req.body.bezrechu_character,
            req.body.sagol_character
        );
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

app.post('/api/get_user', async (req, res) => {
    try {
        const result = await getUser(req.body.userId);
        await res.json({
            success: true,
            user: result.rows
        });
    } catch (err) {
        console.log(err);
        await res.json({
            success: false
        });
    }
});

app.get('/api/get_users', async (req, res) => {
    if (!req.session.user || req.session.user.id !== 1) {
        res.json({
            success: false
        });
        return;
    }
    try {
        const result = await getUsers();
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

app.get('/api/get_pages', async (req, res) => {
    // if (!req.session.user || req.session.user.id !== 1) {
    //     res.json({
    //         success: false
    //     });
    //     return;
    // }
    try {
        const result = await getPages();
        res.json({
            success: true,
            pages: result.rows
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.get('/api/get_menu', async (req, res) => {
    // if (!req.session.user || req.session.user.id !== 1) {
    //     res.json({
    //         success: false
    //     });
    //     return;
    // }
    try {
        const result = await getMenu();
        res.json({
            success: true,
            menu: result.rows[0].menu
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.post('/api/save_page', async (req, res) => {
    const { path, pageContent } = req.body;
    try {
        const result = await savePage(path, pageContent);
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

app.use(express.static(`${__dirname}/client/build`));

app.get('*', (req, res) =>
    res.sendFile(`${__dirname}/client/build/index.html`)
);

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
