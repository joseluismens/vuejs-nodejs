
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import routes from "./routes/Index.routes";
import "reflect-metadata";

const app= express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api",routes);

export default app;