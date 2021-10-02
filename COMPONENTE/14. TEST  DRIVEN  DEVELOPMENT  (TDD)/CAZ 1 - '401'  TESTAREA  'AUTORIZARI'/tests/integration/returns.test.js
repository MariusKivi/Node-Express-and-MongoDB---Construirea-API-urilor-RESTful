// IMPORTAM:
const request = require('supertest');
const { Rental } = require('../../models/rental');
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

        // ADAUGAREA 'ID'-URI 'CLIENT' SI 'FILM' IN ''DB
        : const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId });

        // ASTEPTAM CA 'STATUSUL RASP.' SA 'FIE 401':
        expect(res.status).toBe(401);
    });
});