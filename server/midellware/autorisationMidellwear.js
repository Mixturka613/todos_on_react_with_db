const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const tocken = req.headers.authorisation

        if (!tocken) {
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }

        const decodeJWT = jwt.verify(tocken, process.env.SECRETKEY)
        req.user = decodeJWT;
        next()

    } catch (e) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
    }
}