const db = require('../database/mariadb');
const stringUtil = require('../utiles/stringUtils');

async function getBooks(conn, { categoryId, news, limit, page }) {
    console.log("--model-getBook 호출");
    let sql;
    let values = [];

    const likeCountQuery = ', (SELECT COUNT(*) FROM likes WHERE likes.book_id = b.id) AS likes';

    sql = `SELECT b.*,c.name AS category_name${likeCountQuery} FROM books AS b 
            LEFT JOIN categoris As c ON b.category_id = c.id`;

    //옵션에 따른 SQL 조정
    if (category_id && news) {
        sql += ' WHERE b.category_id = ? AND b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
        values.push(categoryId);
    }
    else if (categoryId) {
        sql = sql + ' WHERE b.category_id = ? ';
        values.push(categoryId);
    } else if (news) {
        sql += ' WHERE b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
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
    try {
        const [rows, fields] = await conn.execute(sql, values);
        return stringUtil.keySnakeToCamel(rows);
    }
    catch (err) {
        throw err;

    }
}

async function getBookDetialById(conn, id, memberId) {
    let values = [];
    const likeCountQuery = ',(SELECT COUNT(*) FROM likes WHERE likes.book_id = b.id) AS likes';
    let memberLikedQuery = '';

    if (memberId) {
        memberLikedQuery = ', EXISTS (SELECT 1 FROM likes WHERE member_id = ? AND book_id = b.id) AS liked';
    }
    const sql =
        `SELECT b.*,c.name AS category_name
    ${likeCountQuery}
    ${memberLikedQuery}
     FROM books AS b 
     LEFT JOIN categoris As c ON b.category_id = c.id 
     WHERE b.id=?`;
    values.push(id);
    try {
        const [rows, fields] = await conn.execute(sql, values);
        return stringUtil.keySnakeToCamel(rows[0]);
    }
    catch (err) {
        throw err;
    }

}
async function getAllCategory(conn) {

    const sql = 'SELECT * FROM categoris';
    try {
        const [rows, fields] = await conn.execute(sql);
        return stringUtil.keySnakeToCamel(rows);
    }
    catch (err) {
        throw err;
    }
}
async function totalBooksCount(conn, categoryId, news) {
    console.log("--model-totalBooksCount 호출");
    let sql = 'SELECT COUNT(*) As count FROM books AS b';
    let values = [];

    if (categoryId && news) {
        sql += ' WHERE b.category_id = ? AND b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
        values.push(category_id);
    }
    else if (categoryId) {
        sql = sql + ' WHERE b.category_id = ? ';

        values.push(categoryId);
    } else if (news) {
        sql += ' WHERE b.pub_date BETWEEN DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) AND DATE(NOW())';
    }
    try {
        const [rows, fields] = await conn.execute(sql, values);
        return rows[0].count;
    }
    catch (err) {
        throw err;
    }
}



module.exports = {
    getBooks,
    getBookDetialById,
    getAllCategory,
    totalBooksCount
}