const db = require('../database/mariadb');

/**카트에 해당 유저가 해당 물품을 담은 항목이 있는지 확인. return true | false */
async function hasCartItem(memberId, bookId) {

    const sql = 'SELECT 1 FROM cartItems WHERE member_id = ? AND book_id = ?';
    const values = [memberId, bookId];
    // db.query(sql, value, (err, result, fields) => {
    //     if (err) {
    //         console.log(err);
    //         reject(err);
    //     }
    //     else {
    //         if(result[0]){
    //             resolve(true);
    //         }
    //         else{
    //             resolve(false);
    //         }

    //     }
    // })
    try {
        const [rows, fields] = await db.execute(sql, values);
        if (rows[0]) {
            return true;
        }
        else return false;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

async function hasCartItemById(id) {

    const sql = 'SELECT 1 FROM cartItems WHERE id = ?';
    const values = [id];

    try {
        const [rows, fields] = await db.execute(sql, values);
        if (rows[0]) {
            return true;
        }
        else return false;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

// 카트 아이템 추가
async function addCartItems(memberId, bookId, quantity) {

    const sql = 'INSERT INTO cartItems (member_id,book_id,quantity) VALUES (?,?,?)';
    const values = [memberId, bookId, quantity];
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

// 카트 아이템 수정

async function UpdateQuantityOfCartItemById(id, quantity) {

    const sql = 'UPDATE cartItems SET quantity = ? WHERE id = ?'
    const values = [quantity, id];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}
//카트아이템 가져오기기
async function getCartItem(memberId, bookId) {

    const sql = 'SELECT * FROM cartItems WHERE member_id = ? AND book_id = ?';
    const values = [memberId, bookId];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows[0];
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

async function getCartItemsByIds(idList) {

    const sql = `SELECT cart.id AS cart_id,b.id As book_id ,b.title,b.summary,b.price,cart.quantity ,c.name as category_name
        FROM (SELECT * FROM cartItems where id IN (?)) As cart 
        LEFT JOIN books As b 
        ON cart.book_id = b.id
        LEFT JOIN categoris As c
        ON b.category_id = c.id
        `;
    const values = [idList];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}


// 카트 아이템 목록 가져오기

async function getCartItemsByMemberId(memberId) {

    const sql = `SELECT cart.id AS cart_id,b.id As book_id ,b.title,b.summary,b.price,cart.quantity ,c.name as category_name
        FROM cartItems As cart 
        LEFT JOIN books As b 
        ON cart.member_id = ? AND cart.book_id = b.id
        LEFT JOIN categoris As c
        ON b.category_id = c.id
        `;
    const values = [memberId];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}


//카트 아이템 제거하기

async function deleteCartItem(memberId, bookId) {

    const sql = 'DELETE FROM cartItems where member_Id = ? AND book_id = ?';
    const values = [memberId, bookId];
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}

async function deleteCartItemById(id) {

    const sql = 'DELETE FROM cartItems where Id = ? ';
    const values = [id];
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
    hasCartItem,
    addCartItems,
    UpdateQuantityOfCartItemById,
    getCartItem,
    getCartItemsByIds,
    getCartItemsByMemberId,
    deleteCartItem,
    hasCartItemById,
    deleteCartItemById
}