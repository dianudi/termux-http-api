import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

async function mustLogin(req: Request, res: Response, next: NextFunction) {
  // console.log(req.headers);
  // return res.sendStatus(200);
  if (req.headers["authorization"]) {
    if (req.headers["authorization"].split(" ")[0] !== "Bearer") {
      throw new Error("Type authorization error");
    }
    if (req.headers["authorization"][1]) {
      const file = existsSync(path.resolve("credential.json"))
        ? await fs.readFile(path.resolve("credential.json"))
        : null;
      if (!file) {
        throw new Error("Credential not found");
      }
      const { password } = JSON.parse(Buffer.from(file).toString());
      if (jwt.verify(req.headers["authorization"].split(" ")[1], password))
        next();
      return res.status(401);
    }
  }
}

export { mustLogin };
