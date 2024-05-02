const PatientService = require('../services/patient.service');
const service = new PatientService();

const createUser  = async ( req, res ) => {
    try { 
        const { firstName,lastName, phone,role,email, password } = req.body;
        // Check if the email exists
        const userExists = await service.findByEmail(email)
        if (userExists) {
            return res.status(400).send('Email is already associated with an account');
        }


        await db.User.create({
            firstName,lastName, phone,role,email,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(200).send('Registration successful');
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        const responseData = response.map(user => {
            const {id, firstName, lastName, email, phone,  createdAt } = user.dataValues;
            return {id, firstName, lastName, email, phone, createdAt };
        });

        // Send back the new array of objects in the response
        res.json(responseData);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
const getCoonectedPatientDetails = async ( req, res ) => {
    try {

         console.log("reqqqqqqqqqqqqq");
 
        const response = await service.findOne(req.payload.id);
         console.log(response);
         console.log(response.dataValues);
            const {  firstName, lastName, email, phone,  createdAt,address,dateOfBirth,sexe } = response.dataValues;
            responseData= {  firstName, lastName, email, phone,  createdAt,address,dateOfBirth,sexe };
        

        // Send back the new array of objects in the response
        res.json(responseData);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
         console.log(response);
         console.log(response.dataValues);
            const {  firstName, lastName, email, phone,  createdAt,address,dateOfBirth,sexe } = response.dataValues;
            responseData= {  firstName, lastName, email, phone,  createdAt,address,dateOfBirth,sexe };
        

        // Send back the new array of objects in the response
        res.json(responseData);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    createUser, get, getById, update, _delete,getCoonectedPatientDetails
};
