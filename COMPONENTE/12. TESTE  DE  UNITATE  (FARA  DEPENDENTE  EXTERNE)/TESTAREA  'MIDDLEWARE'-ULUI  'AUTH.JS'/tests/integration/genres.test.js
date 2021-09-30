// IMPORTURI/INCARCARI
const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');


// DECLARAREA vARIABILEI
let server;



// SUITA DE TESTE 'GENURI':
describe('/api/genres', () => {
    // INCARCAREA 'SERVER'-ULUI 
    beforeEach(() => { server = require('../../index'); })
    afterEach(async() => {
        // INCHIDEREA SERVERULUI: 
        server.close();
        // STERGEREA GENULUI
        await Genre.remove({});
    });



    // (1.1) PRELUAREA 'TUTUROR GENURILOR':
    describe('GET /', () => {
        // TEST 1
        it('should return all genres', async() => {
            // MATRICEA DE OBIECTE:
            const genres = [
                { name: 'genre1' },
                { name: 'genre2' },
            ];

            // INSERAREA MAI MULTOR DOCUMENTE IN DB:
            await Genre.collection.insertMany(genres);

            // PRELUARE GENURI:
            const res = await request(server).get('/api/genres');

            // ASTEPTARI:
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });




    // (1.2) SUITA DE TEST: 'GET /:ID'
    describe('GET /:id', () => {

        // TEST 1
        it('should return a genre if valid id is passed', async() => {

            // CREAM UN 'NOU GEN':  
            const genre = new Genre({ name: 'genre1' });
            // SALVAM GENUL:  
            await genre.save();

            // RASPUNSUL = APELAREA SERVERULUI & PRELUAREA 'ID'-ULUI:
            const res = await request(server).get('/api/genres/' + genre._id);

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 200'
            expect(res.status).toBe(200);
            // ASTEPTAM CA 'CORPUL RASPUNSULUI' - 'SA AIBA PROP. NUME'
            expect(res.body).toHaveProperty('name', genre.name);
        });


        // TEST 2
        it('should return 404 if invalid id is passed', async() => {

            // RASPUNSUL = APELAREA SERVERULUI & PRELUAREA 'ID'-ULUI INVALID:
            const res = await request(server).get('/api/genres/1');

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 404'
            expect(res.status).toBe(404);
        });

    });





    // (2) SUITA DE TEST: 'POST /'
    describe('POST /', () => {

        // REFABRICAREA TESTELOR:
        // DECLARARE VARIABILE:
        let token;
        let name;


        // FUNC. 'EXEC()'
        const exec = async() => {

            // APELAM FUNC. 'REQUEST(SERVRT)'
            // ADAUGAREA OBIECTULUI '' IN COLECTIA 'GENURI':
            return await request(server)
                .post('/api/genres')
                // SETAM 'HEADER'
                .set('x-auth-token', token)
                .send({ name });
        }


        // INAINTEA FIECARUI TEST:
        beforeEach(() => {
            // SETAREA 'TOKEN'-ULUI CATE UN 'JWT VALID' INAINTEA FIECARUI 'TEST'
            token = new User().generateAuthToken();
            name = 'genre1';
        })


        // TEST 1:
        it('should return 401 if client is not logged in', async() => {

            // SIMULAM SCENARIUL IN CARE 'CLIENTUL NU ESTE AUTENTIFICAT'
            // SETAREA 'TOKEN'-ULUI CA 'STRING GOL'
            token = '';

            // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
            const res = await exec();

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 401'
            expect(res.status).toBe(401);
        });


        // TEST 2:
        it('should return 400 if genre is less than 5 characters', async() => {

            // SETAM 'NUMELE':
            name = '1234';

            // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
            const res = await exec();

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 400'
            expect(res.status).toBe(400);
        });


        // TEST 3:
        it('should return 400 if genre is more than 50 characters', async() => {

            //GENERARE MATRICE DE '52 ELEMENTE':
            name = new Array(52).join('a');

            // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
            const res = await exec();

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 400'
            expect(res.status).toBe(400);
        });


        // TEST 4:
        it('should save the genre if it is valid', async() => {

            // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
            await exec();

            // INTEROGAREA 'DB' PRIN MODELUL 'GENURI'
            const genre = await Genre.find({ name: 'genre1' });

            // ASTEPTAM CA 'GENUL' SA 'NU FIE NUL'
            expect(genre).not.toBeNull();
        });


        // TEST 5:
        it('should return the genre if it is valid', async() => {

            // APELAM FUNC. 'REQUEST(SERVRT)'
            // APELAREA FUNC. 'EXEC()' PT. REFABRICAREA TESTELOR
            const res = await exec();

            // ASTEPTAM CA IN 'CORPUL RASP.' SA 'AVEM PROP.'
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });

    });
});