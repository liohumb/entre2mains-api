import mongoose from 'mongoose'

const NewUserSchema = new mongoose.Schema( {
    email: String,
    token: String
}, { timestamps: true } )

const NewUser = mongoose.model( 'NewUser', NewUserSchema )

export default NewUser

export const generateUser = async (email) => {
    // Check if email already exists in collection
    const existingToken = await NewUser.findOne({ email })
    if (existingToken) {
        // If email exists, return existing token
        return existingToken.token
    }

    // If email doesn't exist, generate new token and save to collection
    const length = 32
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let token = ''

    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const newUser = new NewUser({ email, token })
    await newUser.save()

    return token
}