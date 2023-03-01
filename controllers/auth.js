import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

/* REGISTER */
export const register = async ( req, res ) => {
    try {
        const {
            role,
            firstname,
            lastname,
            email,
            password,
            picturePath,
            bannerPath,
            artisan,
            society,
            postCode
        } = req.body

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash( password, salt )

        const newUser = new User( {
            role,
            firstname,
            lastname,
            email,
            password: hash,
            picturePath,
            bannerPath,
            artisan,
            society,
            postCode
        } )
        const savedUser = await newUser.save()

        res.status( 201 ).json( savedUser )
    } catch (e) {
        res.status( 500 ).json( { error: e.message } )
    }
}

/* LOGGING IN */
export const login = async ( req, res ) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne( { email: email } )
        if (!user) return res.status(400).json({msg: "Utilisateur inconnu"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({msg: 'Mot de passe incorrect'})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({token, user})
    } catch (e) {
        res.status( 500 ).json( { error: e.message } )
    }
}