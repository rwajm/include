const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const admin = require('../model/admin');

module.exports = passport => {
    passport.use(new LocalStrategy = (id, pwd, done) => {
        let loggedIn = admin.signin(id, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, { message: 'Not admin' });


            let checkPassword = bcrypt.compare(pwd, loggedIn.password);

            if (checkPassword === false)
                return done(null, false, { message: 'Incorrect password.' })

            return done(null, loggedIn);
        })
    })
}



module.exports = local;
