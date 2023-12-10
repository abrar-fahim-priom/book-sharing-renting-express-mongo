//External Imports
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const { errorMiddleware } = require("./middlewares/errorMiddleware.js");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../..", "public"))); //set static folder
app.use(cookieParser()); //parse cookies

//route imports 
const homeRoute = require("../src/routes/homeRoute.js");
const authRoute = require("../src/routes/authRoute.js");
const bookRoute = require("../src/routes/bookRoute.js");
const adminViewRoute = require("../src/routes/adminViewRoute");

//route hits
app.use("/api/", homeRoute);
app.use("/api/auth",authRoute);
app.use("/api/books", bookRoute);
app.use("/api/admin", adminViewRoute);


app.get("/test", (req, res) => {
	res.status(200).send({ status: "All Good", message: "Server is running." });
});

// client error
app.use((req, res, next) => {
	next(createError(404, "Page not found!"));
});

app.set("view engine","ejs");

// server error
app.use(errorMiddleware);


module.exports = app;
