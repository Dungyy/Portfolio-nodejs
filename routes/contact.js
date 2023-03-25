import { Router } from "express";
import {
  contactFormValidation,
  contactForm,
} from "../controller/contactController.js";
import rateLimit from 'express-rate-limit';

const router = Router();


const contactFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many contact form submissions from this IP. Please try again later.'
  });


// router.route("/contact").get(getContacts).post(contactForm);
router.post("/", contactFormLimiter, contactFormValidation, contactForm);

export default router;
