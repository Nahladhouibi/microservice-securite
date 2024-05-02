const PatientService = require('../services/patient.service');
 const service = new PatientService();
 const { models } = require('../config/sequelize');
 const bcrypt=require('bcrypt')
 const HealthcareProfessionalService=require('../services/healthcareProfessional.service')
const serviceH=new HealthcareProfessionalService()
const jwt = require('jsonwebtoken');

const registerPatient  = async ( req, res ) => {
    try { 
      console.log(req.body);
        // Check if the email exists
        const patientExists = await service.findByEmail(req.body.email)
        if (patientExists) {
            return res.status(400).send('Email is already associated with an account');
        }
        console.log(req.body);

        const {firstName,lastName, phone,role,email,sexe,address ,dateOfBirth,password}=req.body
        console.log(firstName);
        await models.Patient.create({
            firstName,lastName, phone,role,email,sexe,address ,dateOfBirth,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(200).json('Registration successful');
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
const signInPatient = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const patient = await service.findByEmail(email)
      
        if (!patient) {
            return res.status(404).json('Email not found');
        }

 
        // Verify password
        const passwordValid = await bcrypt.compare(password, patient.dataValues.password);
        console.log(passwordValid);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }
 

        // Authenticate user with jwt
        const token = jwt.sign({ 
            id: patient.dataValues.id,
            name: patient.dataValues.firstName + " " +patient.dataValues.lastName,
            role:'patient'
        }, process.env.JWT_SECRET, { 
            expiresIn: "7d"
        });
        console.log(token);
   
        res.status(200).send({
            accessToken: token,
            role:'patient'
        });
    } catch (err) {
        return res.status(500).send('Sign in error');
    }
}

const signInHealthcareProfessional = async (req, res) => {
    try {
        const { email, password } = req.body;
        const healthcareProfessional = await serviceH.findByEmail(email)
        if (!healthcareProfessional) {
            return res.status(404).json('Email not found');
        }


        // Verify password
        const passwordValid = await bcrypt.compare(password, healthcareProfessional.dataValues.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }
        console.log(passwordValid);


        // Authenticate user with jwt
        const token = jwt.sign({ 
            id: healthcareProfessional.dataValues.id,
            name: healthcareProfessional.dataValues.firstName + " " +healthcareProfessional.dataValues.lastName,
            role:'healthcareProfessional'
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        console.log(token);
   
        res.status(200).send({
            accessToken: token,
            role:'healthcareProfessional'
        });
    } catch (err) {
        return res.status(500).send('Sign in error');
    }
}

const registerHealthcareProfessional  = async ( req, res ) => {
    try { 
      
        // Check if the email exists
        const healthcareProfessional = await serviceH.findByEmail(req.body.email)
        if (healthcareProfessional) {
            return res.status(400).send('Email is already associated with an account');
        }
        const { firstName,lastName, phone,role,email,grade,password}=req.body

        await serviceH.create({
            firstName,lastName, phone,role,email,grade,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(200).json('Registration successful');
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
module.exports = {
    registerPatient,
    signInPatient,
    signInHealthcareProfessional,
    registerHealthcareProfessional
};
