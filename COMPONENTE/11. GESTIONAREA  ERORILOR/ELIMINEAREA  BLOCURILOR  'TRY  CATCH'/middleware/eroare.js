// ____________________________________________________________________________
// EXPORTAREA FUNC. DE 'GESTIONARE' A 'ERORILOR MIDDLEWARE'  DIN  'EXPRESS'
module.exports = function(err, req, res, next) {
    // RETURNAM 'RASPUNSULUI' CATRE 'GENuri'
    // EROAREA '500' - 'EROARE INTERNA DE  SERVER'
    res.status(500).send('Ceva a eșuat.');
}