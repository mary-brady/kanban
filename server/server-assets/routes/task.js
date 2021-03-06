let router = require('express').Router()
let Tasks = require('../models/Task')

//GET
router.get('/by-list/:listId', (req, res, next) => {
    Tasks.find({ listId: req.params.listId })
        .then(data => {
            res.send(data)
            console.log('task get: ', data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//POST
router.post('/', (req, res, next) => {
    req.body.authorId = req.session.uid
    Tasks.create(req.body)
        .then(newTask => {
            res.send(newTask)
            console.log('task post: ', newTask)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//PUT
router.put('/:id', (req, res, next) => {
    Tasks.findById(req.params.id)
        .then(task => {
            if (!task.authorId.equals(req.session.uid)) {
                return res.status(401).send("ACCESS DENIED!")
            }
            task.update(req.body, (err) => {
                if (err) {
                    console.log(err)
                    next()
                    return
                }
                res.send("Successfully Updated")
            });
        })
        .catch(err => {
            console.log(err)
            next()
        })
})


//DELETE task
router.delete('/:id', (req, res, next) => {
    Tasks.findById(req.params.id)
        .then(task => {
            if (!task.authorId.equals(req.session.uid)) {
                return res.status(401).send("ACCESS DENIED!")
            }
            Tasks.findByIdAndRemove(req.params.id)
                .then(data => {
                    res.send('DELORTED')
                })
        })
})

//Delete all tasks by list id
router.delete('/by-list/:id', (req, res, next) => {
    Tasks.deleteMany({ listId: req.params.id })
        .then(data => res.send("Tasks delorted"))
        .catch(err => {
            console.log(err.message)
            next()
        })
})


module.exports = router