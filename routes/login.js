const express = require('express');
const route = express.Router();
const accountCtrl = require('../controllers/accountctrl')
const bodyParser = require('body-parser');
const session = require('express-session');
const uid = require('uid-safe')
const sess = {
    secret: 'keyboard cat'
}
route.use (bodyParser.json())
route.use (bodyParser.urlencoded({extended: false}))


route.get('/login', accountCtrl.renderLogin);

route.get('/register', accountCtrl.renderRegister);

route.post('/login', session(sess), accountCtrl.accountLogin);

route.post('/register', accountCtrl.accountRegister);

module.exports = route;