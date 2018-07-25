var Post = require('./postModel.js')
var auth = require('../auth/auth.js')

const params = async (req, res, next) => {
    try {
        var author = req.params.id
        var posts = await Post.find({
            author
        })
        if (!posts) {
            next(new Error('No post with that id'))
        } else {
            req.posts = posts;
            next()
        }
    } catch (err) {
        next(err)
        console.log(error)
        res.sendStatus(500)
    }
}

const getAllByAuthor = (req, res) => {
    var posts = req.posts
    res.send(posts)
}

const deleteOne = async (req, res) => {
    try {
        let id = req.params.id
        var post = await Post.findByIdAndRemove(id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

const post = (req, res) => {
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
}

var userController = {
    params,
    getAllByAuthor,
    deleteOne,
    post
}

module.exports = userController