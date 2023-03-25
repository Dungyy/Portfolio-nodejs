import { Router } from "express";
import {
  contactFormValidation,
  contactForm,
} from "../controller/contactController.js";

const router = Router();

router.post("/api/contact", contactFormValidation, contactForm);

export default router;
