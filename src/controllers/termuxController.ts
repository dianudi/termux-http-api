import { Request, Response } from "express";
import { spawnSync } from "node:child_process";
import Joi from "joi";
import { unlinkSync } from "node:fs";
import path from "node:path";

function batteryStatus(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-battery", { shell: true });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

async function setBrightness(req: Request, res: Response) {
  const data = Joi.object({
    value: Joi.number().required().min(1).max(255),
  });

  data
    .validateAsync(req.body)
    .then((value) => {
      const { stderr } = spawnSync("termux-wifi-scaninfo", { shell: true });
      if (stderr)
        throw new Error(
          `Failed to execute program reason: ${stderr.toString()}`
        );
      return res.sendStatus(200);
    })

    .catch((error) => {
      return res
        .status(422)
        .json(
          error.details.map((item: any) => new Object({ msg: item.message }))
        );
    });
}

function triggerVibrate(_: Request, res: Response) {
  const { stderr } = spawnSync("termux-vibrate", { shell: true });
  if (stderr)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.sendStatus(200);
}

function getCurrentAudioVolume(_: Request, res: Response) {
  return res.status(200);
}

function changeAudioVolume(req: Request, res: Response) {
  return res.status(200);
}

function notifications(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-notification-list", {
    shell: true,
  });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function location(_: Request, res: Response) {
  return res.status(200).send("Pending...");
}
function getCallLogs(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-call-log", { shell: true });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function contacts(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-contact-list", { shell: true });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function getSms(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-sms-list", { shell: true });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

async function sendSms(req: Request, res: Response) {
  const schemaValidation = Joi.array().items({
    sim_slot: Joi.number().min(0).required(),
    to: Joi.string().required(),
    body: Joi.string().required().max(255),
  });
  try {
    await schemaValidation.validateAsync(req.body);
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      const validError: Joi.ValidationError = error;
      return res.status(422).json(validError.details);
    }
  }
  const smsList = req.body;
  smsList.forEach((sms: any) => {
    const { stdout, stderr } = spawnSync(
      `termux-sms-send -n ${sms.to} -s ${sms.sim_slot} ${sms.body}`,
      {
        shell: true,
      }
    );
    if (stderr || stdout == null)
      throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  });
  return res.sendStatus(200);
}

function captureCamera(req: Request, res: Response) {
  if (req.get("accept") === "application/json") {
    const { stdout, stderr } = spawnSync("termux-camera-info", { shell: true });
    if (stderr || stdout == null)
      throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
    return res.json(Buffer.from(stdout).toString());
  }
  const { stderr } = spawnSync(
    `termux-camera-photo -c ${
      req.query.cam_number ? req.query.cam_number : 0
    } cap.jpeg`,
    {
      shell: true,
    }
  );
  if (stderr)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  res.sendFile(path.resolve("cap.jpeg"));
  unlinkSync(path.resolve("cap.jpeg"));
}
function cellInfo(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-telephony-cellinfo", {
    shell: true,
  });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function deviceInfo(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-telephony-deviceinfo", {
    shell: true,
  });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function wifiInfo(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-wifi-connectioninfo", {
    shell: true,
  });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function scanWifi(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-wifi-scaninfo", { shell: true });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

export {
  batteryStatus,
  setBrightness,
  triggerVibrate,
  getCurrentAudioVolume,
  changeAudioVolume,
  notifications,
  getCallLogs,
  contacts,
  location,
  getSms,
  sendSms,
  captureCamera,
  cellInfo,
  deviceInfo,
  wifiInfo,
  scanWifi,
};
