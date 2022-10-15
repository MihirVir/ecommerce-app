const User = require('../models/User')
const cryptoJS = require('crypto-js');
const router = require('../routes/user');
const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString()
    }

    try {
        const newUserDetails = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});

        return res.status(200).json(newUserDetails);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted")
    } catch (err) {
        return res.status(500).json({err, message: "internal server error"});
    }
}

const getUser = async (req, res) => {
    
    try {
    
        
        const user = await User.find();
       
        return res.status(200).json(user);
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({err, message: "internal server error"})
    }
}

const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const user = query  ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        
        return res.status(200).json(user);
    } catch (err) { 
        return res.status(500).json("internal server error");
    }
}

const stats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

    try {
        const data = await User.aggregate([
            {
                $match: {createdAt: {$gte: lastYear }}
            },
            {
                $project: {
                    month: {$month : "$createdAt"}
                }
            }, 
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
}
module.exports = {updateUser, deleteUser, getUser, getAllUsers, stats}