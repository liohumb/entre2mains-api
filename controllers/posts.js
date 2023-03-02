import Post from '../models/Post.js'
import User from '../models/User.js'

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body

        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            likes: {},
            comments: [],
            description,
            picturePath,
            userPicturePath: user.picturePath
        })
        await newPost.save()

        const post = await Post.find()

        res.status(201).json(post)
    } catch (e) {
        res.status(409).json({message: e.message})
    }
}

/* GET */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

export const getUserPosts = async (req, res) => {
    const {userId} = req.params

    try {
        const post = await Post.find({userId})
        res.status(200).json(post)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const {id} = req.params
        const {userId} = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true})

        res.status(200).json(updatedPost)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}