// IMP. BIBLIOTECA 'SUPERTEST':
const request = require('supertest');
// IMP. MODEL 'GEN/JS'
const { Gen } = require('../../../models/gen');



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
    afterEach(async() => {
        // SOLICITA 'OPRIREA SERVER'-ULUI::
        server.close();

        // STERGEREA 'TUTUROR GENURILOR' DIN COLECTIA 'GENURI':
        await Gen.remove({});
    });


    // (1.1) SUITA DE TEST: 'GET /'
    describe('GET /', () => {

        // TEST 1
        it('ar trebui să returneze toate genurile', async() => {

            // MATRICEA DE OBIECTE 'GENURI':
            // ADAUGAREA MAI MULTOR 'DOCUMENTE' IN 'MONGODB'
            // PRIN MET. 'INSERTMANY()':
            await Gen.collection.insertMany([
                { nume: 'genul1' },
                { nume: 'genul2' },
            ]);




            // PRELUAREA 'GENURILOR'
            const res = await request(server).get('/api/genuri');



            // ASTEPTAM CA 'STATUS'-UL SA 'FIE 200'
            expect(res.status).toBe(200);
            // ASTEPTAM CA 'LUNGIMEA' CORPULUI 'MATRICI' SA 'FIE 2':
            expect(res.body.length).toBe(2);

            // ASTEPTAM 'SA FIE ADEVARAT' 
            // CA 'UNUL' DINTRE 'ELEMENTE' SA 'FIE' = 'GENUL1':
            expect(res.body.some(g => g.nume === 'genul1')).toBeTruthy();

            // ASTEPTAM 'SA FIE ADEVARAT' 
            // CA 'UNUL' DINTRE 'ELEMENTE' SA 'FIE' = 'GENUL2':
            expect(res.body.some(g => g.nume === 'genul2')).toBeTruthy();

        });
    });
});