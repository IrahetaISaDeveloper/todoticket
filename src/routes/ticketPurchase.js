import express from "express";
import ticketController from "../controllers/ticketPurchaseController.js";

import {validateAuthCookie} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
.get(validateAuthCookie(["admin"]), ticketController.getAllPurchases)
.post(validateAuthCookie(["customer"]),ticketController.createPurchase)

router.route("/:id")
.put (validateAuthCookie(["admin", "customer"]),ticketController.updatePurchase)
.delete(validateAuthCookie(["admin"]), ticketController.deletePurchase)

export default router;