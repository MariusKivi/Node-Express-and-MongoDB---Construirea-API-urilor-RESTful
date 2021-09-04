/*

 NB!

 Exista 3 Aboradari ale 'Relatiilor' dintre 'Bazele de Date':

	(I) Referinte / Normalizare 
		=> utilizata in Bazele de Date 'Relationale'
		=> si care Intareste 'Integritatea Datelor'
		=> Ofera 'Consistenta' (o Singura Valoare trebuie Modificata in cazul unui Update) 
		=> nu ofera 'Performanta'
		=> Solicita o 'Interogare Suplimentara'
		

	(II) Documente Incorporate / Denormalizare 
		=> utilizata  in Bazele de Date 'Nerelationale'	
		=> in care 'Nu Avem Relatii'
		=> Ofera 'Performanta' (in cazul unui Update -> mai multe Valoare trebuiesc Modificate)
		=> nu ofera 'Consistenta'
		=> putand fi Incarcat printr-o 'Singura Interogare'


	(III) Abordarea 'Hibrida'
		=> utila in cazul unei 'Aplicatii eCommerce'
		=> ce Contine 'Comenzi', 'Cos de Cumparaturi'

*/

//======================================================================================
// (I) UTILIZAREA 'REFERINTELOR' (NORMALIZAREA)
//     --> CONTINE 'COLECTII SEPARATE'
//======================================================================================

// __________________________________________________________________________________
// OBIECT 'AUTOR':
let autor = {
    nume: 'Marius'
}


// __________________________________________________________________________________
// OBIECT 'CURS':
let curs = {
    // 'REFERINTA' A OBIECTULUI 'AUTOR':
    autor: 'id'
}







//======================================================================================
// (II) UTILIZAREA 'DOCIMENTELOR INCORPORATE' (DENORMALIZAREA)
//      --> CONTINE 'COLECTII INCORPORATE'
//======================================================================================

// OBIECTUL / DOCUMENTUL 'CURS':
let curs = {
    // OBIECTUL / DOCUMENTUL 'AUTOR' - INCORPORAT:
    autor: {
        nume: 'Marius'
    }
}







//======================================================================================
// (III) ABORDAREA 'HIBRIDA'
//      --> CONTINE 'COLECTII SEPARATE & INCORPORATE'
//======================================================================================

// __________________________________________________________________________________
// COLECTIA 'AUTOR':
let autor = {
    nume: 'Marius',
    // + ALTE 50 PROPRIETATI (DE EXEMPLU)
}


// __________________________________________________________________________________
// COLECTIA 'CURS':
let curs = {
    // DOCUMENTUL 'AUTOR' - INCORPORAT:
    autor: {
        // ID = 'REFERINTA' CATRE DOCUMENTUL 'AUTOR'
        id: 'ref',
        mume: 'Marius'
    }
}