'use strict';

var pdfKit = require('pdfkit');
var moment = require('moment');
var numeral = require('numeral');
var i18n = require('./i18n');

var TEXT_SIZE = 8;
var CONTENT_LEFT_PADDING = 50;


function PDFInvoice(_ref) {
  var company = _ref.company;
  var customer = _ref.customer;
  var tab_recap = _ref.tab_recap;
  var tab_totalht = _ref.tab_totalht;
  var tab_remiseht = _ref.tab_remiseht;
  var tab_tva = _ref.tab_tva;
  var tab_ttc = _ref.tab_ttc;
  var facture = _ref.facture;

  var date = new Date();
  var charge = {
    createdAt: date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear(),
    /*amount: items.reduce(function (acc, item) {
      return acc + item.amount;
    }, 0)*/
  };
  var doc = new pdfKit({ size: 'A4', margin: 50 });

  doc.fillColor('#333333');

  var translate = i18n[PDFInvoice.lang];
  moment.locale(PDFInvoice.lang);

  var divMaxWidth = 550;
  var table = {
    x: CONTENT_LEFT_PADDING,
    y: 270,
    inc: 145
  };
    var table2 = {
        x: 485,
        y: 400,
        inc: 145
    };



  return {
      genLogo: function genLogo() {
        doc.image('logo.png', 450, 10, {scale: 0.2});
      },

    genHeader: function genHeader() {

        doc.fontSize(20).text(company.name, CONTENT_LEFT_PADDING, 120, {align: 'right'});
      doc.fontSize(8).text(company.address, CONTENT_LEFT_PADDING, 150, {align: 'right'});
      doc.fontSize(8).text(company.ville, CONTENT_LEFT_PADDING, 160, {align: 'right'});
      doc.fontSize(8).text(company.phone, CONTENT_LEFT_PADDING, 170, {align: 'right'});
      doc.fontSize(8).text(company.email, CONTENT_LEFT_PADDING, 180, {align: 'right'});

      doc.fontSize(10).text(facture.ref, CONTENT_LEFT_PADDING, 30, {align: 'left'});
      doc.fontSize(10).text('Date : ' + moment().format('DD MMMM YYYY'), CONTENT_LEFT_PADDING, 40, {align: 'left'});
      doc.fontSize(10).text('Titre : Facture Eskimmo by Morman Design', CONTENT_LEFT_PADDING, 50, {align: 'left'});
      doc.fontSize(10).text('Période : ' + facture.periode, CONTENT_LEFT_PADDING, 60, {align: 'left'});

      doc.fontSize(12).text(customer.lastname + ' ' + customer.firstname, CONTENT_LEFT_PADDING, 150, {align: 'left'});
     // doc.fontSize(10).text(customer.address, CONTENT_LEFT_PADDING, 155, {align: 'left'});
      doc.fontSize(10).text('Email : ' +customer.email, CONTENT_LEFT_PADDING, 165, {align: 'left'});
      doc.fontSize(10).text('Tel : ' + customer.phone, CONTENT_LEFT_PADDING, 175, {align: 'left'});

      var borderOffset = doc.currentLineHeight() + 200;

      doc.strokeColor('#cccccc').moveTo(CONTENT_LEFT_PADDING, borderOffset).lineTo(divMaxWidth, borderOffset);
    },

    genTableHeaders: function genTableHeaders() {
      ['description', 'prixunitaire', 'quantity', 'amountht'].forEach(function (text, i) {
        doc.fontSize(TEXT_SIZE).text(translate[text], table.x + i * table.inc, table.y);
      });
    },
    genTableRow: function genTableRow() {
      tab_recap.map(function (item) {
        return Object.assign({}, item, {
          amountht: numeral(item.amountht).format('0,0[.]00')
         // prixunitaire: numeral(item.prixunitaire).format('0,0[.]00')
        });
      }).forEach(function (item, itemIndex) {
        ['description', 'prixunitaire', 'quantity', 'amountht'].forEach(function (field, i) {
          doc.fontSize(TEXT_SIZE).text(item[field], table.x + i * table.inc, table.y + TEXT_SIZE + 13 + itemIndex * 20);
        });
      });
    },
    genTableLines: function genTableLines() {
      var offset = doc.currentLineHeight() + 5;
      doc.moveTo(table.x, table.y + offset).lineTo(divMaxWidth, table.y + offset).stroke();
      doc.moveTo(table.x, table.y + 15).lineTo(divMaxWidth, table.y + 15).stroke();
      doc.moveTo(table.x, table.y + 57).lineTo(divMaxWidth, table.y + 57).stroke();
      doc.moveTo(table.x, table.y + 60).lineTo(divMaxWidth, table.y + 60).stroke();


    },
      genTable2Headers: function genTable2Headers() {
          ['totalht'].forEach(function (text, i) {
              doc.fontSize(TEXT_SIZE).text(translate[text], table2.x + i * table2.inc, table.y + 85);
          });

          doc.strokeColor('#cccccc').moveTo(485, table.y + 97).lineTo(divMaxWidth, table.y + 97);
          doc.strokeColor('#cccccc').moveTo(485, table.y + 100).lineTo(divMaxWidth, table.y + 100);

      },


      genTable2Row: function genTable2Row() {
          tab_totalht.map(function (item) {
              return Object.assign({}, item, {

                  totalht: numeral(item.totalht).format('0,0[.]00')
              });
          }).forEach(function (item, itemIndex) {
              ['totalht'].forEach(function (field, i) {
                  doc.fontSize(TEXT_SIZE).text(item[field], table2.x + i * table2.inc, table.y + 85 + TEXT_SIZE + 13 + itemIndex * 20);
              });
          });
      },

      genTable3Headers: function genTable3Headers() {
          ['remiseht'].forEach(function (text, i) {

              doc.fontSize(TEXT_SIZE).text(translate[text] + facture.remise, table2.x + i * table2.inc, table.y + 135);
          });

          doc.strokeColor('#cccccc').moveTo(485, table.y + 147).lineTo(divMaxWidth, table.y + 147);
          doc.strokeColor('#cccccc').moveTo(485, table.y + 150).lineTo(divMaxWidth, table.y + 150);

      },

      genTable3Row: function genTable3Row() {
          tab_remiseht.map(function (item) {
              return Object.assign({}, item, {
                  remiseht: numeral(item.remiseht).format('0,0[.]00'),

              });
          }).forEach(function (item, itemIndex) {
              ['remiseht'].forEach(function (field, i) {
                  doc.fontSize(TEXT_SIZE).text(item[field], table2.x + i * table.inc, table.y + 135 + TEXT_SIZE + 13 + itemIndex * 20);
              });
          });
      },

      genTable4Headers: function genTable4Headers() {
          ['tva'].forEach(function (text, i) {
              doc.fontSize(TEXT_SIZE).text(translate[text], table2.x + i * table2.inc, table.y + 185);
          });

          doc.strokeColor('#cccccc').moveTo(485, table.y + 197).lineTo(divMaxWidth, table.y + 197);
          doc.strokeColor('#cccccc').moveTo(485, table.y + 200).lineTo(divMaxWidth, table.y + 200);

      },


      genTable4Row: function genTable4Row() {
          tab_tva.map(function (item) {
              return Object.assign({}, item, {

                  tva: numeral(item.tva).format('0,0[.]00')
              });
          }).forEach(function (item, itemIndex) {
              ['tva'].forEach(function (field, i) {
                  doc.fontSize(TEXT_SIZE).text(item[field], table2.x + i * table2.inc, table.y + 185 + TEXT_SIZE + 13 + itemIndex * 20);
              });
          });
      },

      genTable5Headers: function genTable5Headers() {
          ['amountttc'].forEach(function (text, i) {
              doc.fontSize(TEXT_SIZE).text(translate[text], table2.x + i * table2.inc, table.y + 235);
          });

          doc.strokeColor('#cccccc').moveTo(485, table.y + 247).lineTo(divMaxWidth, table.y + 247);
          doc.strokeColor('#cccccc').moveTo(485, table.y + 250).lineTo(divMaxWidth, table.y + 250);

      },

      genTable5Row: function genTable5Row() {
          tab_ttc.map(function (item) {
              return Object.assign({}, item, {
                  amountttc: numeral(item.amountttc).format('0,0[.]00'),

              });
          }).forEach(function (item, itemIndex) {
              ['amountttc'].forEach(function (field, i) {
                  doc.fontSize(TEXT_SIZE).text(item[field], table2.x + i * table.inc, table.y + 235 + TEXT_SIZE + 13 + itemIndex * 20);
              });
          });
      },

      genInfo: function genInfo() {
          doc.fillColor('#333333');

          doc.fontSize(10).text('Condition de réglement :', CONTENT_LEFT_PADDING, 520);
          doc.fontSize(8).text('Paiement par virement à réception :', CONTENT_LEFT_PADDING, 550);
          doc.fontSize(8).text('Titulaire : ' + company.name, CONTENT_LEFT_PADDING, 560);
          doc.fontSize(8).text('IBAN : ' + company.iban, CONTENT_LEFT_PADDING, 570);
          doc.fontSize(8).text('BIC : ' + company.bic, CONTENT_LEFT_PADDING, 580);
          doc.fontSize(8).text('Adresse : ' + company.banqueadress, CONTENT_LEFT_PADDING, 590);
      },

      genFooter: function genFooter() {
          doc.fillColor('#333333');

          doc.fontSize(8).text(company.siret, CONTENT_LEFT_PADDING, 770, {align: 'center'});
          doc.fontSize(8).text(company.ape + company.intracom, CONTENT_LEFT_PADDING, 780, {align: 'center'});
      },

    generate: function generate() {

      this.genLogo();
      this.genHeader();
      this.genTableHeaders();
      this.genTable2Headers();
      this.genTable3Headers();
      this.genTable4Headers();
      this.genTable5Headers();
      this.genTableLines();
      this.genTableRow();
      this.genTable2Row();
      this.genTable3Row();
      this.genTable4Row();
      this.genTable5Row();
      this.genInfo();
      this.genFooter();

      doc.end();
    },


    get pdfkitDoc() {
      return doc;
    }
  };
}

PDFInvoice.lang = 'fr_FR';

module.exports = PDFInvoice;