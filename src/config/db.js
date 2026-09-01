import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`CONNECTED TO HOST : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('MONGODB CONNECTION ERROR: ', error);
    process.exit(1);
  }
};

export { connectDB };
