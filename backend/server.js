var express = require('express')
var app = express()

var posts = [{
        message: 'hello'
    },
    {
        message: 'hi2'
    }
]

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.listen(3000)