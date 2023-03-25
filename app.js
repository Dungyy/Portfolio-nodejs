import express, { json, urlencoded } from "express";
import router from "./routes/contact.js";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import colors from "colors";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

// APP
const app = express();

//security
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//HDML FOLDER
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

//Allowing to Post
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://portfolio-nodejs-dungyy.vercel.app/");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");
  next();
});

// middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// routes
app.use("/", router);

export default app;
