import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging for developer visibility
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'E-Commerce Filtering API', timestamp: new Date() });
});

// Routes
app.use('/api/products', productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 E-Commerce Backend Server running on http://localhost:${PORT}`);
    console.log(`📡 Product API: http://localhost:${PORT}/api/products`);
    console.log(`📊 Metadata API: http://localhost:${PORT}/api/products/meta`);
  });
}

export default app;
