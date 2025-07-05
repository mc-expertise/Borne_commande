// server.js
const express = require('express');
const { printTicket } = require('./printServer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(require('cors')());
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

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

const dataPath = path.join(__dirname, 'data.json');

// Get menu data
app.get('/api/menu', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product epuise
app.post('/api/products/:categoryId/:productId/epuise', (req, res) => {
  const { categoryId, productId } = req.params;
  const { epuise } = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const product = data.products[categoryId]?.find((p) => p.id === productId);
    if (product) {
      product.epuise = epuise;
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.json({ success: true, product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update category epuise
app.post('/api/categories/:categoryId/epuise', (req, res) => {
  const { categoryId } = req.params;
  const { epuise } = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const category = data.categories.find((c) => c.id === categoryId);
    if (category) {
      category.epuise = epuise;
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.json({ success: true, category });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update option epuise
app.post('/api/options/:categoryId/:optionIndex/epuise', (req, res) => {
  const { categoryId, optionIndex } = req.params;
  const { epuise } = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const optionCategory = data.options[categoryId];
    if (optionCategory && optionCategory[optionIndex]) {
      optionCategory[optionIndex].epuise = epuise;
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.json({ success: true, option: optionCategory[optionIndex] });
    } else {
      res.status(404).json({ error: 'Option not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
