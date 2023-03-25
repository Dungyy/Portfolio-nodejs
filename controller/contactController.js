import Contact from "../models/Contact.js";
import { check, validationResult } from "express-validator";

const contactFormValidation = [
  check("name").trim().escape().notEmpty().withMessage("Name is required"),
  check("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),
  check("message")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Message is required"),
];

const contactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Validate input
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send({
      message: "Missing required fields: name, email, message",
    });
  }

  // Create Contact in database
  try {
    const newContactMsg = await Contact.create({ name, email, message });

    // Redirect back to the main page
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error sending email" });
  }
};

export { contactFormValidation, contactForm };
