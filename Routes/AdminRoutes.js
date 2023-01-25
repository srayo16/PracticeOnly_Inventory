const router = require("express").Router();
const { addAdmin, getAllAdminData, getAdminById, getCurrentAdmin, deleteAllAdminData, deleteAdminById, findSpecific, findSpecificTwo, updateById } = require("../Controller/AdminController");
const auth = require("../Middleware/AdminAuthMiddleWare");
const upload = require("../Middleware/ImageUploadMiddleWare");

router.post("/add", upload.single("image"), addAdmin);
router.get("/all", getAllAdminData);
router.get("/:id", getAdminById);
router.get("/", auth, getCurrentAdmin);
router.delete("/delete", auth, deleteAllAdminData);
router.delete("/delete/:id", auth, deleteAdminById);
router.get("/get", findSpecific);
router.get("/email/:email", findSpecificTwo);
router.put("/:id", auth, upload.single("image"), updateById);

module.exports = router;