const express = require("express");

const {
    addMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");

const {
    authMiddleware,
    adminMiddleware
} = require("../middleware/authMiddleWare");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public routes
router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);

// Admin routes
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    addMenuItem
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    updateMenuItem
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteMenuItem
);

module.exports = router;