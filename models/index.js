const { HealthcareProfessional, HealthcareProfessionalSchema } = require('./healthcareProfessional.model');
const { Patient, PatientSchema } = require('./patient.model');

function setupModels(sequelize) {
    HealthcareProfessional.init(HealthcareProfessionalSchema, HealthcareProfessional.config(sequelize));
    Patient.init(PatientSchema, Patient.config(sequelize));
}

module.exports = setupModels;