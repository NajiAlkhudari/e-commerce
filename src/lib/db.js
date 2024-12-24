


import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName : 'ecommerce',
                useNewUrlParser : true,
                useUnifiedTopology : true,

            });
            console.log('MongoDB connected');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); 
    }
};

export default connectDB;
