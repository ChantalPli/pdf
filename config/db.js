import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Connection error:', error);
        });
};

