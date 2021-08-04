// ============================================================================
//  (1) CTREARE  FUNCTIE 'AUTENTIFICARE()'
//  (PARAM. 'NEXT' = REFERINTA CATRE 'MIDDLEWARE-UL URMATOR' IN 'CONDUCTA')
// ============================================================================
function autentificare(req, res, next) {
    console.log('Autentificare...');


    // APELAM FUNC. 'NEXT()' 
    // (PT. A 'TRECE CONTROLUL' -> CATRE URMATOAREA 'FUNC. MIDDLEWER' IN 'CONDUCTA'
    next();
}




// ============================================================================
// (2) EXPORTAM  FUNCTIE 'AUTENTIFICARE()'
// ============================================================================
module.exports = autentificare;