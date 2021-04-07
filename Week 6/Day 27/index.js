require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

//express
const express = require("express");
const fileUpload = require("express-fileupload");

//import routes
const authRoutes = require("./routes/authRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");
const barangRoutes = require("./routes/barangRoutes");

//make express app
const app = express();


//body parser to read  req.body

app.use(express.json()); // Enable req.body JSON type
app.use(
    express.urlencoded({
        extended: true,
    })
); //support urlencode bldy

//to read form-data request
app.use(fileUpload());


//set static file directory
app.use(express.static("public"));

//make routes
app.use("/transaksi", transaksiRoutes);
app.use("/barang", barangRoutes);
app.use("/auth", authRoutes);
//running server
app.listen(3000, () => console.log("server running on 3000"));