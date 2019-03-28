const fs = require('fs')
const path = require('path')
const generator = require('../dist/index')

const document = generator({
  company: {
    name: 'Diving Panda',
    phone: 'tel : +33 (0)6.31.58.68.37',
    email: 'email : mathieu@eskimmo.co',
    address: '5 Avenue du Général de Gaulle',
    ville: '94160 SAINT MANDE',
    siret: 'N° SIRET : ##############',
    ape: 'Code APE : ##### - ',
    intracom: 'N° TVA Intracom. ##############',

  },
  customer: {
    name: 'SINOPOLI Romain',
    email: 'romain.sinopoli@iadfrance.fr ',
    address: '3 rue du casse couille',
    phone: '+33 (0)652044215',

  },
    facture: {
        periode: 'Du 01/03/19 au 31/03/19',
        ref: 'Ref : 12-1',

    },

  items: [
    {description: 'SMS envoyés par Eskimmo', prixunitaire: 0.87, quantity: 12, amountht: 10.44},
  ],

    items2: [
        {tva: 2.09},
    ],

    items3: [
        {amountttc: 12.53},
    ],
})

document.generate()

document.pdfkitDoc.pipe(fs.createWriteStream('testing.pdf'))
