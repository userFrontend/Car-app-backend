const Message = require("../model/messageModel")
const {v4} = require('uuid');

const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, "../", "public");

const messageCtrl = {
    addMessage: async (req, res) => {
        const {carId, userId} = req.body
        try {
            if(!carId || !userId){
                return res.status(403).json({message: 'Invalid credentials'});
            }

            if(req.files){
                const {image} = req.files;
                const format = image.mimetype.split('/')[1];
                if(format !== 'png' && format !== 'jpeg') {
                    return res.status(403).json({message: 'file format incorrect'})
                }
                if(image.size > 1000000) {
                    return res.status(403).json({message: 'Image size must be less than (1) MB'})
                }
                const nameImg = `${v4()}.${format}`
                image.mv(path.join(uploadsDir, nameImg), (err) => {
                    if(err){
                        return res.status(503).json({message: err.message})
                    }
                })
                req.body.file = nameImg;
            }
            const messages = new Message(req.body)
            await messages.save()
            res.status(201).json({message: 'new message', messages})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
    getMessage: async (req, res) => {
        const {carId} = req.params;
        try {
            const messages = await Message.find({carId});
            res.status(200).json({message: "Chat's messages", messages})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
    deleteMessage: async (req, res) => {
        const {messageId} = req.params
        try {
            const deletedMessage = await Message.findByIdAndDelete(messageId);
            if(deletedMessage){
                return res.status(200).json({message: 'Message deleted!', deletedMessage})
            }
            res.status(404).json({message: 'Message not found!'})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
    updateMessage: async (req, res) => {
        const {messageId} = req.params
        try {
            const updateMessage = await Message.findById(messageId)
            if(updateMessage.userId === req.user._id || req.userIsAdmin){
                if(updateMessage){
                    const isMessage = await Message.findByIdAndUpdate(messageId, req.body, {new: true});
                    return res.status(200).json({message: "Message update successfully", isMessage})
                }
                return res.status(404).json({message: "Message not found"})
            }
            res.status(405).json({message: 'Acces Denied!. You can delete only your own accout'})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
}

module.exports = messageCtrl
