// ============================================================================
// (1) CTREARE  FUNCTIE 'INREGISTRARE'
//  (PARAM. 'NEXT' = REFERINTA CATRE 'MIDDLEWARE-UL URMATOR' IN 'CONDUCTA')
// ============================================================================
function inregistrare(req, res, next) {
    console.log('Inregistrare...');


    // APELAM FUNC. 'NEXT()' 
    // (PT. A 'TRECE CONTROLUL' -> CATRE URMATOAREA 'FUNC. MIDDLEWER' IN 'CONDUCTA'
    next();
}


// ============================================================================
// (2) EXPORTAM  FUNCTIE 'CONECTARE'
// ============================================================================
module.exports = inregistrare;