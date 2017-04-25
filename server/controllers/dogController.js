// Import data -- eventually we'll connect the database
// Right now we'll just use dummy data

const db = require('../db.js')

module.exports = {
    getDogs: (req, res, next) => {
        db.getDogs([], (err, dogs) => {
            res.status(200).json(dogs)
        })
    },

    getDogsByUser: (req, res, next) => {
        if (!req.user) {
            return res.status(401).json("Please log in. ")
        }
        db.getDogsByUser([req.user.id], (err, dogs) => {
            res.status(200).json(dogs)
        })
    },

    
    addDog: (req,res, next) => {
        req.body.user_id = req.user.id
        db.dogs.insert(req.body, (err, response) => {
            res.status(200).json(response)
        })
    },
    
    updateDog: (req, res, next) => {
        db.dogs.update(req.body, (err, response) => {
            res.status(200).json(response)
        })
    },
    
    deleteDog: (req, res, next) => {
        // req.params.id = id on dogs array
        db.dogs.destroy({id: req.params.id}, (err, response) => {
            res.status(200).json(response)
        })
    },
}
