const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt & updatedAt

userSchema.pre("save", async function (next) {
    // Hash the password before saving the user model
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
    });

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return  bcrypt.compare(password, this.password);
}

// json web tokens
userSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
  } catch (error) {
    console.error("Error in generateToken:", error);
    return null;
  }
};

// Define the model or the collection name
const User = mongoose.model("User", userSchema);

module.exports = User;
