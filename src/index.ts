import express from 'express';
import routes from './routes';
import configApp from './config/app';

// Initializations
const app = express();

// Settings
app.set('port', configApp.getPort());

// Database 
import './database';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(routes);

// Static files

// Starting the server
app.listen(app.get('port'), () => {
 console.log(`Server on port ${app.get('port')}`);
});