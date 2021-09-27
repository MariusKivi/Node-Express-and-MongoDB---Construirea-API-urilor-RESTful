// IMPORTAM:
const { Utilizator } = require('../../../models/utilizator');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');


// 'UTILIZATOR.GENERARETOKENAUTENTIFICARE'
// BLOCUL 'DESCRIBE()' DE 'GRUPAREA  TESTELOR CONEXE SUIT':
describe('utilizator.generareTokenAutentificare', () => {

    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('ar trebui să returneze un JWT Valid', () => {

        // CREAM OBIECTUL 'PAYLOAD':
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            esteAdministrator: true
        };

        // CREARE OBIECT 'UTILIZATOR':
        const utilizator = new Utilizator(payload);

        // OBTINEM 'TOKEN' = APELAM FUNC. 'GENERARETOKENAUTENTIFICARE()'
        const token = utilizator.generareTokenAutentificare();

        // VALIDAM 'TOKEN'-UL
        const decodat = jwt.verify(token, config.get('cheiaPrivataJWT'));

        // ASTEPTAM CA OBICTUL 'DECODAT'
        // SA 'SE POTRIVESCA CU OBIECTUL PAYLOAD':
        expect(decodat).toMatchObject(payload);
    });
});