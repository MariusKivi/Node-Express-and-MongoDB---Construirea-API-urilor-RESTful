// IMPORTAM MODULUL 'LIB.JS'
const lib = require('../lib')



// (1) TESTAREA  NUMERELOR
// FUNC. 'DESCRIBE(ABSOLUT)' PT. 'GRUPAREA  TESTELOR CONEXE':
describe('absolut', () => {

    // CAZUL 1: PT. 'INPUT  POZITIV & POZITIV' (1=1)
    // TESTAREA 'NUMERELOR'  FUNC. 'ABSOLUT'
    // APELAM FUNC. 'TEST('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze un număr pozitiv dacă intrarea este pozitivă', () => {
        // APELAREA FUNC. 'ABSOLUTE':
        const rezultat = lib.absolut(1);

        // VERIFICAM DACA 'NR' ESTE 'CORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe(1);
    });




    // CAZUL 2: PT. 'INPUT  NEGATIV & POZITIVV'  (-1=1)
    // TESTAREA 'NUMERELOR'  FUNC. 'ABSOLUT'
    // APELAM FUNC. 'TEST('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze un număr pozitiv dacă intrarea este negativă', () => {
        // APELAREA FUNC. 'ABSOLUTE':
        const rezultat = lib.absolut(-1);

        // VERIFICAM DACA 'NR' ESTE 'INCORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe(1);
    });




    // CAZUL 3: PT. 'INPUT  ZERO & ZERO' (0=0)
    // TESTAREA 'NUMERELOR'  FUNC. 'ABSOLUT'
    // APELAM FUNC. 'TEST('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze 0 dacă intrarea este 0', () => {
        // APELAREA FUNC. 'ABSOLUTE':
        const rezultat = lib.absolut(0);

        // VERIFICAM DACA 'NR' ESTE 'CORECT' CEL 'ASTEPTAT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe(0);
    });
});





// (2) TESTAREA  SIRURILOR
// FUNC. 'DESCRIBE(SALUT)' PT. 'GRUPAREA  TESTELOR CONEXE':
describe('salut', () => {

    // TESTAREA 'SIRURILOR'  FUNC. 'ABSOLUT'
    // APELAM FUNC. 'TEST('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze mesajul de salut', () => {

        // APELAREA FUNC. 'SALUT()':
        const rezultat = lib.salut('Marius');

        // PRELUAM 'RESULTATUL'
        // APELAM FUNC. UTILITARA 'EXPECT()' 
        //  & FUNC. DE POTRIVIRE 'TOBE()' 
        expect(rezultat).toMatch(/Marius/);

        // UTILIZAREA POTRIVIRII MET. '.TOCONTAIN()':
        expect(rezultat).toContain('Marius');

    });
});