const JWT = require('jsonwebtoken');
import CertificationCenterModel from '../models/Users/certificationCenter';
require('dotenv').config();

export default {
    createToken,
    createRefreshToken,
    refreshToken
}

function createToken(user) {
    let expDate: Date = new Date();
    expDate.setDate(expDate.getDate() + 7);
    return [
        JWT.sign({
            name: user.name,
            email: user.email,
            iat: Date.now(),
            exp: expDate.getTime(),
        }, process.env.SECRET_TOKEN),
        expDate
    ]
}

function createRefreshToken(user) {
    let expDate: Date = new Date();
    expDate.setDate(expDate.getDate() + 15);
    return JWT.sign({
        email: user.email, 
        iat: Date.now(),
        exp: expDate.getTime(), 
    }, process.env.SECRET_REFRESH_TOKEN)
}

function refreshToken(req, res) {
    if (req.body.refresh_token && req.body.grant_type === 'refresh_token') {
        JWT.verify(req.body.refresh_token, process.env.SECRET_REFRESH_TOKEN, function(err, data) {
            if (err) {
                return res.status(400).send({
                    error: "TokenExpired"
                })
            }

            CertificationCenterModel.findOne({
                email: data.email,
                }, 
                (err, user) => {
                    if (err) return res.status(401).send({error: "TokenExpired"});

                    if (user) {
                        let dataToken = createToken(user);
                        res.status(200).send({
                            access_token: dataToken[0],
                            refresh_token: createRefreshToken(user),
                            expires_in: dataToken[1],
                            role: user.role
                        })
                    } else return res.status(401).send({error: "TokenExpired"});
                }
            )
        })
    } else return res.status(400).send({error: "BadRequest"});
}