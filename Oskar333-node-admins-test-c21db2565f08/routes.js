const express = require ('express')
const app = express();
const adminCtrl = require('./controller');
const validationMiddleware = require('./middleware');
//Routes
app.route('/')
  .get(adminCtrl.getAllAdmins)
  .post(validationMiddleware, adminCtrl.newAdmin)

app.route('/:id')
  .put(adminCtrl.updateAdmin)
  .delete(adminCtrl.deleteAdmin)

module.exports = app;