const { Model, DataTypes, Sequelize } = require('sequelize');

const Patient_TABLE = 'patients';

class Patient extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: Patient_TABLE,
            modelName: 'Patient',
            timestamps: true
        }
    }
}

const PatientSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'firstName'
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'lastName'
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'email'
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'password'
    },
    phone: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'phone'
    },
    sexe: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'sexe'
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'address'
    },

    dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'dateOfBirth'
    }
}

module.exports = { Patient, PatientSchema };