require("dotenv").config();
const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.login = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            error: (errors.array().length > 1) ? errors.array()[1].msg : errors.array()[0].msg 
        });
    }

    const { name, email, providerId, image } = req.body;

    try{
        const existingUser = await User.findOne({providerId}).select("_id");

        if(existingUser){
            const user = {
                id: existingUser._id
            }

            const token = jwt.sign(user, process.env.SECRET);

            return res.status(200).set({
                authToken: token
            }).json({
                success: true
            });
        }

        const newUser = await User.create({
            name,
            email,
            providerId,
            image
        });

        const user = {
            id: newUser._id
        }

        const token = jwt.sign(user, process.env.SECRET);

        res.status(200).set({
            authToken: token
        }).json({
            success: true
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

exports.adminLogin = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            error: (errors.array().length > 1) ? errors.array()[1].msg : errors.array()[0].msg 
        });
    }

    const { name, email, providerId, image } = req.body;

    try{
        const existingUser = await User.findOne({providerId});

        if(!existingUser){
            await User.create({
                name,
                email,
                providerId,
                image
            });

            return res.status(401).json({
                success: false,
                error: "You are not an admin yet. Please contact the software owner for more details"
            });
        }

        if(!existingUser.isAdmin){
            return res.status(401).json({
                success: false,
                error: "You are not an admin yet. Please contact the software owner for more details"
            });
        }

        const user = {
            id: existingUser.id
        };

        const token = jwt.sign(user, process.env.SECRET);

        res.status(200).set({
            adminToken: token
        }).json({
            success: true
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};