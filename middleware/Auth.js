const isLogin = async(req,res,next)=>{
    try{
        if(!req.session.user_id){
            return res.redirect('/');
        }
        else{
            next();
        }
        
    }
    catch(err){
        console.log(err);
    }
}



const isLogout = async(req,res,next)=>{
    try{
        if(req.session.user_id){
            res.redirect('/home');
        }
        else{
            next();
        }
        
    }
    catch(err){
        console.log(err);
    }
}

const isAdmin = async(req,res,next)=>{
    if(req.session.admin_id){
        res.redirect('/admin/dashboard')
    }
    else{
        next()
    }
}


module.exports = {
    isLogin,
    isLogout,
    isAdmin  
}