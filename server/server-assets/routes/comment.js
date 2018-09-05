let router = require('express').Router()
let Comments = require('../models/Comment')

//GET
router.get('/by-task/:taskId', (req, res, next) => {
  Comments.find({ taskId: req.params.taskId })
    .then(data => {
      res.send(data)
      console.log('comment get: ', data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
      console.log('Comment post: ', newComment)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      if (!comment.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      comment.update(req.body, (err) => {
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


//DELETE single comment
router.delete('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      if (!comment.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Comments.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})

//Delete all comments by task id
router.delete('/by-task/:id', (req, res, next) => {
  Comments.deleteMany({ taskId: req.params.id })
    .then(data => res.send("Comments delorted"))
    .catch(err => {
      console.log(err.message)
      next()
    })
})


module.exports = router