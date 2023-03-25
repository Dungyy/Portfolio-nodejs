import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Don't forget to add your name!"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
    },
    message: {
      type: String,
      required: [
        true,
        "This is the most important piece to the contact form, Fill it out!",
      ],
    },
  },
  { timestamps: true }
);

export default model("Contact", ContactSchema);
