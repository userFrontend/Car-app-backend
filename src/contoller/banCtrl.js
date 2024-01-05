const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const Ban = require("../model/banModel")
const User = require("../model/userModel")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const banCtrl = {
    add: async (req, res) => {
        try {
            const {userId} = req.params
            if(req.userIsAdmin){
                const user = await User.findById(userId)
                if(user) {
                    const baned = new Ban(user);
                    await baned.save();
                    return res.status(201).json({message: 'User baned', baned})
                } 
                return res.status(404).json({message: 'User not found'})
            }
            res.status(405).json({message: 'Acces Denied!. You can delete only your own accout'})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
    get: async (req, res) => {
        try {
            const users = await Ban.find()
            res.status(200).json({message: "Baned users", users})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
    deleteBaned: async (req, res) => {
        try {
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
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
}

module.exports = banCtrl