const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");

// Admin middleware to check if user is admin
const adminMiddleware = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

// Users routes
router.get("/users", authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleware, adminController.getUserById);
router.patch("/users/:id", authMiddleware, adminMiddleware, adminController.updateUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, adminController.deleteUser);

// Services routes
router.get("/services", authMiddleware, adminMiddleware, adminController.getAllServices);
router.post("/services", authMiddleware, adminMiddleware, adminController.createService);
router.get("/services/:id", authMiddleware, adminMiddleware, adminController.getServiceById);
router.patch("/services/:id", authMiddleware, adminMiddleware, adminController.updateService);
router.delete("/services/:id", authMiddleware, adminMiddleware, adminController.deleteService);

// Contacts routes
router.get("/contacts", authMiddleware, adminMiddleware, adminController.getAllContacts);
router.delete("/contacts/:id", authMiddleware, adminMiddleware, adminController.deleteContact);

module.exports = router;
