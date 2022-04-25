const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAdmin = async(req, res, next) => {
    const adminToken = req.header("admin-token");

    if(!adminToken){
        return res.status(401).json({
            success: false,
            error: "Access Denied"
        });
    }

    try{
        const retrievedUser = jwt.verify(adminToken, process.env.SECRET);

        const userId = retrievedUser.id;

        const user = await User.findById(userId);

        if(!user.isAdmin){
            return res.status(401).json({
                success: false,
                error: "Access Denied, you are not an admin"
            });
        }

        req.admin = user;

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