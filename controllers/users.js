import User from '../models/User.js'

/* GET */
export const getUser = async ( req, res ) => {
    try {
        const { id } = req.params
        const user = await User.findById( id )
        res.status(200).json(user)
    } catch (e) {
        res.status( 404 ).json( { message: e.message } )
    }
}

export const getArtisans = async ( req, res ) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)

        const artisans = await Promise.all(
            user.artisans.map( ( id ) => User.findById(id))
        )
        const formattedArtisans = artisans.map(
            ({_id, firstname, lastname, picturePath, society, postCode}) => {
                return {_id, firstname, lastname, picturePath, society, postCode}
            }
        )

        res.status(200).json(formattedArtisans)
    } catch (e) {
        res.status( 404 ).json( { message: e.message } )
    }
}

/* UPDATE */
export const addRemoveArtisan = async (req, res) => {
    try {
        const {id, artisanId} = req.params
        const user = await User.findById(id)
        const artisan = await User.findById(artisanId)

        if (user.artisans.includes(artisanId)) {
            user.artisans = user.artisans.filter((id) => id !== artisanId)
            artisan.artisans = artisan.artisans.filter((id) => id !== id)
        } else {
            user.artisans.push(artisanId)
            artisan.artisans.push(id)
        }

        await user.save()
        await artisan.save()

        const artisans = await Promise.all(
            user.artisans.map( ( id ) => User.findById(id))
        )
        const formattedArtisans = artisans.map(
            ({_id, firstname, lastname, picturePath, society, postCode}) => {
                return {_id, firstname, lastname, picturePath, society, postCode}
            }
        )

        res.status(200).json(formattedArtisans)
    } catch (e) {
        res.status( 404 ).json( { message: e.message } )
    }
}