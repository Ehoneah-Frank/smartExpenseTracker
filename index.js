import express from 'express'
import dbConnection from './config/db.js';



// connect to database
dbConnection();



// create an express app
const expensesApp = express()

// Use Middleware
expensesApp.use(express.json());

// setting up the server
const port = process.env.PORT || 8000;
expensesApp.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});