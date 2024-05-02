const express = require('express');
const router = express.Router(); 
const authController = require('../controllers/auth.controller');

router
    
.post('/patient/register', authController.registerPatient )
    .post('/patient/login', authController.signInPatient)
    .post('/healthcareProfessional/register', authController.registerHealthcareProfessional )
    .post('/healthcareProfessional/login', authController.signInHealthcareProfessional)
     

module.exports = router;
