const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Message=require("./message");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
})
// userSchema.pre("save",async function(next) {
//         try{
//             if(!this.isModified("password"))
//                 return next();
//         else{
//             const hashPassword=await bcrypt.hash(this.password,10);
//             this.password=hashPassword;
//         }
//         return next();
//     }catch(err){
//         return next(err)
//     }
    
// })
// userSchema.method.comparePassword=async(candidatePassword,next)=>{
//     try{
//         const isMatch=await bcrypt.compare(candidatePassword,this.password);
//         return isMatch;
//     }catch(err){
//         return next(err);
//     }
// }
const User=mongoose.model("User",userSchema);
module.exports=User;