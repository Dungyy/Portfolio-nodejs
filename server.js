import app from "./app.js";
import connectDB from "./config/db.js";
import colors from "colors";

const PORT = process.env.PORT || 5000;

// Starting server and then connecting to the database
const startServer = () => {
  try {
    app.listen(PORT, async () => {
      console.log(
        "Production Server running on port:".bgBlack +
          ` <===> `.random +
          `${PORT}`.brightGreen
      );

      try {
        await connectDB();
      } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
