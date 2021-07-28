/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    MODULUL - 'HTTP'
 ==================================================================================*/

/*
    (#) MODULUL - 'HTTP'
            => ESTE UTILIZAT IN CREAREA 'APLICATIILOR DE RETEA'
            => EX. -  CREAREA UNUI 'SERVICIU WEB' 
            => CARE 'ASCULTA' UN 'HTTP REQUEST' 
            => PE UN 'PORT' DAT.


    (#) MODULUL - 'HTTP' -> CONTINE 'CLASE' CE AU
            => PROPRIETATI,
            => METODE,
            => EVENIMENTE. 


    https://nodejs.org/dist/latest-v14.x/docs/api/http.html


    (#) INTR-O 'APLICATIE REALA'
        =>' NU VOM FOLOSI' MODULUL 'HTTP' 
        => PT. CONSTRUIREA 'SERVICIILOR BACKEND' PENTRU O 'APLICATIE'
        => DEOARECE '`CODUL`' DEVINE 'PREA COMPLEX'.
        
        => VOM FOLOSI FRAMEWORK-UL 'EXPRESS'
        => CARE ESTE CONSTRUIT BAZA MODULULUI 'HTTP' DIN 'NODE'
*/


// ================================================================================
// (0) IMPORTAREA MODULULUI 'HTTP' 
// ================================================================================
const http = require('http');
const { Socket } = require('net');



// ================================================================================
// (1) APELAREA METODEI 'CREATE SERVER()' & 
//     'STOCAREA REZULTATULUI' IN OBIECTUL 'SERVER' (CARE ESTE UN 'EVENTEMITTER')
//     (LUCRAM CU OBECTUL 'REQUEST' SAU 'RESPONSE')
// ================================================================================
const server = http.createServer((req, res) => {

    // (1)VERIFICAN:
    if (req.url === '/') {
        // SRIEM CATRE CLIENT:
        res.write('Bun venit pe aceasta pagina');

        // INCHEIEM RASPUNSUL:
        res.end();
    }


    // (2) VERIFICAN:
    if (req.url === '/api/cursuri') {

        // RETURNAM O MATRICE DE OBIECT  (FOLOSIND 'JSON'):
        // (MET. 'STRING IF Y()' --> VA CONVERTI 'MATRICEA' INTR-UN 'STRING')
        res.write(JSON.stringify([1, 2, 3]));

        // INCHEIEM RASPUNSUL:
        res.end();
    }
});



// ================================================================================
// (2) INREGISTRAREA 'LISTENER'-ULUI - PRIN METODA 'ON()'
//     (LUCRAM CU 'SOCKET')
// ================================================================================
// server.on('connection', (socket) => {
//     console.log('Conecxiune Noua...');
// });


// ================================================================================
// (2) METODA 'LISTEN' - PT. ASCULTAREA 'PORTULUI'
// ================================================================================
server.listen(3000);



// ================================================================================
// (3) AFISARE
// ================================================================================
console.log('Ascultarea Portului 3000');

/*
    RULAM COMANDA IN TERMINAL:
        node Modulul_HTTP.js
    
    AFISAREA IN TERMINAL:
    _______________________________________________________________
    PS C:\Users\mariu\OneDrive\Desktop\Node-Express-and-MongoDB---C                   onstruirea-API-urilor-RESTful\Sistemul_Modulelor_in_Node>  node Modulul_HTTP.js
    Ascultarea Portului 3000
    _______________________________________________________________
    

    ACCESAM IN BROWSER:
    _______________________________________________________________
    http://localhost:3000/
    _______________________________________________________________


    IAR IN TERMINAL SE VA AFISA:
    _______________________________________________________________
    PS C:\Users\mariu\OneDrive\Desktop\Node-Express-and-MongoDB---C                   onstruirea-API-urilor-RESTful\Sistemul_Modulelor_in_Node>  node Modulul_HTTP.js
    Ascultarea Portului 3000
    Conecxiune Noua...
    Conecxiune Noua...
    _______________________________________________________________

    
    AFISAREA IN BROWSER PT. METODEI 'CREATE SERVER()' :
    _______________________________________________________________
    Bun venit pe aceasta pagina.
    _______________________________________________________________
    

    
    AFISAREA IN BROWSER PT. PAGINA '/API/CURSURI' :
    _______________________________________________________________
    Bun venit pe aceasta pagina.[1,2,3]
    _______________________________________________________________
    
*/