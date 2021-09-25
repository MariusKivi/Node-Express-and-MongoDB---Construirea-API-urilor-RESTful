//________________________________________________________________________
// FUNCTIA 'FIZZBUZZ' 
module.exports.fizzBuzz = function(input) {

    // (1) DACA 'TIPUL INPUT-ULUI NU ESTE NUMAR'
    // ARNCA 'EROAREA'
    if (typeof input !== 'number')
        throw new Error('Input-ul ar trebui să fie un număr.');

    // (2) DACA 'INPUT-ULUI ESTE DIVIZIBIL LA 3 & 5'
    // RETURNEAZA 'FIZBUZZ'
    if ((input % 3 === 0) && (input % 5) === 0)
        return 'FizzBuzz';

    // (3) DACA 'INPUT-ULUI ESTE DIVIZIBIL LA 3'
    // RETURNEAZA 'FIZ'
    if (input % 3 === 0)
        return 'Fizz';

    // (4) DACA 'INPUT-ULUI ESTE DIVIZIBIL LA 5'
    // RETURNEAZA 'BUZZ'
    if (input % 5 === 0)
        return 'Buzz';

    // AFTFEL 'RETURNEAZA INPUT-UL':
    return input;
}