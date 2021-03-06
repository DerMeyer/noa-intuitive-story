const spicedPg = require('spiced-pg');
const db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/intuitivestory'
);
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

exports.signin = alias =>
    db.query(
        'SELECT id, verified, first, last, mail, phone, pw, icon_url, created_at FROM users WHERE alias = $1',
        [alias]
    );

exports.signup = (vCode, first, last, alias, mail, phone, pw) =>
    db.query(
        'INSERT INTO users (v_code, first, last, alias, mail, phone, pw) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [vCode, first, last, alias, mail, phone, pw]
    );

exports.getVerificationCode = alias =>
    db.query('SELECT v_code FROM users WHERE alias = $1', [alias]);

exports.setVerificationCode = (vCode, alias) =>
    db.query('UPDATE users SET v_code = $1 WHERE alias = $2 RETURNING mail', [
        vCode,
        alias
    ]);

exports.verifyAccount = alias =>
    db.query('UPDATE users SET verified = 1 WHERE alias = $1', [alias]);

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
    };
};

exports.updatePW = (alias, newPW) =>
    db.query('UPDATE users SET pw = $1 WHERE alias = $2', [newPW, alias]);

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

exports.getGroups = () => db.query('SELECT * FROM groups');

exports.getHistory = () => db.query('SELECT * FROM history_entries');

exports.createHistory = (user_id, name, time_period, place, link, comment) =>
    db.query(
        'INSERT INTO history_entries (user_id, name, time_period, place, link, comment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [user_id, name, time_period, place, link, comment]
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
    gul_text,
    grun_text,
    vermel_text,
    bezrechu_text,
    sagol_text,
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
            gul_text,
            grun_text,
            vermel_text,
            bezrechu_text,
            sagol_text,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`,
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
            gul_text,
            grun_text,
            vermel_text,
            bezrechu_text,
            sagol_text,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character
        ]
    );

exports.updateGroup = (
    id,
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
    gul_text,
    grun_text,
    vermel_text,
    bezrechu_text,
    sagol_text,
    gul_character,
    grun_character,
    vermel_character,
    bezrechu_character,
    sagol_character
) =>
    db.query(
        `UPDATE groups SET
            name = $1,
            time_period = $2,
            story = $3,
            gul_user_id = $4,
            grun_user_id = $5,
            vermel_user_id = $6,
            bezrechu_user_id = $7,
            sagol_user_id = $8,
            gul_role = $9,
            grun_role = $10,
            vermel_role = $11,
            bezrechu_role = $12,
            sagol_role = $13,
            gul_text = $14,
            grun_text = $15,
            vermel_text = $16,
            bezrechu_text = $17,
            sagol_text = $18,
            gul_character = $19,
            grun_character = $20,
            vermel_character = $21,
            bezrechu_character = $22,
            sagol_character = $23
        WHERE id = $24`,
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
            gul_text,
            grun_text,
            vermel_text,
            bezrechu_text,
            sagol_text,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character,
            id
        ]
    );

exports.getUser = userId =>
    db.query(
        'SELECT id, verified, first, last, alias, mail, phone, created_at FROM users WHERE id = $1', [ userId ]
    );

exports.getUsers = () =>
    db.query(
        'SELECT id, verified, first, last, alias, mail, phone, created_at FROM users'
    );

exports.getPages = () =>
    db.query(
        'SELECT id, page_path::json, page_content::json FROM pages'
    );

exports.getMenu = () =>
    db.query(
        'SELECT menu::json FROM menu'
    );

exports.savePage = async (path, pageContent) => {
    const pageExists =  await db.query(
        'SELECT id FROM pages WHERE page_path = $1', [ JSON.stringify(path) ]
    );
    if (pageExists.rows[0]) {
        return db.query(
            'UPDATE pages SET page_content = $1 WHERE id = $2',
            [ JSON.stringify(pageContent), pageExists.rows[0].id ]
        );
    }
    return db.query(
        'INSERT INTO pages (page_path, page_content) VALUES ($1, $2)',
        [ JSON.stringify(path), JSON.stringify(pageContent) ]
    );
};
