const router = require("express").Router();
const auth = require('./middlewares/auth');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

import userControler from './controllers/userControler';
import csvProcessingController from './controllers/csvProcessingController';

router.post('/signup', userControler.signUpUser);

router.post('/login', userControler.login);

router.post('/readCSVFile', auth.authUser, upload.single('csvFile'), csvProcessingController.processCSV);

module.exports = router;