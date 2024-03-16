//require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")

//custom middleware
const auth = require('./middleware/auth')

//import model - User
const User = require("./model/user")

const app = express()
app.use(express.json()) //for middleware
app.use(express.urlencoded({extended: true}))
app.use(cookieParser) //taking cookie from user browser and injectin everywhere we have access to request(req), so that we dont have to import it everywhere again and again

app.get("/", (req, res) =>{
    res.send("Welcome!!")
})

app.post("/signup", async (req, res) => {
    try {

        //collect all information
        const {firstname, lastname, email, password} = req.body

        //validate the data, if exists
        if(!(email && password && firstname && lastname)){
            res.status(401).send("All the fields are required")
        } 

        //check if user already exist
        const extuser = await User.findOne(email)
        if(extuser){
            res.status(400).send("User already exist")
        }

        //encrypt the password
        const myEncryPassword = await bcrypt.hash(password, 10)

        //create a new entry in database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: myEncryPassword
        })

        //create a token
        const token = jwt.sign({
            id: user._id, email
        }, "shhhh", {expiresIn: '2h'})

        user.token = token
        //don't want to send password
        user.password = undefined

        res.status(201).json(user)

    } catch (error) {
        console.log(error);
        console.log("Error in route");
    }
    
    

    const extuser = user.findOne(email)
    if(extuser){
        res.status(400).send("User already exist")
    }
})

app.post("/login", async (req, res) =>{
    try {
        //collect information
        const{email, password} = req.body

        //validate
        if(!(email && password)) {
            res.status(401).send("all fields mandatory")
        }
        //if user does not exist - assignment
        //check in database
        const user = await User.findOne({email})

        //match password
        if(user && (await bcrypt.compare(passsword, user.password))){
            const token = jwt.sign({id : user._id, email}, 'shhhh', {expiresIn: '2h'})

            user.password = undefined
            user.token = token

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000), httpOnly : true
            }

            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }
        //if user dosent exist after match password
        res.sendStatus(400).send("email or password is incorrect")
    } catch (error) {
        console.log(error)
    }
})

app.get('/dashboard', (req, auth /*this how we bring in middleware*/, res) =>{  //we can bring in as many middleware as we want
    res.send('welcome to dashboard')
})

app.get("/profile", (req, auth, res) => {
    //access to request.user= id, email

    //based on id, query to DB and get all information of user - findOne({id})

    //send json response with all data
})

module.exports = app;