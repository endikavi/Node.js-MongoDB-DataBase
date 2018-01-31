const express = require('express');
const app = express();
const UserCtrl = require('../controllers/userctrl');

app.route('/')
.get(UserCtrl.prueba)

module.exports = app ;

