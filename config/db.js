import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database Connected Successfully`.brightGreen +
        ` <===> `.random +
        `${conn.connection.host}`.bgBlack
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.error);
    process.exit(1);
  }
};

export default connectDB;
