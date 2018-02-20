const express = require('express');
const route = express.Router();
const loginCtrl = require('../controllers/loginctrl')

route.get('/', loginCtrl.renderLogin);

module.exports = route;