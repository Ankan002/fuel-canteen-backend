const User = require("../models/User");

exports.getUser = async (req, res) => {
    const userId = req.user;

    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success: false,
                error: "No user found!!"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user
            }
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}