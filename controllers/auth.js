import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { generateUser } from '../models/NewUser.js'

/* EMAIL VERIFICATION */
export const signupEmail = async ( req, res ) => {
    try {
        const { email } = req.body
        const newUser = await generateUser(email)

        const transporter = nodemailer.createTransport( {
            host: 'smtp.zoho.eu',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        } )

        const info = await transporter.sendMail( {
            from: process.env.EMAIL,
            to: email,
            subject: 'Bienvenue ✌️',
            html: `<p>Cliquez <a href="http://localhost:3000/inscription/${newUser}">here</a> pour continuer votre inscription.</p>`
        } )

        console.log( `Email sent to ${email}: ${info.messageId}` )

        res.status( 200 ).json( { message: 'Email sent successfully' } )
    } catch (error) {
        console.error( error )
        res.status( 500 ).json( { error: error.message } )
    }
}

/* CHECK EMAIL */
export const check = async ( req, res ) => {
    try {
        const { email } = req.body
        const user = await User.findOne( { email: email } )

        if (user) {
            res.json( { passwordRequired: true } )
        } else {
            res.json( { passwordRequired: false } )
        }
    } catch (e) {
        res.status( 500 ).json( { error: e.message } )
    }
}

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
        res.status( 500 ).json( { e: e.message } )
    }
}

/* LOGGING IN */
export const login = async ( req, res ) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne( { email: email } )
        if (!user) return res.status( 400 ).json( { msg: 'Utilisateur inconnu' } )

        const isMatch = await bcrypt.compare( password, user.password )
        if (!isMatch) return res.status( 400 ).json( { msg: 'Mot de passe incorrect' } )

        const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET )
        delete user.password

        res.status( 200 ).json( { token, user } )
    } catch (e) {
        res.status( 500 ).json( { error: e.message } )
    }
}