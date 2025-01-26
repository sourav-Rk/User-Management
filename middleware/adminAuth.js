const isLogin = async(req,res,next)=>{
    try{
        if(req.session.admin_id){
            next();
        }
        else{
          return  res.redirect('/admin')
        }
    }
    catch(err){
        console.log(err);
    }
}
const isNotLogin = async(req,res,next)=>{
    try{
        if(!req.session.admin_id){
           res.redirect('/admin')
        }
        else{
          next()
        }
    }
    catch(err){
        console.log(err);
    }
}

const isLogout = async(req,res,next)=>{
    try{
        if(req.session.admin_id){
           return res.redirect('/admin/dashboard');
        }
        else{
            next();
        }
      
    }
    catch(err){
        console.log(err);
    }
   
}


const isUser = async(req,res,next)=>{
    if(req.session.user_id){
        res.redirect('/')
    }
    else{
        next()
    }
}

module.exports = {
    isLogout,
    isLogin,
    isNotLogin,
    isUser
}