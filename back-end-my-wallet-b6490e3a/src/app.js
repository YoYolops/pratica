import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController.js";
import * as finantialController from "./controllers/finantialController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post("/financial-events", finantialController.createEvent);

app.get("/financial-events", finantialController.getFinantialEvent);

app.get("/financial-events/sum", finantialController.getFinantialEventSum);

export default app;
