const db=require("../config/keys").MongoURI;
const mongoose=require("mongoose");
mongoose.connect(db,{useNewUrlParser:true,useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:true,useCreateIndex:true,keepAlive:true})
    .then(()=>{console.log("MongoDb database connected")})
    .catch(err=>{console.log(err)})


