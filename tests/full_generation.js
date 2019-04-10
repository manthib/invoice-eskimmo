const fs = require('fs')
const path = require('path')
const generator = require('../dist/index')

const alerts = [

    {"_id" : ObjectId(""),
    "clicked" : false,
    "offerClicked" : false,
    "offerId" : "5cae2994f98d6000a6ac2e04",
    "agent" : "alexismoreau2@live.fr",
    "customerPhoneNumber" : "0677804793",
    "message" : "(Mise à jour)\nhttp://localhost:4000/offer/1597902996.htm/\nAppartement 3 pièces 60 m2\nParis à 615000€\nhttp://localhost:4000/num/0677804793/",
    "isUpdate" : true,
    "isDuplicate" : false,
    "offerLink" : "1597902996.htm",
    "createdDate" : ISODate("2019-04-10T17:36:20.506Z"),
    "updatedDate" : ISODate("2019-04-10T17:36:20.506Z"),
    "__v" : 0},

    {"_id" : ObjectId("5cae2aa398aaea00c5f947dd"),
    "clicked" : false,
    "offerClicked" : false,
    "offerId" : "5cae2aa398aaea00c5f947dc",
    "agent" : "alexismoreau2@live.fr",
    "customerPhoneNumber" : "0677804793",
    "message" : "(Mise à jour)\nhttp://localhost:4000/offer/1597902996.htm/\nAppartement 3 pièces 60 m2\nParis à 615000€\nhttp://localhost:4000/num/0677804793/",
    "isUpdate" : true,
    "isDuplicate" : false,
    "offerLink" : "1597902996.htm",
    "createdDate" : ISODate("2019-04-10T17:40:51.331Z"),
    "updatedDate" : ISODate("2019-04-10T17:40:51.331Z"),
    "__v" : 0}
    ]

const user = {"_id" : ObjectId(""),
    "isAdmin" : false,
    "activated" : true,
    "email" : "alexismoreau2@live.fr",
    "firstName" : "alexis",
    "lastName" : "moreau",
    "phoneNumber" : "0678122391",
    "wantParkings" : true,
    "wantUpdates" : true,
    "createdDate" : ISODate("2019-03-24T19:33:00.314Z"),
    "hash" : "$2a$10$iOUzwJKgLN36bUaXZ0hg2OL87fCaAFaCyTepMpJQ4fYNACohA89c2",
    "__v" : 0}

const document = generator({
  company: {
    name: 'Morman Design',
    phone: 'tel : +33 (0)6.31.58.68.37',
    email: 'email : mathieu@eskimmo.co',
    address: '11 Rue Monsigny',
    ville: '94400 VITRY SUR SEINE',
    siret: 'N° SIRET : 82779186400016',
    ape: 'Code APE : 6201Z - ',
    intracom: 'N° TVA Intracom. : FR34827791864',
    iban: 'FR76 3000 3038 6000 0201 8376 734',
    bic: 'SOGEFRPP',
    banqueadress: 'IVRY SUR SEINE CENTRE (03860)',

  },
  customer: {
    name: 'NOLIN Charlotte',
    email: 'charlotte.nolin@iadfrance.fr',
    address: '##############',
    phone: '+33 (0)650747221',

  },
    facture: {
        periode: 'Du 01/03/19 au 31/03/19',
        ref: 'Ref : 13-1',

    },

    tab_recap: [
       {description: 'SMS envoyés par Eskimmo', prixunitaire: 0.87, quantity: 27, amountht: 24.03},
    ],

    tab_tva: [
        {tva: 4.81},
    ],

    tab_ttc: [
        {amountttc: 28.84},
    ],
})

document.generate()

document.pdfkitDoc.pipe(fs.createWriteStream('../../factures/mars19/13-1.pdf'))
