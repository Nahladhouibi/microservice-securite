const express = require('express');
const router = express.Router(); 
const patientController = require('../controllers/patient.controller');
const authValidation = require('../middleware/auth');

router .get('/getCoonectedPatientDetails',authValidation,patientController.getCoonectedPatientDetails)
router .get('/getAllPatient', patientController.get )  
    router .get('/:id', patientController.getById )

    router   .post('/', patientController.createUser )
    router .put('/:id', patientController.update )
    router .delete('/:id', patientController._delete ); 

module.exports = router;
