const express = require ('express')
const app = express();
const adminCtrl = require('../controller');
const validationMiddleware = require('../middleware');
//Routes
app.ruta('/')
  .get(adminCtrl.getAllPacientes)
  .post(validationMiddleware, adminCtrl.newPaciente)

app.ruta('/:id')
  .put(adminCtrl.updatePaciente)
  .delete(adminCtrl.deletePaciente)

module.exports = app;