import http from "http";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { createClient } from "redis";

//* The server
const app: Express = express();

//* Redis
const client = createClient();
client.set("visits", 0);

const corsOptions = {
  origin: true,
  methods: ["GET", "POST"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

//* Middlewares
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
});
//* Route
app.get("/", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<p style='color:gray; text-decoration:underline;'>API is running</p>");

  await client.on("error", (err) => console.log("Redis Client Error", err)).connect();
  const visits = await client.get("visits");
  await res.send("Number of visits is:" + visits);
  await client.set("visits", Number(visits) + 1);
  await client.disconnect();
});

//* Port
const portHTTP = (process.env.PORT || 5000) as number;

const httpServer = http.createServer(app);
httpServer.listen({ port: portHTTP }, () => {
  console.log(`Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
