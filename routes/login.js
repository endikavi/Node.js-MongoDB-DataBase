const express = require('express');
const route = express.Router();
const accountCtrl = require('../controllers/accountctrl')
const bodyParser = require('body-parser');
route.use (bodyParser.json())
route.use (bodyParser.urlencoded({extended: false}))

route.get('/', accountCtrl.renderLogin);

route.get('/register', accountCtrl.renderRegister);

route.post('/', accountCtrl.accountLogin);

route.post('/register', accountCtrl.accountRegister);

module.exports = route;