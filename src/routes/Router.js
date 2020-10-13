const express = require('express'); //express module
const route = express.Router(); //calling Router from express
const jwt = require('jsonwebtoken'); //json web token import
const DB = require('../../databases/Db'); // fake Databases
const authenticate = require('../middlewares/Middle'); //middleware
const Secret = require('../middlewares/JWTSecret'); //JWT secret

//authentication Route
route.post('/auth',(req,res)=>{
    
    // taking the datas from client
    var { email, password } = req.body; 
    
    //taking sure if the input email is valid
    if(email != undefined){ 
        
        // take a look if there is an user with this email on Fake databases
        const user = DB.Users.find( user => user.email === email);
        
        if(user){

            //if user exists I wanna see if the password form input is the same from user datas
            if(user.password === password){

                //here I'm saving datas that you or I might use in the future, and  defining the expiretion of token
                jwt.sign({Nome: user.nome, Email: user.email},Secret.JWTSecret,{expiresIn: '20s'},(err,token)=>{
                    if(err){
                        res.status(400);
                        res.json({message: 'Error on generate your token'})
                    }
                    else{
                        res.status(200);
                        res.json({Token: token});
                    }
                })
            }
            else{
                res.status(401);
                res.json({message: 'Your password is invalid'})
            }
        }
        else{
            res.json({message: 'There is not an user with this email !'})
        }
    }
    else{
        res.status(401);
        res.json({message : 'email invalid !'});
    }
});

//Verb GET, just to test the middleware
route.get('/user',authenticate,(req,res)=>{
    res.json({User: req.LoggedUser}); // returning javascript object notetion that contains the logged user information
})

module.exports = route;
