const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
require("dotenv").config();
require("colors");
const port = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
global.__basedir = "public/"; // set base directory
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log("Database connected!".brightMagenta.bold);
}).catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.status(200).send("Alhamdulillah, Running Server");
})

// Main Routes
app.use("/api/v1/admin/", require("./Routes/AdminRoutes"));



app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/BufferData', express.static(path.join(__dirname, 'BufferData')));

app.listen(port, () => {
    console.log(`Listening to port ${port}`.brightMagenta.bold);
})
