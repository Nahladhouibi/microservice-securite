const { models } = require('../config/sequelize');



class PatientService { 
  
    constructor() {}

    async find() {
      const res = await models.Patient.findAll();
      return res;
    }

    async findOne(id) {
      console.log(id);
      const res = await models.Patient.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.Patient.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.Patient.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    } 

    async findByEmail(email) {
      const res = await models.Patient.findOne({ where: { email } });
      return res;
    }
  
  }
  
  
module.exports =  PatientService;