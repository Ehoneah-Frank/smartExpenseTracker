import express from 'express'
import dbConnection from './config/db.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import budgetRouter from './routes/budgetRoute.js'




// Connect to database
dbConnection();


// Create an express app
const trackerApp = express();

// use middlewares
trackerApp.use(express.json());

// Routes
trackerApp.use( '/auth', authRouter);
trackerApp.use( '/user', userRouter);
trackerApp.use('/expenses', expenseRouter);
trackerApp.use( '/category', categoryRouter);
trackerApp.use( '/budget', budgetRouter)

const port = process.env.PORT || 8000;

// connect to a port
trackerApp.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});