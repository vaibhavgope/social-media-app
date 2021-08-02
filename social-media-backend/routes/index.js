var express = require('express');
var router = express.Router();
var validator = require('validator')

const { User, Post } = require('../models')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(200);
});

//get single user
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ email: `${req.params.id}@gmail.com` })
    res.status(200).send(user);
  } catch (err) {
    res.send({ error: 'User not found' })
  }
})
//create user
router.post('/register', async (req, res) => {
  const { name, email, imageUrl: image } = req.body
  try {
    const emailExists = await User.findOne({ email: email })
    if (emailExists) {
      res.status(200).send({ success: true, email: emailExists.email });
    } else {
      try {
        const newUser = new User({ name, email, image })
        await newUser.save()
        res.json({ success: true, email: email });
      } catch (err) {
        res.json({ error: err })
      }
    }
  } catch (error) {
    res.json({ error: error })
  }
})

//edit profile
router.post('/profile/:id/edit', async (req, res) => {
  const { id } = req.params
  const { text } = req.body
  try {
    let found = await User.findById(req.params.id).exec()
    if (found) {
      await User.findOneAndUpdate({ _id: req.params.id }, { $set: { about: text } })
      res.send({ updated: true, id })
    } else res.sendStatus(403)
  } catch (error) {
    res.send(error)
  }
})

//create post
router.post('/posts/create', async (req, res) => {
  let found = await User.find({ email: req.body.username + '@gmail.com' })
  if (found) {
    found = found[0]
    try {
      const text = req.body.text
      const errors = []
      if (validator.isEmpty(text)) {
        errors.push({
          param: 'text',
          msg: 'Text is required.'
        })
      }
      if (errors.length > 0) {
        res.send({ errors })
      } else {
        const newPost = new Post({
          text,
          user: found.email,
          date: new Date()
        })
        newPost.save().then(post => {
          User.findOneAndUpdate({ email: found.email }, { $push: { posts: post.text } })
            .then(() => { res.send({ created: true, postId: post._id }) })
        })
      }
    } catch (err) {
      console.log('error', err);
      res.send(err)
    }
  } else {
    res.sendStatus(403)
  }
})
module.exports = router;
