var express = require('express')
var app = express()

var posts = [{
        message: 'hello'
    },
    {
        message: 'hi'
    }
]

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.listen(3000)