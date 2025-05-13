const escpos = require('escpos');
escpos.USB = require('escpos-usb');

function printText(text) {
  const device = new escpos.USB();
  const printer = new escpos.Printer(device);
  device.open(() => {
    printer.text(text).cut().close();
  });
}

module.exports = { printText };
