
const HealthcareProfessional=require('../services/healthcareProfessional.service.js')

const service = new HealthcareProfessional();




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
        return res.status(200).json('Registration successful');
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(parseInt(id));
        console.log(response);
        const { firstName, lastName ,email,phone} = response;

        // Sending back the extracted fields
        res.json({ firstName, lastName,email,phone });
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
    createUser, get, getById, update, _delete
};
