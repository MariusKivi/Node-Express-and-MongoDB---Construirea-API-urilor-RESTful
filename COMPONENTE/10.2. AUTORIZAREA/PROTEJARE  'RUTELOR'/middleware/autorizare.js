// ____________________________________________________________________________
// (IMP-1) IMPORTAREA BIBLIOTECI 'JSOM WEB TOKEN':
const jwt = require('jsonwebtoken');

// ____________________________________________________________________________
// (IMP-2) IMPORTAREA BIBLIOTECI 'CONFIG':
const config = require('config');






// ____________________________________________________________________________
// FUNC. EXPORTATA 'AUTORIZARE(){}' :
// ____________________________________________________________________________
module.exports = function(req, res, next) {

    // AUTORIZAREA 'UTILIZATORILOR AUTENTIFICATI' PT. 'VIZUALIZARE'
    // PRIN MET. 'HEADER('PREFIX-NUME_ALEATORIU', VALOARE)':
    const token = res.header('x-autentificare-token', token);

    // DACA 'NU EXISTA TOKEN' 
    // RETURNAM RASPUNSUL '401' 
    // UTILIZATORUL NUARE AUTORIZARE PT. ACCESARE:
    if (!token) return res.status(401).send('Acces interzis. Nu este furnizat niciun token.');


    // BLOCURILE 'TRY{} CATCH{}':
    try {
        // 'PAYLOAD'-UL 'DECODIFICAT'
        // DACA 'TOKEN-UL EXISTA' VERIFICAM 'VALIDITATEA TOKEN'-ULUI - 'JWT'
        // MET. '.VERIFY(TOKEN, CHEIA_PRIVATA_PT_DECODARE_TOKEN-ULUI)'
        // APELAREA MET. 'CONGIG.GET()':
        const decodificat = jwt.verify(token, config.get('cheiaPrivataJWT'));

        // CEREREA 'UTILIZATORULUI DECODAT:
        req.utilizator = decodificat;

        // TRECEM 'CONTROLUL' CATRE 'URMATOAREA' FUNCTIE 'MIDDLEWARE'
        // APELAMD FUNC. 'NEXT()':
        next();

    } catch (exceptin) {
        // TRANSMITEM 'CLIENTULUI' -> CA 'TOKEN-UL ESTE INVALID'
        // RASPUNS - 'EROAREA 400':
        res.status(400).send('Token invalid.');
    }
}