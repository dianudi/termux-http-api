import { Request, Response } from "express";
import { spawnSync } from "node:child_process";

function batteryStatus(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-battery", { shell: true });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function setBrightness(req: Request, res: Response) {
  return res.status(200);
}

function triggerVibrate(_: Request, res: Response) {
  const { stderr } = spawnSync("termux-wifi-scaninfo", { shell: true });
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

function location(_: Request, res: Response) {
  return res.status(200);
}

function getSms(_: Request, res: Response) {
  const { stdout, stderr } = spawnSync("termux-sms-list", { shell: true });
  if (stderr || stdout == null)
    throw new Error(`Failed to execute program reason: ${stderr.toString()}`);
  return res.json(Buffer.from(stdout).toString());
}

function sendSms(req: Request, res: Response) {
  return res.status(200);
}

function captureCamera(req: Request, res: Response) {
  return res.status(200);
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
