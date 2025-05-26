const db = require('../database/mariadb');

async function getBooks(conn,{ category_id, news, limit, page }) {
    // return new Promise((resolve, reject) => {
    let sql, values;
    console.log("--model-getBook 호출");
    const likeCountQuery = '(SELECT COUNT(*) FROM likes WHERE likes.book_id = b.id)';
    sql = `SELECT b.*,c.name AS category_name, ${likeCountQuery} AS likes FROM books AS b 
            LEFT JOIN categoris As c ON b.category_id = c.id`;

    values = [];

    //옵션에 따른 SQL 조정
    console.log("sss : " + (category_id && news));
    if (category_id && news) {
        sql += ' WHERE b.category_id = ? AND b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
        console.log('1 : ' + sql);
        values.push(category_id);
    }
    else if (category_id) {
        sql = sql + ' WHERE b.category_id = ? ';
        console.log('2 : ' + sql);
        values.push(category_id);
    } else if (news) {
        console.log("not here");
        sql += ' WHERE b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
        console.log('3 : ' + sql);
    }

    //페이징 추가
    if (limit) {
        sql += ' LIMIT ? OFFSET ?';
        let offset = 0;
        if (page) {
            offset = limit * (page - 1);
        }
        values.push(parseInt(limit), offset);
    }
    console.log(sql);
    try {
        const [rows, fields] = await conn.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

    // db.query(sql, values, (err, result, fields) => {
    //     if (err) {
    //         console.log(err);
    //         reject(err);
    //     }
    //     else {
    //         resolve(result);
    //     }
    // })
    //})
}

async function getBookDetialById(conn,id) {

    const likeCountQuery = '(SELECT COUNT(*) FROM likes WHERE likes.book_id = b.id)';
    const sql = `SELECT b.*,c.name AS category_name, ${likeCountQuery} AS likes FROM books AS b LEFT JOIN categoris As c ON b.category_id = c.id WHERE b.id=?`;
    const values = [id];
    try {
        const [rows, fields] = await conn.execute(sql, values);
        return rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}
async function getAllCategory(conn) {

        const sql = 'SELECT * FROM categoris';
        try {
            const [rows,fields] = await conn.execute(sql);
            return rows;
        }
        catch(err){
            console.error(err);
            throw err;

        }


}
module.exports = {
    getBooks,
    getBookDetialById,
    getAllCategory
}