import { Request, Response } from "express";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

async function login(
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> {
  if (!req.body.password) res.status(422).json({ msg: "Form required" });

  const hash = crypto.createHash("md5").update(req.body.password).digest("hex");
  const file = existsSync(path.resolve("credential.json"))
    ? await fs.readFile(path.resolve("credential.json"))
    : null;
  if (!file) {
    throw new Error("Credential not found");
  }
  const { password } = JSON.parse(Buffer.from(file).toString());
  if (hash !== password) {
    return res.status(422).json({ msg: "Credential not match" });
  }
  const token = jwt.sign(password, password);
  return res.json({ type: "bearer", token });
}

export { login };
