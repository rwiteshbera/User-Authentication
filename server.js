const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3000;

// DB Configuration
const db = require("./config/keys").MongoURI;

// Passport config
require('./config/passport.js')(passport);

// Comnect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MonogDB Connected..."))
  .catch((e) => console.log(e));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.login_error = req.flash('login_error');
    next();
})

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
