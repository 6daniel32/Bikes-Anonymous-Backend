const router = require("express").Router();
const auth = require('./middlewares/auth');
const tokenService = require('./services/tokenService');
import userControler from './controllers/userControler'

router.post('/signup', userControler.signUpUser);

router.post('/login', userControler.login);

router.get('/', (req, res) => {return res.send('holiwis c:')});

router.post('/authenticatedRoute', auth.authUser, (req, res) => {return res.send('holiwis c:')});

module.exports=router;