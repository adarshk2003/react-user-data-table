/**
 * EXPRESS REST API SERVER ENTRYPOINT
 */
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[REST Request] ${req.method} -> ${req.url}`);
  next();
});

// REST API Resource Routes
app.use('/api/users', userRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'REST API Server is running smoothly' });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]', err);
  res.status(500).json({ status: 'error', message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Node.js Express REST API Server running on http://localhost:${PORT}`);
});
