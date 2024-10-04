import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

import routes from './routes/contactRoutes';
import cors from './middlewares/cors';
import sanitizedConfig from "./config";
import { Server } from 'http';

const PORT: number | string = sanitizedConfig.PORT || 3000;
//const MONGO_URL = 'mongodb://localhost:27017/';

const connectDb = async () => {
  try {                                      
    const connection = await mongoose.connect(sanitizedConfig.MONGO_URI);
    console.log(`🟢 Mongo db connected:`, connection.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDb();
  
const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
// be carefull, if this is not right, you wont see the images in FrontEnd

console.log("Estoy en index - line 31 - path.resolve(__dirname, '.', 'uploads')): "+path.resolve(__dirname, '..', 'uploads'))

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '.', 'uploads')));

const server: Server = app.listen(PORT, () =>
  console.log(
    `🟢 Server running in ${sanitizedConfig.NODE_ENV} mode on port ${PORT}`
  )
);