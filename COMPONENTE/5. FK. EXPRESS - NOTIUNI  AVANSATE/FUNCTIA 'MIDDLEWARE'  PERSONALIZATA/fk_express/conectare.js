// ============================================================================
// (1) CTREARE  FUNCTIE 'CONECTARE'
// ============================================================================
function conectare(req, res, next) {
    console.log('Conectare...');


    // APELAM FUNC. 'NEXT()' 
    // (PT. A 'TRECE CONTROLUL' -> CATRE URMATOAREA 'FUNC. MIDDLEWER' IN 'CONDUCTA'
    next();
}


// ============================================================================
// (2) EXPORTAM  FUNCTIE 'CONECTARE'
// ============================================================================
module.exports = conectare;