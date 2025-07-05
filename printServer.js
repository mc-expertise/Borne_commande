const escpos = require('escpos');
escpos.Network = require('escpos-network');

async function printTicket(orderNumber, orderType, items, totalPrice) {
  try {
    const options = { encoding: 'CP858' };

    async function printOnPrinter(ip, isSecondPrinter = false) {
      const device = new escpos.Network(ip);
      const printer = new escpos.Printer(device, options);

      return new Promise((resolve, reject) => {
        device.open(function (error) {
          if (error) {
            console.error('Device open error:', error);
            reject(error);
            return;
          }

          // Your printing commands here, same as before
          printer.raw(Buffer.from([0x1b, 0x74, 0x13]));
          if (isSecondPrinter) {
            printer.raw(Buffer.from([0x1b, 0x23, 21]));
          }

          printer
            .font('A')
            .align('CT')
            .style('B')
            .size(1, 1)
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
                '\x1b\x45\x01' +
                  item.quantity +
                  ' x\x1b\x45\x00 ' +
                  item.name.fr +
                  ' ' +
                  item.price +
                  ' DH\n'
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
            .size(1, 1)
            .style('B')
            .text('Bonne dégustation')
            .text('06 61 84 04 05')
            .feed(6)
            .cut()
            .close(() => resolve());
        });
      });
    }

    // Print two tickets on first printer
    await printOnPrinter('192.168.11.103', false);
    await printOnPrinter('192.168.11.103', false);

    // Print one ticket on second printer
    await printOnPrinter('192.168.123.100', true);
  } catch (error) {
    console.error('Error during printing:', error);
  }
}

module.exports = { printTicket };
