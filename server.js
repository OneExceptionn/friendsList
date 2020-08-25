const express = require('express')
const morgan = require('morgan')
const path = require('path')
const db = require('./db')
const { Friend } = db.models

const app = express()

app.use(express.static(path.join(__dirname, 'src')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(require('method-override')('_method'))

app.use(morgan('dev'))

db.syncAndSeed();

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.get('/api/friends/', async (req, res, next) => {
    const friendList = await Friend.findAll({
        order: [
            ['rating', 'DESC']
        ]
    })
    res.send(friendList)
})

app.put('/api/friends/:id', async (req, res, next) => {
    const friends = await Friend.findAll( {
        where: {
            id: (req.params.id)
        }
    })
    const friend = friends[0]
    if (req.body.buttonAction === 'add') {
        friend.rating = friend.rating + 1
    } else {
        friend.rating = friend.rating - 1
    } 
    if (friend.rating <= 0) {
        friend.destroy()
    }
    friend.save()
    res.redirect('/')
}) 

app.post('/api/friends/', async (req, res, next) => {
    const newFriend = await Friend.build({ name: req.body.toCreate });
    await newFriend.save()
    res.redirect('/')
})

app.delete('/api/friends/:id', async (req, res, next) => {
    const friends = await Friend.findAll( {
        where: {
            id: (req.params.id)
        }
    })
    const friend = friends[0]
    await friend.destroy()
    console.log('hi', req.method)
    res.redirect('/')
}) 

PORT = 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})