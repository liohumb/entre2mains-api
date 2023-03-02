import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema( {
    userId:
        {
            type: String,
            required: true
        },
    firstname:
        {
            type: String,
            required: true
        },
    lastname:
        {
            type: String,
            required: true
        },
    likes:
        {
            type: Map,
            of: Boolean
        },
    comments:
        {
            type: Array,
            default: []
        },
    description: String,
    picturePath: String,
    userPicturePath: String
}, { timestamps: true } )

const Post = mongoose.model('Post', PostSchema)

export default Post