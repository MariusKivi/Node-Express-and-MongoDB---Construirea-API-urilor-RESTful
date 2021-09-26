// FUNC. EXPORTATA SINCRONIZATA 'OBTINECLIENTSYNC':
module.exports.obtineClientSync = function(id) {
    // SIMULAREA CITIRII APELULUI CATRE 'MONGODB':
    console.log('Citirea unui client de pe MongoDB ...');

    // RETURNARE OBIECT CU '2 PROP.':
    return { id: id, puncte: 11 };
}





// FUNC. EXPORTATA ASINCRONIZATA 'OBTINECLIENT':
module.exports.obtineClient = async function(id) {
    return new Promise((resolve, reject) => {
        // SIMULAREA CITIRII APELULUI CATRE 'MONGODB':
        console.log('Citirea unui client de pe MongoDB ...');

        // RETURNARE OBIECT CU '2 PROP.':
        resolve({ id: id, puncte: 11 });
    });
}