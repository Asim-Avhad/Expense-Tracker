import mongoose from 'mongoose';

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected');
    } catch (error) {
        console.log('Database connection failed');
    }
};

export { db };
