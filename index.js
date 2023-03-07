import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

import { register } from './controllers/auth.js'
import { createPost } from './controllers/posts.js'
import { verifyToken } from './middleware/auth.js'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'

/* CONFIGURATIONS */
const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )
dotenv.config()
const app = express()

app.use( express.json() )
app.use( helmet() )
app.use( helmet.crossOriginResourcePolicy( { policy: 'cross-origin' } ) )
app.use( morgan( 'common' ) )
app.use( bodyParser.json( { limit: '30mb', extended: true } ) )
app.use( bodyParser.urlencoded( { limit: '30mb', extended: true } ) )
app.use( cors() )
app.use( '/assets', express.static( path.join( __dirname, 'public/assets' ) ) )

/* FILE STORAGE */
const storage = multer.diskStorage( {
    destination: ( req, file, callback ) => {
        callback( null, 'public/assets' )
    },
    filename: ( req, file, callback ) => {
        callback( null, file.originalname )
    }
} )
const upload = multer( { storage } )

/* ROUTES WITH FILES */
app.post( '/auth/register', upload.single( 'picture' ), register )
app.post( '/posts', verifyToken, upload.single( 'picture' ), createPost )

/* ROUTES */
app.use( '/auth', authRoutes )
app.use( '/users', userRoutes )
app.use( '/posts', postRoutes )

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001

mongoose.set( 'strictQuery', true )
mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then(console.log('La base de donnée MongoDB connecté'))
    .then( () => {
    app.listen( PORT, () => console.log( `Le serveur est en route => PORT: ${PORT}` ) )
} ).catch( ( error ) => console.log( `${error} connexion impossible` ) )