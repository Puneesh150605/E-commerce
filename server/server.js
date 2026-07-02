const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));
app.use(cors());

// connect to the mongodb database
connectDB()

app.use('/api/items', require("./routes/items"))
app.use('/api/payment', require("./routes/payment"))

app.get('/', (req, res) => {
    res.json({ status: "success", message: "SHEMA E-Commerce Backend API is Live and Running!" });
});

app.listen(PORT, console.log("Server is running on port ", PORT))

module.exports = app;