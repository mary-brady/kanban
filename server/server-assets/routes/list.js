let router = require('express').Router()
let Lists = require('../models/List')

//GET
router.get('/by-board/:boardId', (req, res, next) => {
    Lists.find({ boardId: req.params.boardId })
        .then(data => {
            res.send(data)
            console.log('list get: ', data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//POST
router.post('/', (req, res, next) => {
    req.body.authorId = req.session.uid
    Lists.create(req.body)
        .then(newList => {
            res.send(newList)
            console.log('list post: ', newList)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//PUT
router.put('/:id', (req, res, next) => {
    Lists.findById(req.params.id)
        .then(list => {
            if (!list.authorId.equals(req.session.uid)) {
                return res.status(401).send("ACCESS DENIED!")
            }
            list.update(req.body, (err) => {
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

//DELETE
router.delete('/:id', (req, res, next) => {
    Lists.findById(req.params.id)
        .then(list => {
            if (!list.authorId.equals(req.session.uid)) {
                return res.status(401).send("ACCESS DENIED!")
            }
            Lists.findByIdAndRemove(req.params.id)
                .then(data => {
                    res.send('DELORTED')
                })
        })
})


module.exports = router