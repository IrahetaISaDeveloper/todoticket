import nodemailer from "nodemailer";
import  crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import adminModel from "../models/admin.js";
import {config} from "../../config.js";
const registerAdminController = {};

registerAdminController.register = async (req, res) =>{
    try {
        const {name, email, password, isVerified, loginAttempts, timeOut} = req.body;
        const adminExist = adminModel.findOne({email});
        if(adminExist){
            return res.status(400).json({message: "Admin already exists"});
        }

        const passwordHashed = await bcrypt.hash(password, 10);
        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {randomCode, name, email, password: passwordHashed, isVerified, loginAttempts, timeOut},
            config.JWT.Secret,
            {expiresIn: "15m"},
        );

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 *1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{user: config.email.user_email, pass: config.email.user_password},
        });

        const mailOptions = {
            from: config.email.user_email, to: email, subject: "Verificacion de cuenta",
            text: "para que podamos verificar tu cuenta debes de utilizar este codigo: " + randomCode + ". Tienes 15 minutos antes que este expire. "
        };

        transporter.sendMail(mailOptions,(error, info) => {
            if(error){
                console.log("error "+ error);
                return res.status(500).json({message: "Internal server error"});
            }
            return res.status(200).json({message: "Email sent succesfully"});
        });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

registerAdminController.verifyCode = async (req, res) =>{
    try {
        const {verificationCodeRequest} = req.body;
        const token = req.cookies.registrationCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.Secret);

        const {randomCode:storedCode, name, email, password, isVerified, loginAttempts, timeOut = decoded};

        if(verificationCodeRequest !== storedCode){
            return res.status(100).json({message: "invalid code"});
        }

        const newAdmin = adminModel({
            name, email, password, isVerified: true,
        });

        await newAdmin.save();
        res.clearCookie("registrationCookie");
        return res.status(200).json({message: "Admin registered succesfully"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

export default registerAdminController;