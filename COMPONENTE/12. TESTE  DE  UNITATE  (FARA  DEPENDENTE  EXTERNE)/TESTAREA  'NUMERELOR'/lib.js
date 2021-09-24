//________________________________________________________________________
// TESTAREA 'NUMERELOR'
// FUNC. 'ABSOLUT': 
module.exports.absolut = function(numar) {

    // DACA 'NR. ESTE POZITIV' 
    // RETURNEAZA 'ACELASI NR':
    if (numar > 0) return numar;

    // DACA 'NR. ESTE NEGATIV' 
    // RETURNEAZA 'NR NEGATIV': 
    if (numar < 0) return -numar;

    // IN 'CAZ  CONTRAR'
    // RETURNEAZA 'ZERO':
    return 0;
}