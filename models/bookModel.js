const db = require('../database/mariadb');

function getBooks({ category_id, news ,limit, page}) {
    return new Promise((resolve, reject) => {
        let sql, values;
        console.log(category_id);
        console.log(category_id == undefined);
        
        sql = `SELECT b.*,c.name AS category_name FROM books AS b 
            LEFT JOIN categoris As c ON b.category_id = c.id`;
        values = [];

        if (category_id && news) {
            sql += ' WHERE b.category_id = ? AND b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
            values.push(category_id);
        }
        else if (category_id) {
            sql = sql + ' WHERE b.category_id = ? ';
            values.push(category_id);
        } else if (news) {
            sql += ' WHERE b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
        }

        //페이징 추가

        if(limit){
            sql += ' LIMIT ? OFFSET ?';
            let offset = 0;
            if(page){
                offset = limit*(page -1);
            }
            values.push(parseInt(limit),offset);
        }

        console.log(sql);
        db.query(sql, values, (err, result, fields) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log(result);
                resolve(result);
            }
        })
    })
}

function getBookDetialById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT b.*,c.name AS category_name FROM books AS b LEFT JOIN categoris As c ON b.category_id = c.id WHERE b.id=?';
        db.query(sql, id, (err, result, fields) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(result[0]);
            }
        })
    })
}
function getAllCategory() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM categoris';
        db.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

}
module.exports = {
    getBooks,
    getBookDetialById,
    getAllCategory
}