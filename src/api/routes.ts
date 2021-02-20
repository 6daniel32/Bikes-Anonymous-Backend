const router = require("express").Router();
const auth = require('./middlewares/auth');
const tokenService = require('./services/tokenService');

import userControler from './controllers/userControler';
import csvProcessingController from './controllers/csvProcessingController';

router.post('/signup', userControler.signUpUser);

router.post('/login', userControler.login);

router.post('/readCSVFile', auth.authUser, csvProcessingController.processCSV);

module.exports=router;