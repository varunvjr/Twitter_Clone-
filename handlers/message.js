require("../models");
const Message=require("../models/message");
const User=require("../models/User");
exports.createMessage=async function(req,res,next){
    try{
        const newmessage=new Message({
            text:req.body.text,
            user:req.params.id
        })
        console.log(newmessage);
        await newmessage.save(); 
        let foundUser=await User.findById(req.params.id);
        foundUser.messages.push(newmessage._id);
        await foundUser.save();
        let foundMessage=await Message.findById(newmessage.id).populate("user",{
            username:true,
            profileImage:true
        });
        return res.status(200).json(foundMessage);
    }   
    catch(err){
        return next(err);
    }
}
exports.getMessage=async(req,res,next)=>{
    try{
        let message=req.params.message._id;
        return res.status(200).json(message);
    }
    catch(err){
        return next(err);
    }
}

exports.deleteMessage=async(req,res,next)=>{
    try{
        let foundMessage=req.params.message._id;
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    }
    catch(err){
        return next(err);
    }
}