const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check')

//@route    POST api/auth
//@desc     Register user
//@access   Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty().
    check('email', "Please include a valid email").isEmail().
    check('password','Please enter a password with 6 or more charechters')
], (req,res) => {
    console.log(req.body)
res.send('Auth route');
})

module.exports = router;