const auth = require('../../middleware/auth')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check')
const User = require('../../models/User')

//@route    POST api/auth
//@desc     Register user
//@access   Public
router.get('/', auth, (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(-password);
        res.json(user)
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

//@route POST api/auth
//@desc Authenticate user & get token
// @acess public 


router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', "Please include a valid email").isEmail(),
    check('password', 'Please enter a password with 6 or more charechters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(user) {
          return  res.status(400).json({errors: [{msg:"User already exists"}]})
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

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),
        {expiresIn:3600000},
      (err, token) => {
          if(err) throw err;
            res.json({token});
          }
      );
    }   catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }




})

module.exports = router;