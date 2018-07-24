const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/intuitivestory');
const bcrypt = require('bcryptjs');

const hashPW = pw =>
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

exports.hashPW = hashPW;

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
        'SELECT id, verified, first, last, mail, phone, pw, icon_url, created_at FROM users WHERE alias = $1', [alias]
    );

exports.register = (vCode, first, last, alias, mail, phone, pw) =>
    db.query(
        'INSERT INTO users (v_code, first, last, alias, mail, phone, pw) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [vCode, first, last, alias, mail, phone, pw]
    );

exports.getVCode = alias =>
    db.query(
        'SELECT v_code FROM users WHERE alias = $1', [alias]
    );

exports.setVCode = (vCode, alias) =>
    db.query(
        'UPDATE users SET v_code = $1 WHERE alias = $2 RETURNING mail', [vCode, alias]
    );

exports.verifyAccount = alias =>
    db.query(
        'UPDATE users SET verified = 1 WHERE alias = $1', [alias]
    );

exports.newPW = async alias => {
    const chars = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    let newPassword = '';
    for (let i = 0; i < 8; i++) {
        newPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    const newHash = await hashPW(newPassword);
    const result = await db.query(
        'UPDATE users SET pw = $1 WHERE alias = $2 RETURNING mail',
        [newHash, alias]
    );
    return {
        newPW: newPassword,
        mail: result.rows[0].mail
    }
}

exports.updatePW = (alias, newPW) =>
    db.query(
        'UPDATE users SET pw = $1 WHERE alias = $2',
        [newPW, alias]
    );

exports.updateProfile = (id, first, last, alias, mail, phone) =>
    db.query(
        'UPDATE users SET first = $1, last = $2, alias = $3, mail = $4, phone = $5 WHERE id = $6 RETURNING *',
        [first, last, alias, mail, phone, id]
    );

exports.updateProfileImage = (id, url) =>
    db.query(
        'UPDATE users SET icon_url = $1 WHERE id = $2 RETURNING icon_url',
        [url, id]
    );

exports.getAllGroups = () =>
    db.query(
        'SELECT * FROM groups'
    );

exports.getHistory = () =>
    db.query(
        'SELECT * FROM history_entries'
    );

exports.getAllUsers = () =>
    db.query(
        'SELECT id, verified, alias FROM users'
    );

exports.createGroup = (
    name,
    time_period,
    story,
    gul_id,
    grun_id,
    vermel_id,
    bezrechu_id,
    sagol_id,
    gul_role,
    grun_role,
    vermel_role,
    bezrechu_role,
    sagol_role,
    gul_character,
    grun_character,
    vermel_character,
    bezrechu_character,
    sagol_character
) =>
    db.query(
        `INSERT INTO groups (
            name,
            time_period,
            story,
            gul_user_id,
            grun_user_id,
            vermel_user_id,
            bezrechu_user_id,
            sagol_user_id,
            gul_role,
            grun_role,
            vermel_role,
            bezrechu_role,
            sagol_role,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [
            name,
            time_period,
            story,
            gul_id,
            grun_id,
            vermel_id,
            bezrechu_id,
            sagol_id,
            gul_role,
            grun_role,
            vermel_role,
            bezrechu_role,
            sagol_role,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character
        ]
    );

exports.createHistory = (user_id, name, time_period, place, link, comment) =>
    db.query(
        'INSERT INTO history_entries (user_id, name, time_period, place, link, comment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [user_id, name, time_period, place, link, comment]
    );
