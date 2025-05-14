
const memberModel = require('../models/momberModel');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // crypto 모듈 : 암호화


const join = async (req, res) => {
    const { email, name, pwd } = req.body;
    console.log('join 호출됬음');
    // 회원가입
    try {
        // email을 통해 이미 존재하는 유저인지 확인
        const exist = await memberModel.isExistByEmail(email);
        if (exist) {
            res.status(StatusCodes.BAD_REQUEST).json({ "err": "이미 존재하는 email 입니다." });
            return;
        };  // status 200 으로 보내는게 맞을까? 4xx 대로 보내야하나? 고민해보자
        // 회원 등록
        await memberModel.addMember({ 'email': email, 'name': name, 'pwd': pwd });
        res.status(StatusCodes.CREATED).json({ 'message': '성공적으로 member를 추가했습니다.' });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({'message': '오류또났다..'});
    }
}

const login = async (req, res) => {
    const { email,pwd } = req.body;
    console.log('login 호출됬음');
    try {
        const isMatched = await memberModel.isPasswordMatched(email,pwd);
        console.log(isMatched);
        if(isMatched){
            const token = jwt.sign({email:email},process.env.JWT_PRIVATE_KET,{expiresIn:'15m',issuer:"sori"});
            res.cookie("jwt",token,{httpOnly:true});
            res.status(StatusCodes.CREATED).json({"massage":"인증 성공 및 JWT 발급 완료."});
            return;
        
        }else{
            res.status(StatusCodes.UNAUTHORIZED).json({"message":"email과 pwd가 일치하지 않습니다."})
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({"message":"이유는 모르겠는데 실패함"});
    }
}
const passwordResetRequest = async (req, res) => {
    const { email } = req.body;
    console.log('passwordResetRequest 호출됬음');
    try {
        const isExist = await memberModel.isExistByEmail(email);
        if(isExist){
            res.status(StatusCodes.OK).json({"message":"비밀번호 변경 승인 완료","email":email});
            return;
        }else{
            res.status(StatusCodes.UNAUTHORIZED).json({"message":"없는 이메일인데용?"});
            return;
        }
    }
    catch (err) {
        res.status(500).json({"message":"뭔가 고장났는데용?"});
        return;
    }
}
const passwordReset = async (req, res) => {
    console.log('passwordReset 호출됬음');
    const { email,pwd } = req.body;
    try {
        const isExist = await memberModel.isExistByEmail(email);
        if(isExist){
            await memberModel.resetPassword(email,pwd);
            res.status(StatusCodes.OK).json({"message":"비밀번호 변경 완료"});
            return;
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({"message":"이메일 다시 확인해보세용"});
            return;
        }
    }
    catch (err) {
        res.status(500).json({"message":"문제가 났어요 .."});
        return;
    }
}

module.exports = { join,login,passwordReset,passwordResetRequest };