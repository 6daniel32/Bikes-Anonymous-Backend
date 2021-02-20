const bcrypt = require('bcrypt');
import { Document } from 'mongoose';
import IUser from '../models/Users/userInterface';
import CertificationCenterModel from '../models/Users/certificationCenter';
import tokenService from '../services/tokenService';

export default {
    signUpUser,
    login
}

async function signUpUser(req, res) {
    await bcrypt.hash(req.body.password, 2, async (err, hash) => {
        const user = new CertificationCenterModel({
            email: req.body.email,
            password: hash,
            name: req.body.name
        }); 
        try {
            await user.save();
        } catch {
            res.status(400).send(err);
            return;
        }
        const accesToken = tokenService.createToken(user);
        const refreshToken = tokenService.createRefreshToken(user);
        res.status(201).send({
            "accesToken": accesToken[0], 
            "refreshToken": refreshToken, 
            "expires_in": accesToken[1], 
        });
    });
    return;
}

async function login(req, res) {
    const user = await CertificationCenterModel.findOne({email: req.body.email});
    try {
        bcrypt.compare(req.body.password, user.password, function(err, success){
            if(success){
                let accesToken = tokenService.createToken(user);
                let refreshToken = tokenService.createRefreshToken(user);
                res.status(200).send({
                    "accesToken": accesToken[0], 
                    "refreshToken": refreshToken, 
                    "expires_in": accesToken[1]
                }); 
                return;
            } else{
                res.status(400).send("Bad password");
                return;
            }
        });
    } catch {
        return res.status(400).send('User does not exist');
    }
}