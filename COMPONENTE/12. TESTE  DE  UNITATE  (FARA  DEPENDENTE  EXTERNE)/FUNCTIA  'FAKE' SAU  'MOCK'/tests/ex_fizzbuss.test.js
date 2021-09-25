// IMPORTAM MODULUL 'EX_FIZZBUZZ.JS'
const lib = require('../ex_fizzbuss')



// BLOCUL DE 'GRUPAREA  TESTELOR CONEXE' - 'DESCRIBE(FIZZBUZZ)':
describe('fizzBuzz', () => {

    // TEST 1: 
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să arunce o excepție dacă input-ul nu este un număr', () => {
        // ABORDAREA 1:  ' TREBUIE REPETATA PT TOATE ARGUMENTELE TESTATE'
        // 'ASTEPTAM' CA 'FUNC. CALLBACK' SA 'ARUNCE' PRIN FUNC. 'TOTHROW()':   
        // FUNC. CALLBACK 'FIZZBUZZ('STRING')':
        expect(() => { lib.fizzBuzz('a') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
        expect(() => { lib.fizzBuzz({}) }).toThrow();

    });


    // TEST 2: 
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze FizzBuzz dacă input-ul este divizibil cu 3 și 5', () => {

        // APELAREA FUNC. 'FIZZBUZZ()':
        const rezultat = lib.fizzBuzz(15);

        // VERIFICAM DACA 'NR' ESTE 'CORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe('FizzBuzz');
    });


    // TEST 3: 
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze FizzBuzz dacă input-ul este divizibilă cu 3', () => {

        // APELAREA FUNC. 'FIZZBUZZ()':
        const rezultat = lib.fizzBuzz(3);

        // VERIFICAM DACA 'NR' ESTE 'CORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe('Fizz');
    });


    // TEST 4: 
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze FizzBuzz dacă input-ul este divizibil cu 5', () => {

        // APELAREA FUNC. 'FIZZBUZZ()':
        const rezultat = lib.fizzBuzz(5);

        // VERIFICAM DACA 'NR' ESTE 'CORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe('Buzz');
    });


    // TEST 5: 
    // APELAM FUNC. 'IT('NUME_TEST', FUNC_IN_CARE_IMPLEMENTAM_TESTUL)':
    it('Ar trebui să returneze input-ul dacă nu este divizibil cu 3 sau 5', () => {

        // APELAREA FUNC. 'FIZZBUZZ()':
        const rezultat = lib.fizzBuzz(1);

        // VERIFICAM DACA 'NR' ESTE 'CORECT'
        // APELAM FUNC. UTILITARA 'EXPECT()' (AE FK. 'JEST')
        //  & FUNC. DE POTRIVIRE 'TOBE()' (A FK. 'JEST'):
        expect(rezultat).toBe(1);
    });
});