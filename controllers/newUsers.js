import NewUser from '../models/NewUser.js'

/* GET */
export const getNewUsers = async ( req, res ) => {
    try {
        const {token} = req.params
        const foundUser = await NewUser.findOne({token})

        if (foundUser) {
            res.status(200).json(foundUser)
        } else {
            res.status(404).json(false)
        }
    } catch (e) {
        res.status(500).json({e: e.message})
    }
}

/* DELETE */
export const deleteUser = async (req, res) => {
    try {
        const { email } = req.params
        const deletedUser = await NewUser.findOneAndDelete({ email })

        if (deletedUser) {
            res.status(200).json({ success: true })
        } else {
            res.status(404).json({ success: false, message: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}