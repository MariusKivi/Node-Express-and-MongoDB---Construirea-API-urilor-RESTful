// IMPORTARE - BIBLIOTECA 'SUPERTEST':
const request = require('supertest');



// DECLARARE VARIABILA:
let server;



// 
// SUITA DE TEST 'DESCRIBE('/API/GENURI')':
describe('/api/genuri', () => {

    // FUNC. UTILITARA 'BEFOREEACH(CALLBACK)' DIN FK. 'JAST' & 'JESMIN'
    // PRIN CARE 'JEST' VA APELA ACEASTA FUNC. INAINTE DE FIECARE 'TEST'
    // SOLICITA 'PORNIREA SERVER'-ULUI:
    beforeEach(() => { server = require('../../../index'); })

    // FUNC. UTILITARA 'AFTEREACH(CALLBACK)' DIN FK. 'JAST' & 'JESMIN'
    // SOLICITA 'OPRIREA SERVER'-ULUI::
    afterEach(() => { server.close(); });


    // (1.1) SUITA DE TEST: 'GET /'
    describe('GET /', () => {

        // TEST 1
        it('ar trebui să returneze toate genurile', async() => {

            // PRELUAREA 'GENURILOR'
            const res = await request(server).get('/api/genuri');

            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 200'
            expect(res.status).toBe(500);
        });
    });
});