import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index.js';
import errorMiddleware from './middlewares/error-middleware.js';
import logMiddleware from './middlewares/log-middleware.js';
import paymentController from './controllers/payment-controller.js';

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);
app.use(express.json());
// app.use(logMiddleware);
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
  // origin: true,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
      console.error(e);
  }
};

start();
