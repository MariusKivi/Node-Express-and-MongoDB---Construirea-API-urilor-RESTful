/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    MODULUL  -  'EVENTS'  ('EVENIMENTE')
 ==================================================================================*/

/*
    (#) 'EVENIMENTUL'
            => ESTE UNUL DINTRE CELE MAI IMPORTANTE CONCEPTE,
            => REPREZENTAND UN 'SEMNAL' -> CE 'INDICA' FAPTUL CA 'CEVA SE INTAMPLA' IN 'APLICATIE''
  

    (NB!) CLASA 'HTTP'  DIN  'NODE'
            => ESTE UTILIZATA PT. CONSTRUIREA UNUI 'SERVICIU WEB'
                <= PORTUL 'HTTP' <- FIIND 'ASCULTAT'.
            => IAR CAND 'SE PREMESTE' UN 'REQUEST' PE PORTUL 'HTTP'
                => CLASA 'HTTP' --> RIDICA (CREAZA) UN 'EVENIMENT.
                <= LA CARE SE VA 'RASPUNDE' PRIN 'CODUL' 
                => IMPLICAND:
                    => 'CITIREA REQUEST'-ULUI  & 
                    <= RETURNAREA 'RASPUNSULUI  CORECT'.

    (NB!) 'CLASA':
            => ESTE UN 'CONTAINER'
            => DE 'PROPRIETATI' & 'FUNCTII' PE CARE LE DENUMIM 'METODE'.
                    <= RETURNAREA 'RASPUNSULUI  CORECT'.


    (NB!) 'CLASA' vs 'OBIECT':
            (*) 'CLASA'  === ESTE PRECUM UN 'OM' CE DEFINESTE:
                    <= O 'PROPRIETATE'
                    <= UN 'COMPORTAMENTUL UNUI CONCEPT'.

            (*) 'OBIECT' === ESTE O 'PERSOANA ACTUALA' PRECUM  'Marius' 
                    <= ESTE O 'INSTANTA ACTUALA' A UNEI 'CLASE'.


    (NB!) 'INSTANTIERE'
                => REPREZINTA 'CREAREA UNUI OBIECT' 
                => CE APARTINE UNEI 'CLASE'. 


    (#) NODULUL 'EVENTS' - CONTINE:
            => CLASA 'EVENT EMITTER'
                => CARE INCLUDE MAI MULTE 'METODE'.

    (#) 'EMET()':
            => ESTE METODA CE 'EMITE' UN 'EVENIMENT'.
               

    (#) 'ADDLISTENER()' / 'ON()':
            => ESTE FUNCTIA CE ESTE 'APELATA' 
            => CAND UN 'EVENIMENT' ESTE 'RIDICAT'/CREAT.
               


   (#) MODULUL - 'EVENTS' :
       https://nodejs.org/dist/latest-v14.x/docs/api/events.html
*/



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
// (2.1) METODA LISTENER 'ON(EMITTER, CALLBACK FUNC)' / 'ADDLISTENER()' 
//       (PT. ASCULTAREA EVENIMENTULUI (EMIT()))
// ================================================================================
// emitter.addListener();
emitter.on('jurnalMesaje', function() {
    console.log('Listener (Ascultator) Apelat!');
});




// ================================================================================
// (2.2) APELAREA METODEI  'EMIT(ARGUMENT_NUMELE_EVENIMENTULUI)'
//     (PT. RIDICAREA/CREAREA UNUI 'EVENIMENT')
// 'EMIT' (EMITE) = A SCOATE UN ZGOMOT, A SEMNALA , A PRODUCE O SEMNALIZARE
// ================================================================================
emitter.emit('jurnalMesaje');




/*
    RULAM COMANS:
        node Modulul_Events.js


    VA AFISA 'MATRICEA':
        ______________________________________________
        PS C:\Users\mariu\OneDrive\Desktop\Node-Express-and-MongoDB---Construirea-API-urilor-RESTful\Sistemul_Modulelor_in_Node> node Modulul_Events.js
            Listener (Ascultator) Apelat!   
        ______________________________________________
*/