const express = require('express')
const router = express.Router()

const Post = require('../../../models/post')

router.get('/', async (req, res) => {
    const posts = await Post.find({})
    try {
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const posts = new Post({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            font: req.body.font,
            title: req.body.title,
            description: req.body.description,
    })
    try {
        const save = await posts.save()
        res.status(200).json(save)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router