const generateID = require('generate_id');

// Models
const userModel = require('../models/userModel')
const doModel = require('../models/doModel')

class todsControllers {

    async getTodoList(req, res) {
        try {
            res.json({ message: "Всё ок" })
        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

    async updateTodo(req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

    async deletTodo(req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

    async createTodo(req, res) {
        try {
            // Нужно получить текст и токен действия
            const { text, tocken } = req.body;

            const id = generateID(8)

            const newDo = {
                UserID: tocken.id, //id нужно получить их токена
                done: false,
                idDo: id,
                text: text.toString()
            }

            const doo = await new doModel(newDo)
            doo.save();

            return res.json({ message: "Новое дело добавленно в базу данных)))" })

        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

}

module.exports = new todsControllers();