const escpos = require('escpos');
escpos.Network = require('escpos-network');

const device = new escpos.Network('192.168.0.100'); // Replace with your printer's IP
const options = { encoding: 'GB18030' }; // Default encoding

const printer = new escpos.Printer(device, options);

function printTicket(orderNumber, items, totalPrice) {
  device.open(function (error) {
    if (error) {
      console.error('Error opening device:', error);
      return;
    }
    printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text(`Order Number: ${orderNumber}`)
      .text('Items:')
      .feed();

    items.forEach((item) => {
      printer.text(
        `${item.name} - ${item.quantity} x ${item.price} DH = ${item.totalPrice} DH`
      );
    });

    printer.text(`Total Price: ${totalPrice} DH`).cut().close();
  });
}

module.exports = { printTicket };
