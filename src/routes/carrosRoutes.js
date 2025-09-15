import express from "express";
import { createCarro, getCarrosByid, deleteCarro, updateCarro, getFiltrarAllCarros } from "../controllers/carrosController.js";

const router = express.Router();

router.get("/:id", getCarrosByid);
router.post("/", createCarro);
router.delete("/:id", deleteCarro);
router.put("/:id", updateCarro);
router.get("/", getFiltrarAllCarros);

export default router;