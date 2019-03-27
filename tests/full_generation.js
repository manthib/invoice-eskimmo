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
    {amount: 50.0, name: 'XYZ', description: 'Lorem ipsum dollor sit amet', quantity: 12},
    {amount: 12.0, name: 'ABC', description: 'Lorem ipsum dollor sit amet', quantity: 12},
    {amount: 127.72, name: 'DFE', description: 'Lorem ipsum dollor sit amet', quantity: 12},
  ],
})

document.generate()

document.pdfkitDoc.pipe(fs.createWriteStream('testing.pdf'))
