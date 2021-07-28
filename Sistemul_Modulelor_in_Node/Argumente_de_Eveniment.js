/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    ARGUMENTE  DE  EVENIMENT
 ==================================================================================*/


// ================================================================================
// (0) IMPORTAREA MODULULUI 'EVENTS' 
//     IN CLASA 'EVENTEMITTER' ('EMITATOR DE EVENIMENTE')
// ================================================================================
const EventEmitter = require('events');



// ================================================================================
// (1) CREAREA INSTANTEI / OBIECTULUI 'EMITTER' ('EMITATOR') 
//     (PT. A PUTEA UTILIZA CLASA 'EventEmitter')
// ================================================================================
const emitter = new EventEmitter();




// ================================================================================
// (2.1) METODA LISTENER 'ON(EMITTER, CALLBACK FUNC(ARGUMENTUL_EVENIMENT))' / 'ADDLISTENER()' 
//       (PT. ASCULTAREA EVENIMENTULUI (EMIT()))
// ================================================================================
// emitter.addListener();

// emitter.on('mesajInregistrat', function(eventArgs) {
emitter.on('mesajInregistrat', (eventArgs) => {
    console.log('Listener (Ascultator) Apelat!', eventArgs);
});




// ================================================================================
// (2.2) APELAREA METODEI  'EMIT(NUMELE_EVENIMENTULUI, {ARGUMENTUL EVENIMENTULUI})'
//     (PT. RIDICAREA/CREAREA UNUI 'EVENIMENT')
// 'EMIT' (EMITE) = A SCOATE UN ZGOMOT, A SEMNALA , A PRODUCE O SEMNALIZARE
// ================================================================================
emitter.emit('mesajInregistrat', { id: 1, url: 'http://' });




/*
    RULAM COMANS:
        node Argumente_de_Eveniment.js


    VA AFISA 'MATRICEA':
        ______________________________________________
        PS C:\Users\mariu\OneDrive\Desktop\Node-Express-and-MongoDB---Construirea-API-urilor-RESTful\Sistemul_Modulelor_in_Node>  node Argumente_de_Eveniment.js
            Listener (Ascultator) Apelat! { id: 1, url: 'http://' }
        ______________________________________________
*/