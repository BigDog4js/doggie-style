// Import data -- eventually we'll connect the database
// Right now we'll just use dummy data

const db = require('../db.js')

module.exports = {
    getDogs: (req, res, next) => {
        db.getDogs([], (err, dogs) => {
            res.status(200).json(formatDogs(dogs))
        })
    },

    getDogsByUser: (req, res, next) => {
        if (!req.user) {
            return res.status(401).json("Please log in. ")
        }
        db.getDogsByUser([req.user.id], (err, dogs) => {
            res.status(200).json(formatDogs(dogs))
        })
    },

    
    addDog: (req,res, next) => {
        let newDog = req.body;
        let newContact = req.body.contact
        delete newDog.contact;
        newDog.user_id = req.user.id
        newContact.user_id = req.user.id
        
        // First see if contact info exists
        db.contacts.findOne(newContact, (err, contact) => {
            if (err) return next(err)
            if (!contact) {
                // If contact doesn't exist, create contact
                db.contacts.insert(newContact, (err, contact) => {
                    if (err) return next(err)
                    // Once contact created, attach to dog and create newDog
                    console.log("Contact Inserted: ", contact)
                    newDog.contact_id = contact.id
                    db.dogs.insert(newDog, (err, newDog) => {
                        if (err) return next(err)
                        return res.status(200).json(newDog)
                    })
                })
                
            } else {
                console.log("Contact found: ", contact)
                newDog.contact_id = contact.id
                db.dogs.insert(newDog, (err, newDog) => {
                    if (err) return next(err)
                    return res.status(200).json(newDog)
                })                
            }
            
        })
//        db.dogs.insert(newDog, (err, response) => {
//            res.status(200).json(response)
//        })
    },
    
    updateDog: (req, res, next) => {
        let dog = req.body;
        let contact = req.body.contact
        delete dog.contact;
        dog.user_id = req.user.id
        contact.user_id = req.user.id
        
        console.log("In update")
        // See if contact updated
        db.contacts.findOne(contact, (err, existingContact) => {
            if (err) return next(err)
            if (existingContact) {
                dog.contact_id = existingContact.id    
                db.dogs.update(dog, (err, response) => {
                    res.status(200).json(response)
                })
            } else {
                db.contacts.insert(contact, (err, newContact) => {
                    if (err) return next(err)
                    dog.contact_id = newContact.id
                    db.dogs.update(dog, (err, newDog) => {
                        if(err) return next(err)
                        return res.status(200).json(newDog)
                    })
                })
            }
            
        })
    
    },
    
    deleteDog: (req, res, next) => {
        // req.params.id = id on dogs array
        db.dogs.destroy({id: req.params.id}, (err, response) => {
            res.status(200).json(response)
        })
    },
}

function formatDogs(dogs) {
    return dogs.map(dog => {
        dog.contact = {
            name: dog.contact_name,
            email: dog.email,
            phone: dog.phone
        }
        delete dog.contact_name;
        delete dog.email;
        delete dog.phone;
        return dog;
    })
}