const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const auth = require('../middleware/auth');

// Obtener todos los productos (público)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Obtener producto por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar producto' });
  }
});

// Crear producto (protegido)
router.post('/', auth, async (req, res) => {
  const { name, stock, minStock } = req.body;

  try {
    const newProduct = new Product({ name, stock, minStock });
    await newProduct.save();
    res.status(201).json({ message: 'Producto creado', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

// Actualizar un producto (protegido)
router.put('/:id', auth, async (req, res) => {
  const { name, stock, minStock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, stock, minStock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

// Eliminar un producto (protegido)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;
