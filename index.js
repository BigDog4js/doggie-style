var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require("express-session");
var _ = require("lodash");
var passport = require("./server/passport")

var config = require('./config.js')
var dogController = require('./server/controllers/dogController')
var authMiddleware = require('./server/controllers/authMiddleware')

var app = express();
var port = config.port || 3000


app.use(cors());
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true
}))
// This initializes passport so we can use passport to authenticate
app.use(passport.initialize())
// This hooks up passport to the session so we can identify individual users
app.use(passport.session())

// Auth Endpoints
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/#/search',
                                      failureRedirect: '/#/home' }));


app.get('/user', (req, res, next) => {
    if (!req.user) return res.status(200).json(null)
    return res.status(200).json(req.user)
})
// API Endpoints

app.get('/api/dogs/user', dogController.getDogsByUser)
app.get('/api/dogs', dogController.getDogs)

app.use(authMiddleware.isAuthenticated)
app.post('/api/dogs', dogController.addDog)

app.put('/api/dogs', dogController.updateDog)

app.delete('/api/dogs/:id', dogController.deleteDog)









app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})