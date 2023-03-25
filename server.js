import express, { json, urlencoded } from "express";
import connectDB from "./config/db.js";
import router from "./routes/contact.js";
import path from 'path';
import colors from "colors";
import { fileURLToPath } from 'url';

// APP
const app = express();

//PORT
const PORT = process.env.PORT || 5000;

//INDEX FILE
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

//connection to database
connectDB();

// middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// routes
app.use("/contact/", router);

//PORT LISTENING
app.listen(PORT, () =>
  console.log(
    "Server is live and running on port: ".bgBlack + `${PORT}`.bgGreen
  )
);
