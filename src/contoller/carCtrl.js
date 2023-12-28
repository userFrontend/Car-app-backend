const Car = require("../model/carModel")
const {v4} = require('uuid');
const mongoose  = require('mongoose')


const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, "../", "public");

const carCtrl = {
    add: async (req, res) => {
        try {
            if(req.files){
                const {image} = req.files;
                const format = image.mimetype.split('/')[1];
                if(format !== 'png' && format !== 'jpeg') {
                    return res.status(403).json({message: 'fill eformat incorrect'})
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
                req.body.carImg = nameImg;
            }
            const newCar = new Car(req.body)
            await newCar.save()
            res.status(201).json({message: 'new Car', newCar})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
        
    },
    get: async (req, res) => {
        try {
            const cars = await Car.aggregate([
                {$lookup: {from: "category", let: {carId: '$_id'},
                pipeline: [
                    {$match: {$expr: {$eq: ["$categoryId", "$$carId"]}}}
                ],
                as: "categoryId"
            }},
            ])
            res.status(200).json({message: 'Cars', cars})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
    getOne: async (req, res) => {
        const {id} = req.params;
        try {
            const car = await Car.aggregate([
                {$match: {_id: new mongoose.Types.ObjectId(id)}},
                {$lookup: {from: "category", let: {carId: '$_id'},
                pipeline: [
                    {$match: {$expr: {$eq: ["$_Id", "$$carId"]}}},
                    {$lookup: {from: "author", let: {authorId: "$_Id"},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$_id", "$$authorId"]}}}
                    ],
                    as: "author",
                    }}
                ],
                as: "categoryId"
            }},
            ])
                return res.status(200).json({message: "found Car", car})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
    deleteChat: async (req, res) => {
        const {carId} = req.params
        try {
            const findCar = await Car.findById(carId);
            if(findCar){
                    if(findCar.carImg){
                        fs.unlinkSync(path.join(uploadsDir, findCar.carImg), (err) => {
                            if(err){
                                return res.status(503).json({message: err.message})
                            }
                        })
                    }
                await Car.deleteOne(findCar._id)
                return res.status(200).json({message: 'Car deleted successfully'})
            }
            res.status(404).json({message: 'Car not foud'})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
}

module.exports = carCtrl;