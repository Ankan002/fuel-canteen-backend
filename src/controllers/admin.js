exports.getAdmin = async(req, res) => {
    const admin = req.admin;

    res.status(200).json({
        success: true,
        data: {
            admin
        }
    });
};