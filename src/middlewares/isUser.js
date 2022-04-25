require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.isUser = async (req, res, next) => {
    const token = req.header("auth-token");

    if(!token){
        return res.status(401).json({
            success: false,
            error: "Access Denied"
        });
    }

    try{
        const user = jwt.verify(token, process.env.SECRET);

        req.user = user.id;

        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}