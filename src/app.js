import express from "express";
import cors from "cors";
import emailRouter from "./routes/email-router.mjs";
import { errorMiddleware } from "./middlewares/error.middleware.mjs";
import { config } from "dotenv";
config();

const app = express();
app.set("json spaces", 4);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(
  cors({
    origin: "*", //["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.static("public"));
app.use("/api/emails", emailRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();
