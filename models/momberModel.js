const db = require('../database/mariadb');

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
        const sql = 'INSERT INTO members (email,name,pwd)  VALUES ( ?,?,?)';
        db.query(sql, [member['email'], member['name'], member['pwd']],
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




module.exports = {
    isExistByEmail,
    addMember,
    isPasswordMatched
}