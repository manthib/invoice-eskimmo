const fs = require('fs')
const path = require('path')
const generator = require('../dist/index')

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
    name: 'SERGENT Lorene',
    email: 'lorene.sergent@iadfrance.fr',
    address: '##############',
    phone: '+33 (0)630938745',

  },
    facture: {
        periode: 'Du 01/03/19 au 31/03/19',
        ref: 'Ref : 22-1',

    },

    tab_recap: [
       {description: 'SMS envoyés par Eskimmo', prixunitaire: 0.87, quantity: 6, amountht: 5.22},
    ],

    tab_tva: [
        {tva: 1.04},
    ],

    tab_ttc: [
        {amountttc: 6.26},
    ],
})

document.generate()

document.pdfkitDoc.pipe(fs.createWriteStream('../../factures/mars19/22-1.pdf'))
