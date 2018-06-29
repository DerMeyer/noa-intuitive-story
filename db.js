const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/intuitivestory');
const bcrypt = require('bcryptjs');

exports.hashPW = pw =>
    new Promise((resolve, reject) =>
        bcrypt.genSalt((err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(
                pw,
                salt,
                (err, hash) => (err ? reject(err) : resolve(hash))
            );
        })
    );


exports.checkPW = (pwUser, pwDB) =>
    new Promise((resolve, reject) =>
        bcrypt.compare(
            pwUser,
            pwDB,
            (err, doesMatch) => (err ? reject(err) : resolve(doesMatch))
        )
    );

exports.login = alias =>
    db.query(
        'SELECT id, verified, pw FROM users WHERE alias = $1', [alias]
    );

exports.register = (first, last, alias, mail, phone, pw, icon_url) =>
    db.query(
        'INSERT INTO users (first, last, alias, mail, phone, pw, icon_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, alias, verified',
        [first, last, alias, mail, phone, pw, icon_url]
    );
