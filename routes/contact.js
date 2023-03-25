import { Router } from "express";
import {
  contactFormValidation,
  contactForm,
} from "../controller/contactController.js";

const router = Router();

router.post("/", contactFormValidation, contactForm);

export default router;
