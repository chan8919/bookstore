const db = require('../database/mariadb');


function addLike(memberId,bookId) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO likes (member_id,book_id) VALUES (?,?)';
        value = [memberId,bookId];
        console.log(value);
        db.query(sql, value, (err, result, fields) => {
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
function deleteLike(memberId,bookId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM likes WHERE member_id=? AND book_id=?';
        value = [parseInt(memberId),parseInt(bookId)];
        db.query(sql, value, (err, result, fields) => {
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

function hasMemberLikedBook(memberId,bookId){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM likes WHERE member_id=? AND book_id=?';
        value = [parseInt(memberId),parseInt(bookId)];
        db.query(sql, value, (err, result, fields) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(result.length);
            }
        })
    })
}

function countLikesForbook(bookId){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) FROM likes WHERE book_id = ?';
        value = [parseInt(bookId)];
        db.query(sql, value, (err, result, fields) => {
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

function getLikesForbook(bookId){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM likes WHERE book_id = ?';
        value = [parseInt(bookId)];
        db.query(sql, value, (err, result, fields) => {
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

module.exports = {
    addLike,
    getLikesForbook,
    hasMemberLikedBook,
    countLikesForbook,
    deleteLike
}