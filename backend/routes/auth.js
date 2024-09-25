const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Devili$thekingofhell";


//1. Create a user using : POST "api/auth/register". No login reqd.
router.post('/register',[
    body('username','Enter a valid username').notEmpty(),
    body('name','Enter a valid name').notEmpty(),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 8 characters').isLength({min : 8})
], async (req, res) => {
//If there are errors return bad request and the errors
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        //Check whether the user exists already
        let user = await User.findOne({username: req.body.username},{email: req.body.email})
        if(user){
            return res.status(400).json({error: "Error!!! The user already exists."})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error:'Please enter unique value(s).'})});
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);

    res.json({authtoken})
    }catch(error){
        console.error(error.message)
        res.status(400).send("Internal Server Error");
    }
})

//2. Authenticate a user using : POST "api/auth/login".No Login reqd.
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
    ], async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);

        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
    
        res.json({authtoken})
    }catch(error){
        console.error(error.message)
        res.status(400).send("Internal Server Error");
    }
    })

//3. Authenticate a user using : POST "api/auth/user".No Login reqd.

module.exports = router
