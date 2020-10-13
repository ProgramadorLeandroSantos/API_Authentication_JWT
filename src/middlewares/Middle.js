const jwt = require('jsonwebtoken'); // importing JWT module
const secret = require('../middlewares/JWTSecret'); // import My almost secrete  JWT MasterKey 


//middleware
function auth (req, res, next){
    const authToken = req.headers['authorization']; // taking the authorization Headers, essential

    // if the headers auth is not empty or invalid make this
    if(authToken != undefined){
        
        //handling the token
        const bearerBody = authToken.split(' ');
        
        // taking the token without the Title
        var Token = bearerBody[1];

        //making sure that the user is authenticated
        jwt.verify(Token,secret.JWTSecret,(err,data)=>{
            if(err){
                res.status(401);
                res.json({message: 'invalid Token'})
            }
            else{
                req.LoggedUser = { Nome: data.Nome, Email: data.Email}
                res.status(200)
                next();
            }
        })
    }
    else{
        res.status(401);
        res.json({message: 'invalid token'})
    }
   
};
module.exports = auth;