const errorHandler=(err,req,res,next)=>{
    return  res.json({
        error:{
            status:err.status||404,
            message:err.message||"Something went wrong"
        }
})
}
module.exports=errorHandler;