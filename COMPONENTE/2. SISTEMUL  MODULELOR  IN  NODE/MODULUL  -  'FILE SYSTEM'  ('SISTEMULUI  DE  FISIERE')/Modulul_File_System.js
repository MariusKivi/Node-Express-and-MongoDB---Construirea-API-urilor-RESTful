/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    MODULUL  -  'FILE SYSTEM'  ('SISTEMULUI  DE  FISIERE')
 ==================================================================================*/

/*
    MODULUL 'FILE SYSTEM'
        => CONTINE UN SET CUPRINZATOR DE 'METODE'=> 'ASINCRONICE' & 'SINCRONICE'
        => PT. 'LUCRUL' CU 'FISIERELE'. & 'DIRECTOARELE'.

   (NB!) A NU SE UTILIZA FUNCTII 'SINCRONICE'.

   (#) MODULUL  -  'FILE SYSTEM':
       https://nodejs.org/dist/latest-v14.x/docs/api/fs.html
*/



// ================================================================================
// (0) IMPORTAREA MODULULUI 'FS'
// ================================================================================
const fs = require('fs');



// ================================================================================
// (1.1) APELAREA METODEI  'READ DIR SYNC()'
// PT. AFISAREA 'TUTUROR FISIERELE & FOLDERELE' DIN FOLDERUL CURENT
// ================================================================================
var fisiere = fs.readdirSync('./');


// ================================================================================
// (1.2) AFISARE 'FISIERE'
// ================================================================================
console.log(fisiere);


/*
    RULAM COMANS:
        node Modulul_File_System.js


    VA AFISA 'MATRICEA':
        ______________________________________________
        [
            'app.js',
            'logger.js',
            'Modulul_File_System.js',
            'Modulul_OS.js',
            'Modulul_Path.js',
            'Obiectul_Global_in_Node.js'
        ]
        ______________________________________________
*/






// ================================================================================
// (2.1) APELAREA METODEI  'READ DIR('LOCATIA', CALLBACK FUNCTION )'
// ================================================================================
var fisiere2 = fs.readdir('./', function(eroare, fisiere2) {

    // 'SIMULAM' O 'EROARE'
    // var fisiere2 = fs.readdir('$', function(eroare, fisiere2) {
    // CONDITionala:
    if (eroare)
        console.log('Eroare', eroare);
    else
        console.log('Rezultat', fisiere2);
});


// ================================================================================
// (2.2) AFISARE 'FISIERE'
// ================================================================================
console.log(fisiere2);


/*
    RULAM COMANS:
        node Modulul_File_System.js


    VA AFISA 'MATRICEA':
        ______________________________________________
        Rezultat [
                    'app.js',
                    'logger.js',
                    'Modulul_File_System.js',
                    'Modulul_OS.js',
                    'Modulul_Path.js',
                    'Obiectul_Global_in_Node.js'
                ]
        ______________________________________________



    INCAZ DE 'EROARE' -> VA AFISA 'MATRICEA':
        ______________________________________________truirea-API-urilor-RESTful\Sistemul_Modulelor_in_Node\
        Eroare [Error: ENOENT: no such file or directory, scandir 'C:\Users\mariu\OneDrive\Desktop\Node-Express-and-MongoDB---Cons$'] {
            errno: -4058,
            code: 'ENOENT',
            syscall: 'scandir',
            path: 'C:\\Users\\mariu\\OneDrive\\Desktop\\Node-Express-and-MongoDB---Construirea-API-urilor-RESTful\\Sistemul_Modulelor_in_Node\\$'
        }
        ______________________________________________
*/