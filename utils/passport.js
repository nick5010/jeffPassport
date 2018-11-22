const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const db = require("../models");

const JWT_SECRET = process.env.CHAT_JWT_SECRET;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      // issuer: 'accounts.examplechat.com',
      // audience: 'examplechat.com'
    },
    function (jwt_payload, done) {
      // db.User.findOne({ id: jwt_payload.sub }, function (err, user) {
      db.User.findOne({ where: { id: jwt_payload.id } })
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        })
        .catch(err => done(err, false));
    })
);

module.exports = passport;
