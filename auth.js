const jet = require("jsonwebtoken") //unlike cookieParser we have to import jwt everywhere

const auth = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token  //req.cookies is also enough, it will work

    //we are use using "token" here because we named our cookie token

    //what if token is not there
    if(!token){
        return res.status(403).send("access denied")
    }

    //verify token 
    try {
        const decode = jwt.verify(token, 'shhhhh')
        console.log(decode);
        req.user = decode

        //extract id from token and query the DB(for mega project)
        
    } catch (error) {
        console.log("token invalid");
    }
    return next()
}

module.exports = auth