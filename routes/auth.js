const express=require("express");
const router=express.Router();

const Authentication=require("../handlers/auth");
const auth=require("../config/auth");
router.get("/",(req,res)=>{
    res.send("Hello");
})
router.get("/signup",(req,res)=>{
    res.send("Welcome to Signup Page");
})
router.post("/signup",Authentication.signup);
router.get("/login",(req,res)=>{
    res.send("Welcome to login page");
})
router.post("/login",Authentication.signin);
router.get("/secret",auth.checkLogin,(req,res)=>{
    res.send("Welcome to secret page")
})

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/api/auth/login");
})
module.exports=router;