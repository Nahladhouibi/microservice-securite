// Importez vos modules et dépendances ici
const { registerPatient } = require('../controllers/auth.controller');
const PatientServiceMock = require('../services/patient.service');

// Vérifiez si le module PatientServiceMock est défini (Supprimez cette vérification car elle n'est pas nécessaire)

// Mockez le module PatientService avec PatientServiceMock
jest.mock('../services/patient.service');

describe('Authentication Controller', () => {
  describe('registerPatient', () => {
    test('should register a patient successfully', async () => {
      const req = {
        body: {
          // Données pour enregistrer un patient
          firstName: 'John',
          lastName: 'Doe',
          phone: '123456789',
          role: 'patient',
          email: 'john.doe@example.com',
          sexe: 'male',
          address: '123 Street',
          dateOfBirth: '1990-01-01',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mockez le comportement des méthodes findByEmail et create de PatientService
      PatientServiceMock.findByEmail.mockResolvedValue(null);
      PatientServiceMock.create.mockResolvedValue({
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      });

      // Appelez la fonction registerPatient
      await registerPatient(req, res);

      // Assertions
      expect(PatientServiceMock.findByEmail).toHaveBeenCalledWith('john.doe@example.com');
      expect(PatientServiceMock.create).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        role: 'patient',
        email: 'john.doe@example.com',
        sexe: 'male',
        address: '123 Street',
        dateOfBirth: '1990-01-01',
        password: 'password123'
      });

      // Autres assertions au besoin
    });
  });
});
