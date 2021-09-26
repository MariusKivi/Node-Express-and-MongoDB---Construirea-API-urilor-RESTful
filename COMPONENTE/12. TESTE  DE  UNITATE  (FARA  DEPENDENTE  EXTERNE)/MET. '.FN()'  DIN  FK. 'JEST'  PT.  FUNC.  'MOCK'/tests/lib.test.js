// IMPORTAM FISIERUL 'LIB.JS'
const lib = require('../lib')

//  IMPORTAM FISIERUL 'DB.JS':
const db = require('../db');

//  IMPORTAM FISIERUL 'MAIL.JS':
const mail = require('../mail');



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





// (5) TESTAREA  'EXCEPTIILOR':
// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(INREGISTRAREUTILIZATOR)':
describe('inregistrareUtilizator', () => {

    // TEST 1:
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să arunce o exceptie, dacă numele de utilizator este fals', () => {

        // ABORDAREA 1:  ' TREBUIE REPETATA PT TOATE ARGUMENTELE TESTATE'
        // 'ASTEPTAM' CA 'FUNC. CALLBACK' SA 'ARUNCE' PRIN FUNC. 'TOTHROW()':   
        // FUNC. CALLBACK 'INREGISTRAREUTILIZATOR(NULL)':
        expect(() => { lib.inregistrareUtilizator(null) }).toThrow();


        // ABORDAREA 2:
        // DEF. 'MATRICEA' DE 'ARGUMENTE' 
        // CU TOATE ARGUMENTELE PE CARE DORIM SA LE TESTAM:
        const argumente = [null, undefined, NaN, '', 0, false];

        // BUCLA 'FOREACH':
        argumente.forEach(arg => {

            // 'ASTEPTAM' CA 'FUNC. CALLBACK' SA 'ARUNCE' PRIN FUNC. 'TOTHROW()':   
            // FUNC. CALLBACK 'INREGISTRAREUTILIZATOR(NULL)':
            expect(() => { lib.inregistrareUtilizator(arg) }).toThrow();
        });
    });


    // TEST 2:
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze un obiect utilizator dacă este trecut un nume de utilizator valid', () => {

        // APELAREA FUNC. 'INREGISTRAREUTILIZATOR()':
        const rezultat = lib.inregistrareUtilizator('Marius');

        // 'ASTEPTAM' CA 'REZUTATUL' SA 'POTRIVEASCA OBIECTUL' CU UN 'OBIECT':   
        // FUNC. DE POTRIVIRE 'TOBMATCHOBJECT()' & 'TOBEGREATER()'      
        expect(rezultat).toMatchObject({ nume_uilizator: 'Marius' });
        expect(rezultat.id).toBeGreaterThan(0);

    });
});





// (6) TESTAREA  'FUNC. 'FAKE'/'MOCK':
// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(APLICADISCOUNT)':
describe('aplicaDiscount', () => {

    // TEST 1:
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să aplice 10% reducere, dacă clientul are mai mult de 10 puncte', () => {

        // FUNC. 'FAKE'/'MOCK'
        // PRIN SETAREA FUNC. 'OBTINECLIENTSYNC'
        // CATRE O 'NNOUA FUNCTIE' CARE 'NU VORBESTE' CU O 'BAZA DE DATE':
        db.obtineClientSync = function(idClient) {

            // AFISARE:
            console.log('Client fals citit...');

            // RETURNARE OBIECT CU '2 PROPS':
            return { id: idClient, puncte: 20 }
        }


        // CREAM  OBIECTUL 'COMANDA':
        const comanda = { idClient: 1, pretTotal: 10 };

        // APELAREA FUNC. 'APLICADISCOUNT({OBIECT_COMANDA})':
        lib.aplicaDiscount(comanda);

        // 'ASTEPTAM' CA 'REZUTATUL' SA 'FIE':   
        // FUNC. DE POTRIVIRE 'TOBE()'       
        expect(comanda.pretTotal).toBe(9);
    });
});





// (7) TESTAREA  'FUNC. 'FAKE'/'MOCK' - INTERACTIUNEA DINTRE '2 OBIECTE':
// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(NOTIFICACLIENT)':
describe('notificaClient', () => {

    // TEST 1:
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să trimită un e-mail clientului', () => {

        // MET. '.FN()' DIN FK. 'JEST' (FUNC. 'FAKE'/'MOCK')
        // PRIN SETAREA FUNC. 'OBTINECLIENTSYNC'
        // CATRE O 'NNOUA FUNCTIE' CARE 'NU VORBESTE' CU O 'BAZA DE DATE':
        db.obtineClientSync = jest.fn().mockReturnValue({ email: 'a' });
        // MET. '.FN()' DIN FK. 'JEST' (FUNC. 'FAKE'/'MOCK')
        // PRIN SETAREA FUNC. 'SEND'
        mail.send = jest.fn();


        // APELAREA FUNC. 'NOTIFICACLIENT'
        lib.notificaClient({ idClient: 1 });


        // VERIFICAM: 'ARGUMENTELE TRECUTE CU METODA' 
        // PRIN  FUNC. DE POTRIVIRE 'TOHAVEBEENCALLEDWITH()'
        // 'ASTEPTAM' CA 'TRIMISTEREA MAIL-ULUI SA 'FI FOST APELAT CU EMAIL SI MESAJ':   
        // ACEASTA MET. ESTE BUNA PT. 'NUMERE', 'VALORI BOOLEAN
        // expect(mail.send).toHaveBeenCalledWith('a', '...');

        // VERIFICAM: 'ARGUMENTELE TRECUTE CU METODA' 
        // PRIN  FUNC. DE POTRIVIRE 'TOHAVEBEENCALLEDWITH()'
        // 'ASTEPTAM' CA 'TRIMISTEREA MAIL-ULUI SA 'FI FOST APELAT:   
        expect(mail.send).toHaveBeenCalled();
        // VERIFICAM: 'FIECARUI ARGUMENT TRECUT CU METODA' 
        // PRIN  FUNC. DE POTRIVIRE 'TOHAVEBEENCALLEDWITH()'
        // 'ASTEPTAM' CA 'ELEM. 1 AL MATRICEI DE ARG. TRIMISE PRIN MAIL-ULUI SA 'FI EMAILUL':   
        // expect(email.send.mock.calls[0][0]).toBe('a');
        // POTRIVIRE CU 'EXPRESIE REGULARA':
        expect(mail.send.mock.calls[0][1]).toMatch(/Comanda/);
    });
});