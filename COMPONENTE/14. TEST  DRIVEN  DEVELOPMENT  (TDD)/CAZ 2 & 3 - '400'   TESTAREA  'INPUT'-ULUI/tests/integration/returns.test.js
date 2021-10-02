// IMPORTAM:
const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const mongoose = require('mongoose');



// SUITA DE TESTE '/API/RETURNS'
describe('/api/returns', () => {
    // DECLARAREA 'VARIABILELOR':
    let server;
    let customerId;
    let movieId;
    let rental;


    // INCARCAREA 'SERVER'-ULUI 
    beforeEach(async() => {
        // PORNIRE SERVER DIN 'INDEX.JS':
        server = require('../../index');


        // PRELUAREA UNUI 'OBJECTID' DIN 'MONGOOSE':
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();


        // CREAM OBIECTUL 'INCHIRIERE':
        rental = new Rental({
            // 'INITIALIZAREA' PROP. 'CLIENT':
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },

            // 'INITIALIZAREA' PROP. 'FILM':
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });

        // SALVAREA 'INCHIRIERI' IN 'DB':
        await rental.save();
    });


    afterEach(async() => {
        // 'INCHIDEREA' SERVERULUI: 
        await server.close();
        // STERGEREA 'INCHIRIERI':
        await Rental.remove({});
    });



    // ---------------------------------------------------------------------------------
    //(CAZ 1) RETURNARE '401' - DACA 'CLIENTUL' NU ESTE 'AUTENTIFICAT'
    it('should return 401 if client is not logged in', async() => {

        // CREAM UN NOU OBIECT 'USER'
        // GENERAM 'TOKEN DE AUTENTIFICARE': 
        const token = new User().generateAuthToken();

        // ADAUGAREA 'ID FILM' IN ''DB
        const res = await request(server)
            .post('/api/returns')
            // SETAM 'HEADER'-UL CERERII:
            .set('x-auth-token', token)
            .send({ movieId });

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 400':
        expect(res.status).toBe(400);
    });




    // ---------------------------------------------------------------------------------
    //(CAZ 2) RETURNARE '400' - DACA 'ID'-UL 'CLIENTULUI AUTENTIFICAT' NU ESTE 'FURNIZAT'
    it('should return 400 if customerId is not provided', async() => {

        // CREAM UN NOU OBIECT 'USER'
        // GENERAM 'TOKEN DE AUTENTIFICARE': 
        const token = new User().generateAuthToken();

        // ADAUGAREA 'ID FILM' IN ''DB
        const res = await request(server)
            .post('/api/returns')
            // SETAM 'HEADER'-UL CERERII:
            .set('x-auth-token', token)
            .send({ movieId });

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 400':
        expect(res.status).toBe(400);
    });




    // ---------------------------------------------------------------------------------
    //(CAZ 3) RETURNARE '400' - DACA 'ID'-UL 'FILMULUI' NU ESTE 'FURNIZAT'
    it('should return 400 if movieId is not provided', async() => {

        // ADAUGAREA 'ID'-URI 'CLIENT' SI 'FILM' IN ''DB
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId });

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 401':
        expect(res.status).toBe(400);
    });
});