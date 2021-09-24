//________________________________________________________________________
// TESTAREA 'NUMERELOR'
// FUNC. 'ABSOLUT': 
//________________________________________________________________________
module.exports.absolut = function(numar) {

    // DECLARATIA CONDITIONALA 
    // CU 'OP. TERNAR':
    return (numar >= 0) ? numar : -numar;
}



//________________________________________________________________________
// TESTAREA 'STRING'-URILOR
// FUNC. 'SALUT': 
//________________________________________________________________________
module.exports.salut = function(nume) {
    return 'Bine ai venit ' + nume + '!';
}





//________________________________________________________________________
// TESTAREA  'MATRICILOR' 
module.exports.obtinereValuta = function() {
    return ['USD', 'LEI', 'EURO'];
}