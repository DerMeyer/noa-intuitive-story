const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/intuitivestory');
const bcrypt = require('bcryptjs');

exports.hashPW = pw =>
    new Promise((resolve, reject) =>
        bcrypt.genSalt((err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(pw, salt, (err, hash) => err ? reject(err) : resolve(hash))
        }));

exports.checkPW = (pwUser, pwDB) =>
    new Promise((resolve, reject) => bcrypt.compare(pwUser, pwDB, (err, doesMatch) => err ? reject(err) : resolve(doesMatch)));
