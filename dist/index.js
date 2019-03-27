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
  var items = _ref.items;
  var facture = _ref.facture;

  var date = new Date();
  var charge = {
    createdAt: date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear(),
    amount: items.reduce(function (acc, item) {
      return acc + item.amount;
    }, 0)
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

  return {
    genHeader: function genHeader() {
      doc.fontSize(20).text(company.name, CONTENT_LEFT_PADDING, 30, {align: 'right'});
      doc.fontSize(8).text(company.address, CONTENT_LEFT_PADDING, 60, {align: 'right'});
      doc.fontSize(8).text(company.ville, CONTENT_LEFT_PADDING, 70, {align: 'right'});
      doc.fontSize(8).text(company.phone, CONTENT_LEFT_PADDING, 80, {align: 'right'});
      doc.fontSize(8).text(company.email, CONTENT_LEFT_PADDING, 90, {align: 'right'});

      doc.fontSize(10).text(facture.ref, CONTENT_LEFT_PADDING, 30, {align: 'left'});
      doc.fontSize(10).text('Date : ' + moment().format('DD MMMM YYYY'), CONTENT_LEFT_PADDING, 40, {align: 'left'});
      doc.fontSize(10).text('Titre : Facture Eskimmo', CONTENT_LEFT_PADDING, 50, {align: 'left'});
      doc.fontSize(10).text('Période : ' + facture.periode, CONTENT_LEFT_PADDING, 60, {align: 'left'});

      doc.fontSize(12).text(customer.name, CONTENT_LEFT_PADDING, 90, {align: 'left'});
      doc.fontSize(10).text(customer.address, CONTENT_LEFT_PADDING, 105, {align: 'left'});
      doc.fontSize(10).text('Email : ' +customer.email, CONTENT_LEFT_PADDING, 115, {align: 'left'});
      doc.fontSize(10).text('Tel : ' + customer.phone, CONTENT_LEFT_PADDING, 125, {align: 'left'});

      var borderOffset = doc.currentLineHeight() + 150;

      doc.strokeColor('#cccccc').moveTo(CONTENT_LEFT_PADDING, borderOffset).lineTo(divMaxWidth, borderOffset);
    },

    genTableHeaders: function genTableHeaders() {
      ['description', 'prixunitaire', 'quantity', 'amountht'].forEach(function (text, i) {
        doc.fontSize(TEXT_SIZE).text(translate[text], table.x + i * table.inc, table.y);
      });
    },
    genTableRow: function genTableRow() {
      items.map(function (item) {
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
      doc.moveTo(table.x, table.y + 35).lineTo(divMaxWidth, table.y + 35).stroke();
      doc.moveTo(table.x, table.y + 38).lineTo(divMaxWidth, table.y + 38).stroke();
    },
      genTable2Row: function genTable2Row() {
          items.map(function (item) {
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

      genFooter: function genFooter() {
          doc.fillColor('#333333');

          doc.fontSize(8).text(company.siret, CONTENT_LEFT_PADDING, 770, {align: 'center'});
          doc.fontSize(8).text(company.ape + company.intracom, CONTENT_LEFT_PADDING, 780, {align: 'center'});
      },

    generate: function generate() {
      this.genHeader();
      this.genTableHeaders();
      this.genTableLines();
      this.genTableRow();
      this.genTable2Row();
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