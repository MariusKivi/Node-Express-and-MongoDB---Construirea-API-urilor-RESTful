const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
const request = require('supertest');


// SUITA DE TESTE PT. AUTORIZARE 'AUTH.MIDDLEWARE':
describe('auth middleware', () => {

    // REFABRICAREA TESTELOR:
    // INAINTEA FIECARUI TEST:
    // PORNIRE 'SERVER' DIN 'INDEX.JS':
    beforeEach(() => { server = require('../../index'); })
    afterEach(async() => {
        await Genre.remove({});
        await server.close();
    });


    // DECLARARE VARIABILE:
    let token;


    // FUNC. 'EXEC()'
    const exec = () => {
        // APELAM FUNC. 'REQUEST(SERVRT)'
        // ADAUGAREA OBIECTULUI '' IN COLECTIA 'GENURI':  
        return request(server)
            .post('/api/genres')
            // SETAM 'HEADER'
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }


    // INAINTE DE FIECARE TEST    
    beforeEach(() => {
        // GENERAM 'TOKEN':
        token = new User().generateAuthToken();
    });



    // TEST 1 - 401 (DACA NU ESTE FURNIZAT UN 'TOKEN')
    it('should return 401 if no token is provided', async() => {
        // RESETARE 'SIR GOG': 
        token = '';

        // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASPUNSULUI' AS 'FIE 401':
        expect(res.status).toBe(401);
    });



    // TEST 2 - 400 (DACA 'TOKEN'-UL  ESTE 'INVALID')
    it('should return 400 if token is invalid', async() => {
        // RESETARE TOKEN INVALID 
        token = 'a';

        // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASPUNSULUI' AS 'FIE 400':
        expect(res.status).toBe(400);
    });


    // TEST 3 - 200 (DACA 'TOKEN'-UL  ESTE 'VALID')
    it('should return 200 if token is valid', async() => {

        // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
        const res = await exec();

        // ASTEPTAM CA 'STATUSUL RASPUNSULUI' AS 'FIE 200':
        expect(res.status).toBe(200);
    });
});