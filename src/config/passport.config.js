import passport from "passport"
import jwt, { ExtractJwt } from 'passport-jwt'
import { PRIVATE_KEY } from '../utils.js'

const JWTStragtegy = jwt.Strategy

const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies['quebonitosoy'] : null
    return token
}

const initializePassport = () => {
    passport.use('jwt', new JWTStragtegy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch(error) {
            return done(error)
        }
    }))
}

export default initializePassport