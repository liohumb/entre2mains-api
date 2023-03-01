import mongoose from 'mongoose'

const ArtisanSchema = new mongoose.Schema( {
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
    society: String,
    postCode: String,
    viewProfil: Number,
    impressions: Number
}, { timestamps: true } )

const Artisan = mongoose.model( 'Artisan', ArtisanSchema )
export default Artisan