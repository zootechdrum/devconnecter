const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check')

//@route    POST api/auth
//@desc     Register user
//@access   Public
router.post('/', (req,res) => {
    console.log(req.body)
res.send('Auth route');
})

module.exports = router;