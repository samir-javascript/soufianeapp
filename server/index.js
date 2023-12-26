import path from 'path';
import express from 'express';
import productsRoutes from './Routes/productsRoutes.js';
import usersRoutes from './Routes/usersRoutes.js';
import uploadsRoutes from './Routes/uploadsRoutes.js';
import ordersRoutes from './Routes/ordersRoutes.js';
import wishlistsRoutes from './Routes/wishlistsRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDb } from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
const __dirname = path.resolve();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'uploads' folder
//const __dirname = path.resolve();
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// CORS configuration
app.use(cors({ credentials: true, origin: '*' }));

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/add-to-wishlist', wishlistsRoutes);

// Serve the client build in production
/*if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('hello world 2024 is coming');
  });
}*/

if (process.env.NODE_ENV === 'production') {
  
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`APP IS RUNNING ON PORT ${PORT}`));
