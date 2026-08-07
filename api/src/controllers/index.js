const { Router } = require("express");
const { auth } = require("../middlewares/auth.mid");
const users = require("./users.controller");
const config = require("../lib/config");
const router = Router();
const cors = require("../lib/cors");

if (config.get("cors.enabled")) router.use(cors);

router.post("/login", users.login);

module.exports = router;
