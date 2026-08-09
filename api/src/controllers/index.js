const { Router } = require("express");
const { auth, requiredRole } = require("../middlewares/auth.mid");
const users = require("./users.controller");
const config = require("../lib/config");
const router = Router();
const cors = require("../lib/cors");

if (config.get("cors.enabled")) router.use(cors);

//? - User Routes

//*   - AUTH
router.post("/login", users.login);
router.delete("/sessions", auth, users.logout);

//*   - CRUD
router.post("/users", auth, requiredRole("admin"), users.create);
// READ?
router.patch("/users/:username", auth, requiredRole("admin"), users.update);
router.delete("/users/:username", auth, requiredRole("admin"), users.remove);

module.exports = router;
