const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const Ban = require("../model/banModel")
const User = require("../model/userModel")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const banCtrl = {
    add: async (req, res) => {
        const {userId} = req.body
        if(req.userIsAdmin){
            const user = await User.findById(userId)
            if(user) {
                const baned = await Ban.create(user)
                Ban.save()
                res.status(201).json({message: 'User baned', user})
            } else {
                res.status(404).json({message: 'User not found'})
            }
        }
        res.status(405).json({message: 'Acces Denied!. You can delete only your own accout'})
    },
    deleteBaned: async (req, res) => {
        const {userId} = req.body
        if(req.userIsAdmin){
            const user = await Ban.findById(userId)
            if(user) {
                const deleteBan = await Ban.findByIdAndDelete(user._id)
                res.status(201).json({message: 'User deleted', deleteBan})
            } else {
                res.status(404).json({message: 'User not found'})
            }
        }
        res.status(405).json({message: 'Acces Denied!. You can delete only your own accout'})
    },
}

module.exports = banCtrl