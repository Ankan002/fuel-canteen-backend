require("dotenv").config();
const mongoose = require("mongoose");

const connectToDB = () => {
    const dbUri = process.env.DB_URI;

    mongoose.connect(dbUri)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error));
}

module.exports = connectToDB;