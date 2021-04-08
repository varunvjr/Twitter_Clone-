require("../models");

const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.signup = (req, res, next) => {
  console.log(req.body);
    const { email, username, password, profileImage } = req.body;

    // const user =  User.create(req.body);
    User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(400).send({
          msg: "User already exists",
        });
      } else {
        const user = new User({
          email,
          username,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, async (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save()
            .then((user) => {
              console.log("SAved User", user);
            })
            res.redirect("/api/auth/login");
          });
        });
      }
    })
    .catch(err => {
        next(err);
    })
  }
exports.signin =  (req, res, next) => {
    console.log("Login request",req.body);
  
    passport.authenticate("local", {
      successRedirect: "/api/auth/secret",
      failureRedirect: "/api/auth/login",
    })(req, res, next);
}
