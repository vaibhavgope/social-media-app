const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    image: {
        type: String,
        default: 'default.png'
    },
    about: String,
    posts: Array,
})

const PostSchema = mongoose.Schema({
    text: String,
    user: String,
    date: Date,
})

const User = mongoose.model('User', UserSchema)
const Post = mongoose.model('Post', PostSchema)

module.exports = { User, Post };