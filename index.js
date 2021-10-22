const mongoose = require('mongoose')

const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'

const connect = mongoose.connect(url)

connect.then((db) => {
    console.log('Connected correctly to server')

    Dishes.create({
        name:"momo",
        description:"mitho hunxa muzi"
    })
        .then((dish) => {
            console.log(dish)
            return Dishes.findByIdAndUpdate(dish._id, {
                $set:{ description: 'naya ho' }
            },{
                new: true 
            }).exec()
        })
        .then((dish) => {
            console.log(dish)
            dish.comments.push({
                rating:3,
                comment:' jot ko theo muizi',
                author: 'Chris Thapa'
            })
            return dish.save()
        })
        .then((dish) => {
            console.log(dish)

            return Dishes.deleteMany()
        })
        .then(() => {
            return mongoose.connection.close()
        })
        .catch((err) => {
            console.log(err)
    })
})