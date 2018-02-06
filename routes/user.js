const express = require('express');
const UserCtrl = require('../controllers/userctrl')
const bodyParser = require('body-parser');
const route = express.Router();
// body parser //
route.use (bodyParser.json())
route.use (bodyParser.urlencoded({extended: false}))

// route to obtain all users //
route.get('/',UserCtrl.getAllUsers);

// route to add user //
route.post('/',UserCtrl.addUser);

// route to delete user //
route.delete('/:_id',UserCtrl.deleteUser);

// route to update user //
route.put('/:_id',UserCtrl.updateUser);

// route to find users //
route.get('/:_id',UserCtrl.searchUser);

// route to add an array of users //
route.post('/many',UserCtrl.addManyUsers);

module.exports = route;
