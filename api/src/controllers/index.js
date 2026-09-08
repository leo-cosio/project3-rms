const { Router } = require("express");
const router = Router();

const { auth, requiredRole } = require("../middlewares/auth.mid");

const users = require("./users.controller");
const tables = require("./tables.controller");
const items = require("./items.controller");
const orders = require("./orders.controller");

const config = require("../lib/config");
const cors = require("../lib/cors");

if (config.get("cors.enabled")) router.use(cors);

//? - User Routes

//*   - AUTH
router.post("/login", users.login);
router.delete("/sessions", auth, users.logout);
router.get("/auth/me", auth, users.me);

//*   - CRUD
router.post("/users", auth, requiredRole("admin"), users.create);
router.get("/users", auth, requiredRole("admin"), users.list);
router.patch("/users/:username", auth, requiredRole("admin"), users.update);
router.delete("/users/:username", auth, requiredRole("admin"), users.remove);

//? - Table CRUD

router.post("/tables", auth, requiredRole("admin"), tables.create);
router.get("/tables", auth, tables.list);
router.get("/tables/:number", auth, tables.read);
router.patch("/tables/:number", auth, requiredRole("admin"), tables.update);
router.delete("/tables/:number", auth, requiredRole("admin"), tables.remove);

//? - Item CRUD

router.post("/items", auth, requiredRole("admin"), items.create);
router.get("/items", auth, items.read);
router.patch("/items/:itemId", auth, requiredRole("admin"), items.update);
router.delete("/items/:itemId", auth, requiredRole("admin"), items.remove);

//? - Order Routes

router.post("/tables/:number/orders", auth, orders.create);
router.get("/tables/:number/orders", auth, orders.read);
router.patch("/tables/:number/orders", auth, orders.update);
router.post("/tables/:number/orders/close", auth, orders.close);
router.delete("/tables/:number/orders", auth, orders.remove);

module.exports = router;
