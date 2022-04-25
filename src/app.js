require("dotenv").config()
const express = require("express");
const connectToDB = require("./config/dbConnect");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const startServer = () => {
    const app = express();
    const port = process.env.PORT;

    connectToDB();

    app.use(cors({
        exposedHeaders: ["authtoken", "admintoken"]
    }));
    app.use(express.json());
    app.use(fileUpload({
        useTempFiles: true
    }));

    app.get("/", (req, res) => {
        res.status(200).json({
            success: false,
            message: "Welcome to FUEL Backend API..."
        });
    });

    app.use("/api", authRoutes);
    app.use("/api", userRoutes);
    app.use("/api", adminRoutes);

    app.listen(port, () => console.log(`App running at PORT: ${port}`));
};

module.exports = startServer;