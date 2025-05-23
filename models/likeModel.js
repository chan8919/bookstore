const db = require('../database/mariadb');


async function addLike(conn,memberId, bookId) {

    const sql = 'INSERT INTO likes (member_id,book_id) VALUES (?,?)';
    values = [memberId, bookId];
    console.log(values);
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}
async function deleteLike(conn,memberId, bookId) {

    const sql = 'DELETE FROM likes WHERE member_id=? AND book_id=?';
    values = [parseInt(memberId), parseInt(bookId)];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

async function hasMemberLikedBook(conn,memberId, bookId) {

    const sql = 'SELECT 1 FROM likes WHERE member_id=? AND book_id=?';
    values = [parseInt(memberId), parseInt(bookId)];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows.length;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

async function countLikesForbook(conn,bookId) {

    const sql = 'SELECT COUNT(*) FROM likes WHERE book_id = ?';
    values = [parseInt(bookId)];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

async function getLikesForbook(conn,bookId) {

    const sql = 'SELECT * FROM likes WHERE book_id = ?';
    values = [parseInt(bookId)];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;

    }
}

module.exports = {
    addLike,
    getLikesForbook,
    hasMemberLikedBook,
    countLikesForbook,
    deleteLike
}