const { Router } = require('express')
const router = new Router()

// Controllers
const userControllers = require('./controllers/userControllers')
const todsControllers = require('./controllers/todoControllers')

// Middelware
const authMiddleware = require('./midellware/autorisationMidellwear')

// Users
router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)

//todsControllers
router.post('/todo', authMiddleware, todsControllers.getTodoList)
router.put('/update', authMiddleware, todsControllers.updateTodo)
router.delete('/delete', authMiddleware, todsControllers.deletTodo)
router.post('/create', authMiddleware, todsControllers.createTodo)


module.exports = router;