//----mongo connection-----
const mongoose = require('mongoose');     
mongoose.connect('mongodb://127.0.0.1:27017/UserManagement');

//-----express--
const express = require('express');
const app = express();

//-----session----------
const Mongostore = require('connect-mongo');
const session = require('express-session');
app.use(session({ 
    secret:'mysecretkey',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000 * 60 * 60 * 24},
}))

//---view--engine---
app.set('view engine','ejs');
app.set('views','./views');

//----cache control---
const nocache = require('nocache');
app.use(nocache());

app.use((req,res,next)=>{
    res.set('Cache-Control','no-store');
    next();
})

//---static file 
app.use(express.static('public'));

//-----json && urlencoded--
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//---admin route---
const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute);

//--User Route-----
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);


app.get('*',(req,res)=>{
    res.status(404).send('404 Page Not Found')
})




app.listen(3003,()=>console.log("server is running on 3003"));

