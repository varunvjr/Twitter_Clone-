exports.checkLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.status(404).send({
        msg: "Please Login First"
    })
}
exports.ensureUser=(req,res,next)=>{
    if(req.params.id==req.session.passport.user){
        return next();
    }
    res.status(401).send({
        msg:"Unauthorized"
    })
}