const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');


// BLOCUL DE DESCRIERE 'AUTH MIDDLEWARE':
describe('auth middleware', () => {
    // TEST 1 - POPULAREA 'CERERI USER-ULUI' CU UN 'SWT VALID'
    it('should populate req.user with the payload of a valid JWT', () => {
        // CREARE OBIECT 'USER'
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };

        // GENERARE 'TOKEN' VALID:
        const token = new User(user).generateAuthToken();

        // CREAM OBIECTUL 'REQ':
        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        // OBIECTUL 'RAS' TRECUT CA ARGUMENT CATRE FUNC 'AUTH()'
        const res = {};

        // MEXT:
        const next = jest.fn();

        // APELAM 'AUTH()':
        auth(req, res, next);

        // ASTEMPAM CA 'USER-UL CERUT' SA 'SE POTRIVEASCA CU OBIECTUL USER'
        expect(req.user).toMatchObject(user);
    });
});