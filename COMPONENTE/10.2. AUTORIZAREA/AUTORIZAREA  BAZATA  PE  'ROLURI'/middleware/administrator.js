/*
     >> "401" - "Neautorizat"/"Unauthorized"
     >> "403" - "Interzis"/"Forbidden" 
*/

// ____________________________________________________________________________
// FUNC. EXPORTATA 'ADMINISTRATOR(){}' :
// ____________________________________________________________________________
module.exports = function(req, res, next) {

    // DACA 'UTILIZ. NU ESTE ADMINISTRATOR'
    // RETURNAM 'EROARE 403':
    if (!req.utilizator.esteAdministrator)
        return res.status(403).send('Acces interzis.');


    // DACA 'UTILIZATORUL ESTE ADMINISTRATOR'
    // TRECEM 'CONTROLUL' CATRE 'URMATOAREA' FUNCTIE 'MIDDLEWARE'
    // PRIN APELAMD FUNC. MIDDLEWARE URMATOARE 'NEXT()':
    next();
}