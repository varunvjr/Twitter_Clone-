require("../models");
const Message=require("../models/message");
const User=require("../models/User");
exports.createMessage=async function(req,res,next){
    try{
        const newmessage=new Message({
            text:req.body.message,
            user:req.params.id
        })
        await newmessage.save(); 
        let foundUser=await User.findById(req.params.id);
        foundUser.messages.push(newmessage._id);
        await foundUser.save();
        let foundMessage=await Message.findById(newmessage.id).populate("user",{
            username:true,
            profileImage:true
        });
        res.redirect("/api/messages");
    }   
    catch(err){
        return next(err);
    }
}
exports.getMessage=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        const message=await Message.findById(req.params.messageid);
        const messageData={
            username:user.username,
            text:message.text,
            createdAt:message.createdAt,
            updatedAt:message.updatedAt,
            messageId:message,
            userId:req.params.id
        }
        console.log("Message Data: ",messageData);
        res.render("showMessage",{messageData});
    }
    catch(err){
        return next(err);
    }
}

exports.deleteMessage=async(req,res,next)=>{
    try{
        let foundMessage=await Message.findById(req.params.messageid);
        await foundMessage.remove();
        return res.redirect("/api/messages");
    }
    catch(err){
        return next(err);
    }
}