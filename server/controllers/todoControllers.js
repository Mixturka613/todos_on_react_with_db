// Models
const userModel = require('../models/userModel')
const doModel = require('../models/doModel')

class todsControllers {

    async getTodoList(req, res) {
        try {
            const { id } = req.user;
            const todos = await doModel.find({ UserID: id })

            res.json(todos)

        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

    async updateTodo(req, res) {
        try {
            const id = req.body.id;
            const user = req.user;

            const todoPost = await doModel.findOne({ idDo: id })

            if (todoPost.UserID !== user.id) {
                return res.json({ message: "Вы не можите изменить дело другого пользователя" })
            }

            await doModel.findOneAndUpdate({ idDo: id, UserID: user.id }, { done: !todoPost.done }, (err, user) => {
                if (err) { return res.json({ err: "Ошибка при удалении" }) }
                res.json({ msg: "Всё ок" })
            })

        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

    async deletTodo(req, res) {
        try {
            const id = req.body.id;
            const user = req.user;

            const todoPost = await doModel.findOne({ idDo: id })

            if (todoPost.UserID !== user.id) {
                return res.json({ message: "Вы не можите удалить дело другого пользователя" })
            }

            await doModel.findOneAndDelete({ idDo: id, UserID: user.id }, (err, user) => {
                if (err) { return res.json({ err: "Ошибка при удалении" }) }
                res.json({ msg: "Всё ок" })
            })


        } catch (e) {
            console.log(e)
            res.json({ err: `Error - ${e}` }).status(400)
        }
    }

    async createTodo(req, res) {
        try {
            // Нужно получить текст и токен действия
            const { text, id } = req.body;
            const user = req.user;

            const newDo = {
                UserID: user.id, //id нужно получить их токена
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