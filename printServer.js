const escpos = require('escpos');
escpos.Network = require('escpos-network');
escpos.USB = require('escpos-usb');

async function printTicket(orderNumber, orderType, items, totalPrice) {
  try {
    const networkDevice = new escpos.Network('192.168.11.101'); // Ethernet printer IP
    const usbDevice = new escpos.USB(0x1fc9, 0x2016); // USB printer
    const options = { encoding: 'CP858' };
    const networkPrinter = new escpos.Printer(networkDevice, options);
    const usbPrinter = new escpos.Printer(usbDevice, options);

    function printOnPrinter(device, printer) {
      return new Promise((resolve, reject) => {
        device.open(function (error) {
          if (error) {
            console.error('Device open error:', error);
            reject(error);
            return;
          }

          printer.raw(Buffer.from([0x1b, 0x74, 0x13]));

          printer
            .font('A')
            .align('CT')
            .style('B')
            .size(2, 2)
            .text("FOODIE'S")
            .text('\n\n\n\n\n\n')
            .size(1, 1)
            .text('Commande Nº: ' + orderNumber)
            .text('')
            .style('')
            .text(orderType)
            .text('')
            .text('')
            .text('------------------------');

          items.forEach((item) => {
            printer
              .size(0, 0)
              .text(
                `\x1b\x45\x01${item.quantity} x\x1b\x45\x00 ${item.name.fr} ${item.price} DH\n`
              );
            printer.text('');
          });

          printer.size(1, 1);
          printer.text('------------------------');
          printer
            .text('')
            .text('')
            .text('')
            .style('B')
            .size(1, 1)
            .text('Total: ' + totalPrice + ' DH')
            .text('\n\n\n\n\n\n')
            .size(0, 0)
            .style('B')
            .text('Bonne dégustation')
            .text('06 61 84 04 05')
            .text('\n\n\n\n\n\n')
            .cut()
            .close(() => resolve());
        });
      });
    }

    await Promise.all([
      printOnPrinter(networkDevice, networkPrinter),
      printOnPrinter(usbDevice, usbPrinter),
    ]);
  } catch (error) {
    console.error('Error during printing:', error);
  }
}

module.exports = { printTicket };
