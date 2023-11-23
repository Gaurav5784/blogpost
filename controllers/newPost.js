module.exports =(req,res) =>{
   if (res.session.userid){
    return res.render('create')
}res.redirect('/path/login')
}
