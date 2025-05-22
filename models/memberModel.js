const db = require('../database/mariadb');
const crypto = require('crypto'); // crypto 모듈 : 암호화
require('dotenv').config();

// model 은 class로 빼는게 좋을까? 궂이? 라는 생각이 든다. 오히려 오버헤드가 생겨버린다고 본다.
/** 동일한 email을 가진 Member가 있는지 확인. 있을경우 return true, 없으면 false */
async function isExistByEmail(email) {
    const sql = 'SELECT EXISTS (SELECT * FROM members WHERE email = ?) AS exist';

    try {
        const [rows, fields] = await db.execute(sql, email);
        return rows.exist;
    }
    catch (err) {
        console.error(err);
        throw err;

    }


}
/** member를 추가합니다.추가에 필요한 member로 email, name, pwd 를 가진 객체가 필요합니다. */
async function addMember(member) {

    const sql = 'INSERT INTO members (email,name,pwd,salt)  VALUES ( ?,?,?,?)';

    // 비밀번호 암호화 및 salt 생성성
    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPwd = crypto.pbkdf2Sync(member['pwd'], salt, 10000, 10, 'sha512').toString('base64');
    const values = [member['email'], member['name'], hashedPwd, salt];

    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

/** member의 email, pwd가 매치하는지 여부를 확인합니다. email에 대한 pwd가 일치할 경우 true값을 리턴합니다*/
async function isPasswordMatched(email, pwd) {

    const sql = 'SELECT pwd, salt FROM members WHERE email = ?';
    const values = [email];

    try {
        const [rows, fields] = await db.execute(sql, values);
        const hashedPwd = crypto.pbkdf2Sync(pwd, result[0].salt, 10000, 10, 'sha512').toString('base64');
        if (rows[0].pwd == hashedPwd) {
                return(true);
            }
            else {
                return(false)
            }
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}
/** member의 pwd를 변경한다. email과 pwd가 필요함. */
async function resetPassword(email, pwd) {

    const sql = 'UPDATE members SET pwd = ?, salt = ? WHERE email = ?';

    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPwd = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');
    const values = [hashedPwd, salt, email]
    // db.query(sql, [hashedPwd, salt, email], (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         reject(err);
    //     } else {
    //         resolve(true);
    //     }
    // })
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}




module.exports = {
    isExistByEmail,
    addMember,
    isPasswordMatched,
    resetPassword
}