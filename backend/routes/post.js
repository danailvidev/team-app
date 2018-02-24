var Post = require('../models/Post.js')
var express = require('express')
var auth = require('./auth.js')
var postRouter = express.Router()

postRouter.route('/:id')
    .get(async (req, res) => {
        var author = req.params.id
        var posts = await Post.find({
            author
        })
        res.send(posts)
    })
    .delete(auth.checkAuthenticated, async (req, res) => {
        try {
            let id = req.params.id
            var post = await Post.findByIdAndRemove(id)
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
        }
    })

postRouter.post('/', auth.checkAuthenticated, (req, res) => {
    var postData = req.body
    postData.author = req.userId
    postData.dateCreated = new Date()

    var post = new Post(postData)

    post.save((err, results) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({
                message: 'saving post error'
            })
        } else {
            res.status(200).send({
                result: true,
                id: results._id
            })
        }
    })
})

var post = {
    postRouter
}

module.exports = post