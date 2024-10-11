const express = require("express");

const jwt = require("jsonwebtoken");

const secretKey = "secretKey";

const app = express()

app.get("/" , (req, res)=>{
 res.json({
    message:"a sample Api"
 })

})

app.post("/login" , (req,resp) =>{
    const user ={
      id: 1,
      username: 'Rajwinder',
      email : 'abc@gmail.com'

    }
    jwt.sign({ user } , secretKey , {expiresIn: '300s'} , (err ,token) =>{
        resp.send({
            token
        })
    } )

})

app.post("/profile" ,verifyToken, (req,resp)=>{
   jwt.verify(req.token ,secretKey ,(err , authData) =>{
    if(err){
        resp.send({result:"invalid token"})
    }else{
        resp.json({
            message:"profile accessed",
            authData
        })
    }
   })
})

function verifyToken(req,resp,next){
    const bearerheader = req.headers["authorization"];
    if(typeof bearerheader !== 'undefined'){
        const bearer = bearerheader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        resp.send({
            result:"Token is not Valid"
        })
    }

}

app.listen(5000 ,()=>{

    console.log("App is running on 5000 port");
})