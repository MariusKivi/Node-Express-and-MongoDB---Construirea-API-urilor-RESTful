/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
   MODULELE   IN  'NODE'  ('MAIN  MODULE')
 ==================================================================================*/

/*
        NB!
            A NU SE UTILIZA
                =>  DEFINIREA 'VARIABILELOR' & 'FUNCTIILOR' 
                    -> 'GLOBALA', PT. A NU FI 'SUPRASCRISE' DIN 'GRESEALA'
                    -> DIN ALTE 'FISIERE'.

        (#) FIECARE 'FISIER' AL LUI 'NODE'
                => ESTE CONSIDERAT CA FIIND UN 'MODUL'.
        
        (#) (3) 'VARIABILELE' & 'FUNCTIILE' EXISTENTE INTR-UN 'FISIER'
                => 'APARTIN' DOAR DE 'FISIERUL' RESPECTIV
                => ADICA SUNT 'PRIVATE',
                => PT. A LE UTILIZA IN 'AFARA  FISIERULUI'
                => TREBUIES 'EXPORTATE' EXPLICIT
                => SI FACUTE 'PUBLICE'.
        
        (#) FIECARE 'APLICATIE NODE'
                => CONTINE '1 FISIER PRINCIPAL' ('MAIN MODULE')
                    -> 'APP.JS'

*/


// ================================================================================
// (1) AFISAREA 'MODULULUI PRINCIPAL'
// ================================================================================
console.log(module);