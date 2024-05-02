const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
 console.log("Authorization");
     const token =req.header('Authorization');
     
    console.log(token);
    if(!token){
        return res.status(401).send('Access deniend !!')
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
  
    req.payload=decoded
    console.log(req.payload);
    next();
}