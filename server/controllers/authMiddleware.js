module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.user) {
            console.log("Allowed")
            return next()
        } else {
            return res.status(401).send("Unauthorized. Please log in.")
        }
    }
}