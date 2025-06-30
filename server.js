// server.js
const express = require('express');
const { printTicket } = require('./printServer');
const app = express();
app.use(require('cors')());
app.use(express.json());

app.post('/print', async (req, res) => {
  console.log('🚀 ~ app.post ~ req:', req.body.items[0].name);
  try {
    const { orderNumber, orderType, items, totalPrice } = req.body;
    await printTicket(orderNumber, orderType, items, totalPrice);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Print server running on port 3000'));
