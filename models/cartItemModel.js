const db = require('../database/mariadb');

/**카트에 해당 유저가 해당 물품을 담은 항목이 있는지 확인. return true | false */ 
function hasCartItem(memberId,bookId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT 1 FROM cartItems WHERE member_id = ? AND book_id = ?';
        const value = [memberId,bookId];
        db.query(sql, value, (err, result, fields) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if(result[0]){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
                
            }
        })
    })
}

function hasCartItemById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT 1 FROM cartItems WHERE id = ?';
        const value = [id];
        db.query(sql, value, (err, result, fields) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if(result[0]){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
                
            }
        })
    })
}

// 카트 아이템 추가
function addCartItems(memberId,bookId,amount) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO cartItems (member_id,book_id,amount) VALUES (?,?,?)';
        const value = [memberId,bookId,amount];
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

// 카트 아이템 수정

function UpdateAmountOfCartItemById(id,amount){
    return new Promise((resolve,reject)=>{
        const sql = 'UPDATE cartItems SET amount = ? WHERE id = ?'
        const value = [amount,id];
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
//카트아이템 가져오기기
function getCartItem(memberId,bookId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM cartItems WHERE member_id = ? AND book_id = ?';
        const value = [memberId,bookId];
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

function getCartItemsByIds(idList) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT cart.id AS cart_id,b.id As book_id ,b.title,b.summary,b.price,cart.amount ,c.name as category_name
        FROM (SELECT * FROM cartItems where id IN (?)) As cart 
        LEFT JOIN books As b 
        ON cart.book_id = b.id
        LEFT JOIN categoris As c
        ON b.category_id = c.id
        `;
        const value = [idList];
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


// 카트 아이템 목록 가져오기

function getCartItemsByMemberId(memberId){
    return new Promise((resolve, reject) => {
        const sql = `SELECT cart.id AS cart_id,b.id As book_id ,b.title,b.summary,b.price,cart.amount ,c.name as category_name
        FROM cartItems As cart 
        LEFT JOIN books As b 
        ON cart.member_id = ? AND cart.book_id = b.id
        LEFT JOIN categoris As c
        ON b.category_id = c.id
        `;
        const value = [memberId];
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


//카트 아이템 제거하기

function deleteCartItem(memberId,bookId){
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM cartItems where member_Id = ? AND book_id = ?';
        const value = [memberId,bookId];
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

function deleteCartItemById(id){
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM cartItems where Id = ? ';
        const value = [id];
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



module.exports = {
    hasCartItem,
    addCartItems,
    UpdateAmountOfCartItemById,
    getCartItem,
    getCartItemsByIds,
    getCartItemsByMemberId,
    deleteCartItem,
    hasCartItemById,
    deleteCartItemById
}