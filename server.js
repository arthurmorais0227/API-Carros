import express from "express";
import dotenv from "dotenv";
import carrosRoutes from "./src/routes/carrosRoutes.js"

const app = express();

app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send("VRUUUUUUUUUUUUUMMM  🚗🚘");
});

app.use("/carros", carrosRoutes)

app.listen(serverPort, () => {
  console.log(`🚘 Servidor Carros foi iniciado em: http://localhost:${serverPort}`);
});