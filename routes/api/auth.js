const gravatar = require("gravatar")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check')
const User = require('../../models/User')

//@route    POST api/auth
//@desc     Register user
//@access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', "Please include a valid email").isEmail(),
    check('password', 'Please enter a password with 6 or more charechters').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(user) {
            res.status(400).json({errors: [{msg:"User already exists"}]})
        }

        const avatar = gravatar.url(email, {
            s:"200",
            r:"pg",
            d:'mm'
        })

        user = new User ({
            name,
            email,
            password
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }



    res.send('Auth route');
})

module.exports = router;