const mongoose=require("mongoose");
const User=require("./User");

const messageSchema=mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxLength:100
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    },
    {
        timestamps:true
    });
messageSchema.pre("remove",async function(next){
    try{
        let user=await User.findById(this.user);
        await user.messages.remove(this.id);
        await user.save();
        return next();
    }
    catch(err){
        return next(err);
    }
})
const Message=mongoose.model("Message",messageSchema);
module.exports=Message;
