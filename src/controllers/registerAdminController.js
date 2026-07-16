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
        const adminExist
    } catch (error) {
        
    }
}