const db = require('../database/mariadb');
const crypto = require('crypto'); // crypto 모듈 : 암호화

// model 은 class로 빼는게 좋을까? 궂이? 라는 생각이 든다. 오히려 오버헤드가 생겨버린다고 본다.
/** 동일한 email을 가진 Member가 있는지 확인. 있을경우 return true, 없으면 false */
function isExistByEmail(email) {
    const sql = 'SELECT EXISTS (SELECT * FROM members WHERE email = ?) AS exist';
    return new Promise((resolve, reject) => {
        db.query(sql, email,
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result[0].exist);

                }
            }
        )
    })

}
/** member를 추가합니다.추가에 필요한 member로 email, name, pwd 를 가진 객체가 필요합니다. */
function addMember(member) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO members (email,name,pwd,salt)  VALUES ( ?,?,?)';

        // 비밀번호 암호화 및 salt 생성성
        const salt = crypto.randomBytes(10).toString('base64');
        const hashedPwd = crypto.pbkdf2Sync(member['pwd'],salt,10000,10,'sha512').toString('base64');

        db.query(sql, [member['email'], member['name'], hashedPwd,salt],
            (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }
        )
    })

}

/** member의 email, pwd가 매치하는지 여부를 확인합니다. email에 대한 pwd가 일치할 경우 1을 리턴합니다*/
function isPasswordMatched(email,pwd){
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT EXISTS ( SELECT 1 FROM members WHERE email = ? AND pwd = ?) AS exist';
        db.query(sql,[email,pwd],(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(result[0].exist);
                resolve(result[0].exist);
            }
        })
    })
}
/** member의 pwd를 변경한다. email과 pwd가 필요함. */
function resetPassword(email,pwd){
    return new Promise((resolve,reject)=>{
        const sql = 'UPDATE members SET pwd = ? WHERE email = ?';
        db.query(sql,[pwd,email],(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(true);
            }
        })
    })
}




module.exports = {
    isExistByEmail,
    addMember,
    isPasswordMatched,
    resetPassword
}