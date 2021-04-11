const express=require("express");
const router=express.Router();
const User=require("../models/User");
const Authentication=require("../handlers/auth");
const auth=require("../config/auth");
router.get("/",(req,res)=>{
    res.send("Hello");
})
router.get("/signup",(req,res)=>{
    res.render("signup")
})
router.post("/signup",Authentication.signup);
router.get("/login",(req,res)=>{
    res.render("login");
})
router.post("/login",Authentication.signin);
router.get("/secret",auth.checkLogin,async(req,res)=>{
    const user=await User.findById(req.session.passport.user);
    const username=await user.username;
    const sessionID=req.session.passport.user;
    res.render("secret",{username,sessionID});
})

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/api/auth/login");
})
module.exports=router;