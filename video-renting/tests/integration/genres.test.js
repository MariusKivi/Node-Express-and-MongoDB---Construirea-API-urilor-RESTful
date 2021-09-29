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
        // TESTUL 1 
        it('should return all genres', async() => {

            // INSERAREA 'MAI MULTOR DOCUMENTE' IN 'MONGODB':
            // TRECEM O 'MATRICE DE OBIECTE':
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);

            // PRELUAREA 'GENURILOR'
            const res = await request(server).get('/api/genres');

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 200'
            expect(res.status).toBe(200);
            // ASTEPTAM CA 'LUNGIMEA' CORPULUI 'MATRICI' SA 'FIE 2':
            expect(res.body.length).toBe(2);
            // ASTEPTAM 'SA FIE ADEVARAT' 
            // CA 'UNUL' DINTRE 'ELEMENTE' SA 'FIE' = 'GENUL1':
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();

            // ASTEPTAM 'SA FIE ADEVARAT' 
            // CA 'UNUL' DINTRE 'ELEMENTE' SA 'FIE' = 'GENUL2':
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

        // TEST 1:
        it('should return 401 if client is not logged in', async() => {
            // APELAM FUNC. 'REQUEST(SERVRT)'
            // ADAUGAREA OBIECTULUI '' IN COLECTIA 'GENURI':
            const res = await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' });

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 401'
            expect(res.status).toBe(401);
        });


        // TEST 2:
        it('should return 400 if genre is less than 5 characters', async() => {

            // CREAM 'TOKEN'-UL
            // CREAM UN NOU OBIECT 'UTILIZATOR':
            const token = new User().generateAuthToken();

            // APELAM FUNC. 'REQUEST(SERVRT)'
            // ADAUGAREA OBIECTULUI '' IN COLECTIA 'GENURI':
            const res = await request(server)
                .post('/api/genres')
                // SETAM 'HEADER'
                .set('x-auth-token', token)
                .send({ name: '1234' });

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 400'
            expect(res.status).toBe(400);
        });


        // TEST 3:
        it('should return 400 if genre is more than 50 characters', async() => {

            // CREAM 'TOKEN'-UL
            // CREAM UN NOU OBIECT 'UTILIZATOR':
            const token = new User().generateAuthToken();

            //GENERARE MATRICE DE '52 ELEMENTE':
            name = new Array(52).join('a');


            // APELAM FUNC. 'REQUEST(SERVRT)'
            // ADAUGAREA OBIECTULUI '' IN COLECTIA 'GENURI':
            const res = await request(server)
                .post('/api/genres')
                // SETAM 'HEADER'
                .set('x-auth-token', token)
                .send({ name: name });

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 400'
            expect(res.status).toBe(400);
        });

    });
});