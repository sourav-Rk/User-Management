const User = require('../models/userModel');
const bcrypt = require('bcrypt');

                                                   
//hashing password function----
const securePassword = async(password)=>{
    try{
        const saltround = 10;
        const hashedPassword = await bcrypt.hash(password,saltround);
        return hashedPassword;
    }
    catch(err){
        console.log(err)
    }
}

//---------loading register---------

const loadRegister = async(req,res)=>{
    try{
        res.render('user/register',{msg:''});
    }
    catch(er){
        console.log(err)
    }
}

//------------adding users---------

const insertUser = async(req,res)=>{
    try{
        const spassword = await securePassword(req.body.password);
        const user  = new User({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:spassword,
            is_admin:0
        })
        const userData= await user.save();
        if(userData){
            res.render('user/register',{msg:"user registered successfully"});
        }
        else{
            res.render('user/register',{msg:"something went wrong"})
        }

    }
    catch(err){
        if(err.code===11000 && err.keyValue.email){
            res.render('user/register',{msg:"Email already Registered"});
        }
        else{
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
        
    }
}

//-------loading login page--
const loadLogin = async (req,res)=>{
    try{
        res.render('user/login',{msg:''});
    }
    catch(err){
        console.log(err);
    }
}

//-----verify login-

const verifyLogin = async(req,res)=>{
    try{
        const {email,password}= req.body;
        
        const user = await User.findOne({email});
    
        if(!user) return res.render('user/login',{msg:"User Does Not Exist"});

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) return res.render('user/login',{msg:"Invalid Password"});

        if(user.is_admin === 0){
            req.session.user_id= user._id;
            res.redirect('/home');
        }
        else{
            return res.render('user/login',{msg:'Invalid Email or Password'});
        }
    }
    catch(err){
        console.log(err);
    }
}

//-------loading home page---
const loadHome = async (req,res)=>{
    try{
        
        const user= await User.findById(req.session.user_id);
        if(!user){
            return res.redirect('/');
        }
        res.render('user/home',{user});
        
    }
    catch(err){
        console.log(err);
    }
}

//--------logout--------
const logout = async(req,res)=>{
    try{
      delete req.session.user_id;
      res.redirect('/')
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    loadLogin,
    insertUser,
    loadRegister,
    verifyLogin,
    loadHome,
    logout
}

