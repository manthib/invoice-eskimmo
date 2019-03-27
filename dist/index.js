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
    y: 200,
    inc: 150
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
    genFooter: function genFooter() {
      doc.fillColor('#333333');

      doc.fontSize(8).text(company.siret, CONTENT_LEFT_PADDING, 770, {align: 'center'});
      doc.fontSize(8).text(company.ape + company.intracom, CONTENT_LEFT_PADDING, 780, {align: 'center'});

    },
    genCustomerInfos: function genCustomerInfos() {
      doc.fontSize(TEXT_SIZE).text(translate.chargeFor, CONTENT_LEFT_PADDING, 400);

      doc.text(customer.name + ' <' + customer.email + '>');
    },
    genTableHeaders: function genTableHeaders() {
      ['amount', 'name', 'description', 'quantity'].forEach(function (text, i) {
        doc.fontSize(TEXT_SIZE).text(translate[text], table.x + i * table.inc, table.y);
      });
    },
    genTableRow: function genTableRow() {
      items.map(function (item) {
        return Object.assign({}, item, {
          amount: numeral(item.amount).format('$ 0,00.00')
        });
      }).forEach(function (item, itemIndex) {
        ['amount', 'name', 'description', 'quantity'].forEach(function (field, i) {
          doc.fontSize(TEXT_SIZE).text(item[field], table.x + i * table.inc, table.y + TEXT_SIZE + 6 + itemIndex * 20);
        });
      });
    },
    genTableLines: function genTableLines() {
      var offset = doc.currentLineHeight() + 2;
      doc.moveTo(table.x, table.y + offset).lineTo(divMaxWidth, table.y + offset).stroke();
    },
    generate: function generate() {
      this.genHeader();
      this.genTableHeaders();
      this.genTableLines();
      this.genTableRow();
      this.genCustomerInfos();
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