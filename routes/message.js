const express=require("express");
const router=express.Router({mergeParams:true});
const messageHandlers=require("../handlers/message");
const messageAuth=require("../config/auth");
const {checkLogin}=require("../config/auth");

router.get("/",(req,res)=>{
    const sessionId=req.params.id;
    res.render("newMessage",{sessionId});
})
router.post("/",messageAuth.ensureUser,messageHandlers.createMessage);
router.get("/:message._id",checkLogin,messageHandlers.getMessage);
router.delete("/:message._id",checkLogin,messageHandlers.deleteMessage);


module.exports=router;