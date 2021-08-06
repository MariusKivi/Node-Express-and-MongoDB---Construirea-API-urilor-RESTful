// ============================================================================
//          (I) INCARI (IMPORTARI)
// ============================================================================
// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// (IMP-2) OBIECTUL 'ROUTER' - APELAREA FUNC. 'EXPRESS.RIUTER()'
const router = express.Router();
// ============================================================================









// ============================================================================
//      (II) 'HTTP GET REQUEST' PT. 'PRELUAREA  DATELOR DIN DB/MATRICE'
// ============================================================================
// ____________________________________________________________________________
// RUTA 1.1: '/'
// ____________________________________________________________________________
// MET. 'GET(URL, CALLBACK_FUNC(REQ, RES))' 
// (PT. DEFINIREA 'RUTEI')
// FUNCTIA 'CALLBACK' MAI ESTE DEN. 'MANIPULATOR DE TRASEU/RUTE'
router.get('/', (req, res) => {
    // RASPUNSUL - PRIN 'PUG TEMPLATE ENGINE':
    // MET. 'RENDER('NUMELE_FISIERULUI.PUG_TEMPLATE', {VAPORI_ALE_PARAMS_DIN_TEMPLATE})'
    res.render('index', { titlu: 'Aplicatia Mea Express', mesaj: 'Va saluta Marius!' });
});








// ============================================================================
//    (III) EXPORTARE 'ROUTER'
// ============================================================================
module.exports = router;
// ============================================================================