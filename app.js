const express = require('express');
const app = express();
const dotenv = require('dotenv');
const memberRouter = require('./route/members');
const bookRouter = require('./route/books');
const cartItemRouter = require('./route/cartitems');
const likeRouter = require('./route/likes');
const orderRouter = require('./route/orders');
dotenv.config();
app.use(express.json());
// 프론트엔드 서버에서 접근하기 위한 설정정
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));


app.listen(process.env.PORT);




app.use("/members",memberRouter);
app.use("/books",bookRouter);
app.use("/cartitems",cartItemRouter);
app.use("/likes",likeRouter);
app.use("/orders",orderRouter);
