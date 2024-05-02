const express = require('express');
const router = express.Router(); 
const Controller = require('../controllers/healthcareProfessional.controller');

router
      .get('/:id', Controller.getById )
 

module.exports = router;
