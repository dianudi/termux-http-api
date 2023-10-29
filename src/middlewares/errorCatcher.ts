import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

function serverError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) res.status(500).json({ msg: err.message });
}

export { serverError };
