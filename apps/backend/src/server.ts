import bodyParser from "body-parser";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/allroutes";

const { json, urlencoded } = bodyParser;

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(cookieParser())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/", (_, res) => {
      return res.json({ ok: true });
    })
    .use("/api", router); // add a router which will handle pizza list

  return app;
};
