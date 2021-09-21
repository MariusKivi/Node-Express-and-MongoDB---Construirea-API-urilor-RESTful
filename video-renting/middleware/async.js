// EXPORTAREA - FUNC. 'ASYNC MIDDLEWARE()'
// (CE VA FI PRECUM O 'FUNC. DE FABRICARE'
//  PE CARE O APELAM SI PRIMIM O 'NOUA FUNC.')
dodule.export = function asyncMiddleware(handler) {

    // RETURNAREA 'FUNC. ASINCRON' DE 'GESTIONARE A RUTEI':
    return async(req, res, next) => {
        // BLOCURILE DE INCERCARE:
        try {

            // APELARE FUNC. ASINCRON 'HANDLER()':
            await handler(req, res);

        } catch (exception) {

            // APELARE:
            next(exception);
        }
    };
}