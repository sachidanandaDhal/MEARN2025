const mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_admin';
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI ;




const connectDb = async () => {
    try {
        if (!URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    }
};
module.exports = connectDb;