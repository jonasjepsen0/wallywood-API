import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT ?? 4000;

app.get("/", (_req, res) => res.send("Hello"));
app.listen(port, () => console.log(`http://localhost:${port}`));