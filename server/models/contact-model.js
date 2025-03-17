const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must not be more than 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    email: [true, "Invalid email format"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
}, {timestamps: true});


// Create a model or a collection
const Contact = model("Contact", contactSchema);
module.exports = Contact;