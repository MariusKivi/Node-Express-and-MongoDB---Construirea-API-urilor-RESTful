// IMPORTAM:
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
        server.close();
        // STERGEREA 'INCHIRIERI':
        await Rental.remove({});
    });



    // TEST 0: 
    it('should work!', async() => {
        // 'CAUTARE INCHIRIERI IN DB'
        const result = await Rental.findById(rental._id);

        // ASTEPTAM CA 'REZULTATUL' SA 'NU FIE NUL'
        exports(result).not.toBeNull();
    });
});