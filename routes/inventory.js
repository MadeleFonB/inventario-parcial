const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const InventoryLog = require('../models/InventoryLog');
const User = require('../models/User'); 
const auth = require('../middleware/auth');

// POST entrada o salida
router.post('/', auth, async (req, res) => {
  const { productId, type, quantity } = req.body;

  console.log('Body recibido:', req.body);
  console.log('User desde token:', req.user);

  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Producto no encontrado');
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (type === 'entrada') {
      product.stock += quantity;
    } else if (type === 'salida') {
      if (product.stock - quantity < product.minStock) {
        console.log('⚠️ Stock insuficiente');
        return res.status(400).json({ message: 'Stock insuficiente para realizar la salida' });
      }
      product.stock -= quantity;
    } else {
      console.log('Tipo inválido');
      return res.status(400).json({ message: 'Tipo inválido (entrada o salida)' });
    }

    await product.save();
    const userDB = await User.findById(req.user.userId);

    const log = new InventoryLog({
      product: product._id,
      type,
      quantity,
      user: userDB.email
    });

    await log.save();

    console.log('Inventario actualizado correctamente');
    res.status(200).json({ message: `Inventario actualizado (${type})`, product });
  } catch (err) {
    console.error('Error al actualizar inventario:', err.message);
    res.status(500).json({ message: 'Error al actualizar inventario' });
  }
});

module.exports = router;
