const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
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
    min: 8,
    max: 16,
  },
});
