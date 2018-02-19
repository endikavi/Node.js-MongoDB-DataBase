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

route.get('/',session(sess) ,accountCtrl.renderDashboard);

module.exports = route;