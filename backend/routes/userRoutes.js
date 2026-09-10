const express = require("express");

const {
    getUsers,
    deleteUser
} = require("../controllers/userController");

const {
    authMiddleware,
    adminMiddleware
} = require("../middleware/authMiddleWare");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getUsers
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);

module.exports = router;