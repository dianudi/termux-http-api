import express, { Express, Response } from "express";
import "express-async-errors";
import http, { Server } from "node:http";
import swaggerUi from "swagger-ui-express";
import { rootSpec } from "./swaggerDocs.js";
import { serverError } from "./middlewares/errorCatcher.js";
import auth from "./routes/auth.js";
import termux from "./routes/termux.js";

const app: Express = express();
const server: Server = http.createServer(app);
app.disable("x-powered-by");
app.use(express.json());
app.get("/", (_, res: Response) => res.redirect("/docs"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(rootSpec, {
    explorer: false,
    customSiteTitle: "Termux API HTTP",
  })
);
app.use(auth);
app.use(termux);
app.use(serverError);
server.listen(3000);
