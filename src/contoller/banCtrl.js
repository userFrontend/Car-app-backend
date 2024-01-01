const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const Ban = require("../model/banModel")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const banCtrl = {
    add: async (req, res) => {
        
    },
    deleteBaned: async (req, res) => {

    },
}

module.exports = banCtrl