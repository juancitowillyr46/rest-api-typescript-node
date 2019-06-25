import express from 'express';

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Routes

// Static files

// Starting the server
app.listen(app.get('port'), () => {
 console.log(`Server on port ${app.get('port')}`);
});