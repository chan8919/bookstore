const db = require('../database/mariadb');

// 
async function addOrder(member_id, delivery_id, total_price) {

    const sql = 'INSERT INTO orders (member_id,delivery_id,total_price) VALUES (?,?,?)';
    const values = [member_id, delivery_id, total_price];
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

async function addDelivery(address, receiver, contact) {

    const sql = 'INSERT INTO deliveries (address, receiver, contact) VALUES (?,?,?)';
    const values = [address, receiver, contact];
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
/** orderItemlist : [[order_id,book_id,quantity]] */
async function addOrderItems(orderitemlist) {

    const sql = 'INSERT INTO orderItems (order_id,book_id, quantity) VALUES ?';
    const values = [orderitemlist];
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

async function calculateTotalPriceByIds(cartItemids) {

    const sql = `SELECT SUM(b.price*cart.quantity) AS total_price 
        FROM (SELECT * FROM cartItems WHERE id IN (?)) AS cart 
        JOIN books as b 
        ON cart.book_id = b.id`;
    const values = [cartItemids];
    console.log(values);
    try {
        const [rows, fields] = await db.execute(sql, values);
        return rows[0].total_price;
    }
    catch (err) {
        console.error(err);
        throw err;

    }

}


module.exports = {
    addOrder,
    addDelivery,
    addOrderItems,
    calculateTotalPriceByIds
}