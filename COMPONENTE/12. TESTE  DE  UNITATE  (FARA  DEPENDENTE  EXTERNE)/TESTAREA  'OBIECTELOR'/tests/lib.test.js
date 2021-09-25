// IMPORTAM MODULUL 'LIB.JS'
const lib = require('../lib')



// (1) TESTAREA  'NUMERELOR'
// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(ABSOLUT)':
describe('absolut', () => {

    // CAZUL 1: PT. 'INPUT  POZITIV & POZITIV' (1=1)
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze un număr pozitiv dacă intrarea este pozitivă', () => {
        // APELAREA FUNC. 'ABSOLUTE':
        const rezultat = lib.absolut(1);

        // VERIFICAM DACA 'NR' ESTE 'CORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe(1);
    });




    // CAZUL 2: PT. 'INPUT  NEGATIV & POZITIVV'  (-1=1)
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze un număr pozitiv dacă intrarea este negativă', () => {
        // APELAREA FUNC. 'ABSOLUTE':
        const rezultat = lib.absolut(-1);

        // VERIFICAM DACA 'NR' ESTE 'INCORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe(1);
    });




    // CAZUL 3: PT. 'INPUT  ZERO & ZERO' (0=0)
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze 0 dacă intrarea este 0', () => {
        // APELAREA FUNC. 'ABSOLUTE':
        const rezultat = lib.absolut(0);

        // VERIFICAM DACA 'NR' ESTE 'CORECT' CEL 'ASTEPTAT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe(0);
    });
});





// (2) TESTAREA  'SIRURILOR':
// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(SALUT)':
describe('salut', () => {

    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
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





// (3) TESTAREA  'MATRICILOR'
// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(OBTINEREVALUTA)':
describe('obtinereValuta', () => {

    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze valute acceptate', () => {

        // APELAREA FUNC. 'OBTINEREVALUTA()':
        const rezultat = lib.obtinereValuta();

        // (1) 'CALEA' FORTE 'GENERAL':   
        // FUNC. DE POTRIVIRE 'TOBEDEFINED()'       
        expect(rezultat).toBeDefined();
        // FUNC. DE POTRIVIRE 'NOT.TOBENULL()'           
        expect(rezultat).not.toBeNull();


        // (2) 'CALEA' FORTE 'SPECIFICE': 
        // FUNC. DE POTRIVIRE 'TOBE()'           
        expect(rezultat[0]).toBe('USD');
        expect(rezultat[1]).toBe('LEI');
        expect(rezultat[2]).toBe('EURO');
        expect(rezultat.length).toBe(3);

        // (3) 'CALEA' MAI 'OPTIMA' 
        // ESTE SA 'VERIFICAM EXISTENTA' UNUI 'ANUMIT ELEMENT' IN 'MATRICE':
        expect(rezultat).toContain('USD');
        expect(rezultat).toContain('LEI');
        expect(rezultat).toContain('EURO');


        // (4) 'CALEA' - 'IDEALA' 
        expect(rezultat).toEqual(expect.arrayContaining(['LEI', 'EURO', 'USD']));

    });
});





// (4) TESTAREA  'OBIECTELOR':
// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(OBTINEPRODUS)':
describe('obtineProdus', () => {
    // TEST 1:
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze produsul cu id-ul dat', () => {

        // APELAREA FUNC. 'OBTINEPRODUS()':
        const rezultat = lib.obtineProdus(1);

        // 'ASTEPTAM' CA 'REZUTATUL' SA 'FIE EGALA' CU UN 'OBIECT':   
        // FUNC. DE POTRIVIRE 'TOBE()'       
        // expect(rezultat).toBe({ id: 1, pret: 10 });

        // (1) FUNC. DE POTRIVIRE 'TOEQUAL()'       
        // expect(rezultat).toEqual({ id: 1, pret: 10 });

        // (2) FUNC. DE POTRIVIRE 'TOMATCHOBJSECL()'       
        expect(rezultat).toMatchObject({ id: 1, pret: 10 });

        // (3) FUNC. DE POTRIVIRE 'TOHAVEPROPERTY('CHEIE', VALOARE)'       
        expect(rezultat).toHaveProperty('id', 1);
    });
});