import { connect } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (conn && conn.connection && conn.connection.host) {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.error("Unable to connect to MongoDB");
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
