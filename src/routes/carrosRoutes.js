import express from "express";
import { createCarro, getCarrosByid, deleteCarro, updateCarro, filtrarCarros } from "../controllers/carrosController.js";

const router = express.Router();

router.get("/:id", getCarrosByid);
router.post("/", createCarro);
router.delete("/:id", deleteCarro);
router.put("/:id", updateCarro);
router.get("/", filtrarCarros);

export default router;