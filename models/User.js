import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema( {
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
    artisan:
        {
            type: Array,
            default: []
        },
    postCode: String
}, { timestamps: true } )

const User = mongoose.model( 'User', UserSchema )

export default User