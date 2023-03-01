import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema( {
    role:
        {
            type: String,
            default: 'USER'
        },
    firstname:
        {
            type: String,
            required: true,
            min: 2,
            max: 55
        },
    lastname:
        {
            type: String,
            required: true,
            min: 2,
            max: 55
        },
    email:
        {
            type: String,
            required: true,
            max: 55,
            unique: true
        },
    password:
        {
            type: String,
            required: true,
            min: 5
        },
    picturePath:
        {
            type: String,
            default: ''
        },
    bannerPath:
        {
            type: String,
            default: ''
        },
    artisans:
        {
            type: Array,
            default: []
        },
    society: String,
    postCode: String,
    viewProfil: Number,
    impressions: Number
}, { timestamps: true } )

const User = mongoose.model( 'User', UserSchema )

export default User