import mongoose from 'mongoose';
import 'dotenv/config';


const connectionString = process.env.MONGO_URL;


const dbConnection = async () =>{
    try {
        await mongoose.connect(connectionString);
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error.message)
    }
};
 export default dbConnection;