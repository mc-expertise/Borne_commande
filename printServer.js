const escpos = require('escpos');
escpos.Network = require('escpos-network');

async function printTicket(orderNumber, orderType, items, totalPrice) {
  try {
    const device = new escpos.Network('192.168.11.101'); // Use your printer IP
    const options = { encoding: 'CP858' };
    const printer = new escpos.Printer(device, options);

    device.open(function (error) {
      if (error) {
        console.error('Device open error:', error);
        return;
      }

      printer.raw(Buffer.from([0x1b, 0x74, 0x13]));

      printer
        .font('A')
        .align('CT')
        .style('B')
        .size(1, 1)
        .text('Order Nº: ' + orderNumber)
        .text('') // Add space
        .style('') // Reset style
        .text(orderType)
        .text('')
        .text('') // Add space
        .text('') // Add space
        .text('------------------------');

      items.forEach((item) => {
        printer
          .size(0, 0)
          .text(`${item.quantity} x ${item.name.fr} ${item.price} DH\n`);
        printer.text('');
      });
      printer.size(1, 1);
      printer.text('------------------------');
      printer
        .text('')
        .text('') // Add space
        .text('') // Add space
        .text('') // Add space
        .style('B')
        .style('B')
        .size(1, 1)
        .text('Total: ' + totalPrice + ' DH')
        .text('\n\n\n\n\n\n')
        .cut()
        .close();
    });
  } catch (error) {
    console.error('Error during printing:', error);
  }
}

module.exports = { printTicket };
