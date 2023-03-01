import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import Artisan from '../models/Artisan.js'

/* REGISTER USER */
export const registerUser = async ( req, res ) => {
    try {
        const {
            firstname, lastname, email, password, picturePath, artisan, postCode
        } = req.body

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash( password, salt )

        const newUser = new User( {
            firstname, lastname, email, password: hash, picturePath, artisan, postCode
        } )
        const savedUser = await newUser.save()

        res.status( 201 ).json( savedUser )
    } catch (e) {
        res.status( 500 ).json( { error: e.message } )
    }
}

/* REGISTER ARTISAN */
export const registerArtisan = async ( req, res ) => {
    try {
        const {
            firstname, lastname, email, password, picturePath, bannerPath, society, postCode
        } = req.body

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash( password, salt )

        const newArtisan = new Artisan( {
            firstname,
            lastname,
            email,
            password: hash,
            picturePath,
            bannerPath,
            society,
            postCode,
            viewProfil: Math.floor( Math.random() * 10000 ),
            impressions: Math.floor( Math.random() * 10000 )
        } )
        const savedArtisan = await newArtisan.save()

        res.status( 201 ).json( savedArtisan )
    } catch (e) {
        res.status( 500 ).json( { error: e.message } )
    }
}