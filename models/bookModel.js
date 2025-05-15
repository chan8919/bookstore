const db = require('../database/mariadb');

function getBooks(category_id){
    return new Promise((resolve,reject)=>{
        let sql,values;
        console.log(category_id);
        console.log(category_id == undefined);
        if(category_id == undefined){
            sql = 'SELECT b.*,c.name AS category_name FROM books AS b LEFT JOIN categoris As c ON b.category_id = c.id'
            values = [];
        }
        else{
            sql = 'SELECT b.*,c.name AS category_name FROM books AS b LEFT JOIN categoris As c ON b.category_id = c.id WHERE b.category_id = ?'
            values = [category_id];

        }
        console.log(sql);
        db.query(sql,values,(err,result,fields)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

function getBookDetialById(id){
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT b.*,c.name AS category_name FROM books AS b LEFT JOIN categoris As c ON b.category_id = c.id WHERE b.id=?';
        db.query(sql,id,(err,result,fields)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(result[0]);
            }
        })
    })
}
function getAllCategory(){
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM categoris';
        db.query(sql,(err,result,fields)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else{
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