const { models } = require('../config/sequelize');

class HealthcareProfessionalService { 
  
    constructor() {}

    async find() {
      const res = await models.HealthcareProfessional.findAll();
      return res;
    }

    async findOne(id) {
      const res = await models.HealthcareProfessional.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.HealthcareProfessional.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    } 

    async findByEmail(email) {
      const res = await models.HealthcareProfessional.findOne({ where: { email } });
      return res;
    }
  
  }
  
  module.exports = HealthcareProfessionalService;