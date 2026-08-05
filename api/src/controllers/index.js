const { Router } = require("express");
const { auth } = require("../middlewares/auth.mid");
const config = require("../lib/config");
const router = Router();
