const itemModel = require('../models/itemModel');

const validStatus = ['Menunggu', 'Proses', 'Selesai'];

async function listItems(req, res) {
  try {
    const { status } = req.query;
    const items = await itemModel.getAllItems({ status });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getItem(req, res) {
  try {
    const { id } = req.params;
    const item = await itemModel.getItemById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createItem(req, res) {
  try {
    const { id, namaPelanggan, jenisSepatu, layanan, harga, status } = req.body;

    if (!namaPelanggan || !jenisSepatu || !layanan || harga === undefined) {
      return res.status(400).json({ success: false, message: 'namaPelanggan, jenisSepatu, layanan dan harga wajib diisi' });
    }

    const itemStatus = status || 'Menunggu';
    if (!validStatus.includes(itemStatus)) {
      return res.status(400).json({ success: false, message: `Status tidak valid. Pilih: ${validStatus.join(', ')}` });
    }

    const newItem = await itemModel.createItem({ id, namaPelanggan, jenisSepatu, layanan, harga, status: itemStatus });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const changes = req.body;

    if (changes.status && !validStatus.includes(changes.status)) {
      return res.status(400).json({ success: false, message: `Status tidak valid. Pilih: ${validStatus.join(', ')}` });
    }

    const updated = await itemModel.updateItem(id, changes);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const deleted = await itemModel.deleteItem(id);
    res.status(200).json({ success: true, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};
