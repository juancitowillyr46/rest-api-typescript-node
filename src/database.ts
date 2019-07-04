import mongoose from 'mongoose';
import configApp from './config/app';

mongoose.connect(configApp.getConnectionString(), { useNewUrlParser: true }, () => {
 console.log('Connected to DB');
}).then(
 () => {
  console.log('Database is connected');
 },
 (err) => {
  console.log("Can not connect to the database'+ err");
  throw new Error(`unable to connect to database: ${configApp.getConnectionString()}`);
 }
);