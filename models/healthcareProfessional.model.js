const { Model, DataTypes, Sequelize } = require('sequelize');

const HEALTH_CARE_TABLE = 'healthcareProfessionals';

class HealthcareProfessional extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: HEALTH_CARE_TABLE,
            modelName: 'HealthcareProfessional',
            timestamps: true
        }
    }
} 

const HealthcareProfessionalSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'firstName'
    },
    lastName:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'lastName'
    },
    email:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'email'
    },
    password:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'password'
    },
    phone:{
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'phone'
    },   
    grade:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'grade'
    },
}
  
module.exports = { HealthcareProfessional, HealthcareProfessionalSchema };