const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
        console.log('connected to database');
    } catch (err) {
        throw err;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log("database got disconnected!");
});



app.use(express.json());


app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/product', productRoutes);
app.listen(process.env.port || 8000, () => {
    connectDB();
    console.log("server is up and running.")
})
