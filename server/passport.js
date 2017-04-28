var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('./db');
var config = require('./config.js')

passport.use(new FacebookStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
     console.log(profile)
     db.users.findOne({facebook_id: profile.id}, (err, user) => {
         if (err) {
             return done(err)
         }
         if (!user) {
             db.users.insert({facebook_id: profile.id, name: profile.displayName}, (err, newUser) => {
                 if (err) {
                     return done(err)
                 }
                 return done(null, newUser)
             })
         }
         else {
             db.users.update({id: user.id, last_logged_in: new Date()}, (err, updatedUser) => {
                 if (err) {
                     return done(err)
                 }
                 return done(null, updatedUser)
             })
         }
     })
}
));

//         if (err) {
//             return done(err)
//         }
//         const user = users[0]
//         done(null, user);

// This allows passport to save the user id on req.user
passport.serializeUser(function(user, done) {
//  done(null, user.id);
    done(null, user)
});

// This allows passport to retrieve the user from your database using the id on req.user
passport.deserializeUser(function(user, done) {
  //Write this for our database
//  User.findById(id, function(err, user) {
    done(null, user);
//  });
});


module.exports = passport;