module.exports= async (req,res,next)=>{
    if(req,session.userid){
        return res.redirect('/')
    }next()
}