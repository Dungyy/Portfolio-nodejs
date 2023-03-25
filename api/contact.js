import { contactFormValidation, contactForm } from "../controller/contactController.js";
import { json } from "express";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;
    await contactFormValidation(req, res);
    await contactForm(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default json()(handler);
