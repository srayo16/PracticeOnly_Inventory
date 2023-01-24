const router = require("express").Router();
const { addAdmin, getAllAdminData } = require("../Controller/AdminController");
const auth = require("../Middleware/AdminAuthMiddleWare");

router.post("/add", addAdmin);
router.get("/all", getAllAdminData);

module.exports = router;