const express = require('express'); 

 const patientRouter = require('./patient.route');
const authRouter = require('./auth.route');
const healthcareProfessionalRoute = require('./healthcareProfessional.route');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router); 
  router.use('/patient', patientRouter);
  router.use('/healthcareProfessional', healthcareProfessionalRoute);
  router.use('/auth', authRouter);
}

module.exports = routerApi;