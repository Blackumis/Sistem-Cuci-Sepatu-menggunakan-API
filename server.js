const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

const itemsRoutes = require('./routes/items');

app.use('/items', itemsRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di API Cuci Sepatu',
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});