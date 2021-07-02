const bcrypt = require('bcrypt')
const generateID = require('generate_id');
const jwt = require('jsonwebtoken')


// Models
const userModel = require('../models/userModel')

class userControllers {

    async registration(req, res) {
        try {
            console.log(req.cookies)
            const { login, password } = req.body;
            const candidate = await userModel.findOne({ login: login })
            if (candidate) {
                return res.json({ message: "Such a user exists" })
            }

            const hash = await bcrypt.hash(password, 8)

            const id = generateID(6)

            const tocken = await jwt.sign({ id: id, login: login }, process.env.SECRETKEY)

            const newUser = {
                login: login,
                password: hash,
                id: id
            }

            const user = await new userModel(newUser)
            user.save()

            return res.json({
                ...newUser,
                tocken: tocken
            }).setHeader('authorisation', tocken)

        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            const candidate = await userModel.findOne({ login: login })
            if (!candidate) {
                return res.json({ message: "User not found" })
            }

            const hash = await bcrypt.compare(password, candidate.password)
            if (!hash) {
                res.json({ message: "The password is not correct" })
            }

            const tocken = await jwt.sign({ id: candidate.id, login: login }, process.env.SECRETKEY)

            return res.json({
                id: candidate.id,
                tocken: tocken
            })

        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

}

module.exports = new userControllers();