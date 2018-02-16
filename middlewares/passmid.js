const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('../models/user-account-schema');

exports.local = (user,res) =>{
   return new LocalStrategy(
        function(user, done) {
        console.log('llega' + user.body)
        password = user.body.password;
        username = user.body.username;
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    );
}
module.passport = passport;