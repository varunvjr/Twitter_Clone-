require("dotenv").config();
const express = require("express");
const passport=require("passport");
const app = express();
const methodOverride=require("method-override");
const {getMessage,deleteMessage}=require("./handlers/message");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/errorHandler");
const PORT=8081;
const authRoutes=require("./routes/auth");
const messageRoutes=require("./routes/message");
const Message=require("./models/message");
//const { session } = require("passport");
const session=require("express-session");
const messageAuth=require("./config/auth");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
require("./config/passport")(passport);
app.use(session({
    secret:"VegaataDBZ",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:24*60*60*1000}
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use("/api/auth",authRoutes);
app.use("/api/users/:id/messages",messageAuth.checkLogin,messageAuth.ensureUser,messageRoutes);
app.use(methodOverride("_method"));
app.get("/",(req,res)=>{
    res.render("home");
})
app.get("/api/users/:id/messages/:messageid",messageAuth.checkLogin,messageAuth.ensureUser,getMessage);
app.delete("/api/users/:id/messages/:messageid",messageAuth.checkLogin,messageAuth.ensureUser,deleteMessage);
app.get("/api/messages",messageAuth.checkLogin,async function(req,res,next){
    try{
        let messages=await Message.find()
        .sort({createdAt:"desc"})
        .populate("user",{
                username:true,
                profileImage:true
            });
        console.log("All messages: ",messages);
        res.render("allMessages",{messages});
    }
    catch(err){
       return  next(err);
    }
})

app.use((req,res,next)=>{
    const err=new Error("Page Not found");
    res.status=404;
    next(err);
})
app.use(errorHandler); 

app.listen(PORT,()=>{
    console.log(`Server Starting on port: ${PORT}`);
})
