import passport = require('passport');
import CertificationCenterModel from '../models/Users/certificationCenter';

const JwtStrategy = require('passport-jwt').Strategy, 
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(
    'user', 
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_TOKEN,
        }, 
        (payload, done) => {  
            CertificationCenterModel.findOne({
                email: payload.email
            }).then(certificationCenter => {
                if (!certificationCenter) return done(null, false);
                done(null, certificationCenter)
            }).catch(err => done(err, false));
        }
    )
);

const authUser = passport.authenticate('user', {
    session: false,
});

module.exports = {
    authUser
}