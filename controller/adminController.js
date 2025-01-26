const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//-------loading login Page-----
const loadLogin =async(req,res)=>{
    try{
       return res.render('admin/login',{msg:''});
    }
    catch(err){
        console.log(err);
    }
}

//-------verifying email and password--------
const verifyLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const admin = await User.findOne({email});
        if(admin){
            const passwordMatch = await bcrypt.compare(password,admin.password);
            if(passwordMatch){
                if(admin.is_admin===0){
                    return res.render('admin/login',{msg:'Invalid Email and Password'});
                }
                else{
                    req.session.admin_id=admin._id;
                   return res.redirect('/admin/dashboard');
                }
            }
            else{
                return res.render('admin/login',{msg:'Invalid Email or Password'});
            }
        }
        else{
           return  res.render('admin/login',{msg:'Invalid Email and Password'});
        }
    }
    catch(err){
        console.log(err);
    }
}


//----loading Dashboard------
const loadDashboard = async(req,res)=>{
    try{


        const users = await User.find({is_admin:0});
        const msg = req.query.msg || '';  
       return  res.render('admin/dashboard',{users ,msg});
    }
    catch(err){
        console.log(err);
    }
}


//--------adding a user -----------
const addUser = async(req,res)=>{
    try{
       const {name , email , mobile , password} = req.body;
       const isExist = await User.findOne({email});
       if(isExist){
   
        return res.redirect('/admin/dashboard?msg=Email+Already+exists');
       } 
       
       const hashedPassword= await bcrypt.hash(password,10);

       await User.create({name , email , mobile , password:hashedPassword , is_admin:0});

     return res.redirect('/admin/dashboard?msg=User+added+successfully');

    }
    catch(err){
        console.log(err)
    }
}


//------deleting User--------
const deleteUser  = async(req,res)=>{
    try{
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);

        if(userId === req.session.user_id){
            delete req.session.user_id
        }

    return  res.redirect('/admin/dashboard');
    }
    catch(err){
        console.log(err);
        res.redirect('/admin/dashboard');
    }
}


//------edit a user------
const editUser = async(req,res)=>{
    try{
        const {id , name , email , mobile} = req.body;
       const user = await User.findById(id);
        if(user.email !== email){
            const isExist = await User.findOne({email});
            if(isExist) return res.redirect('/admin/dashboard?msg=Email+already+exists!!');
        }

        await User.findByIdAndUpdate(id,{name,email,mobile});
       return res.redirect('/admin/dashboard?msg=user updated successfully');
        
    }
    catch(err){
        console.log(err);
        res.redirect('/admin/dashboard');
    }
}


//-------logout----
const logout = async(req,res)=>{
    try{
        delete req.session.admin_id;
        res.redirect('/admin')
    }
    catch(err){
        console.log(err);
       
    }
} 

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    addUser,
    deleteUser,
    editUser
}

