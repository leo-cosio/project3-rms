const { Router } = require("express");
const { auth } = require("../middlewares/auth.mid");
const users = require("./users.controller");
const config = require("../lib/config");
const router = Router();
const cors = require("../lib/cors");

if (config.get("cors.enabled")) router.use(cors);

//? User controllers

//* AUTH
router.post("/login", users.login);
router.delete("/sessions", auth, users.logout);

//* CRUD
router.post("/users", users.create);
router.patch("/users/:username", users.update);
router.delete("/users/:username", users.remove);

module.exports = router;
