const local = require('./localStrategy');

module.exports = passport => {

  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, { id : user.id, name : user.name });
    })
  });

  passport.deserializeUser((user, done) => {
    process.nextTick(() => {
      done(null, user);
    })
  });

  // ????
  //local(passport);
};