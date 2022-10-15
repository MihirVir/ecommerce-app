const User = require('../models/User');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    })

    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }

}

// Login registered user

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json("wrong username or password")
        }
        const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            return res.status(401).json("wrong username or password");
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
        )
        const { password, ...others } = user._doc;
        return res.status(200).json({...others, accessToken});
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {
    register,
    login
}