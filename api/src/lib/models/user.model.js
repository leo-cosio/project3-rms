const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 16,
    },
    type: {
      type: String,
      required: true,
      enum: ["admin", "staff", "reception"],
    },
    password: {
      type: String,
      required: true,
      max: 16,
      match: [
        PASSWORD_PATTERN,
        "Invalid password pattern, needs at least 8 characters",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
