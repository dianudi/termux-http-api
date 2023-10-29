import { Router } from "express";
import {
  batteryStatus,
  captureCamera,
  cellInfo,
  changeAudioVolume,
  contacts,
  deviceInfo,
  getCallLogs,
  getCurrentAudioVolume,
  getSms,
  location,
  notifications,
  scanWifi,
  sendSms,
  setBrightness,
  triggerVibrate,
  wifiInfo,
} from "../controllers/termuxController.js";
import { mustLogin } from "../middlewares/auth.js";

const termux: Router = Router();
termux.use(mustLogin);
/**
 * @swagger
 * /battery-status:
 *   get:
 *     description: Get battery status from android phone.
 *     summary: Get Battery Status
 *     tags:
 *       - System
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return current battery status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 health:
 *                   type: string
 *                   description: Current health of battery
 *                   example: GOOD
 *                 percentage:
 *                   type: integer
 *                   description: Current percentage capacity of battery
 *                   example: 100
 *                 plugged:
 *                   type: string
 *                   description: State battery in charging or not
 *                   example: UNPLUGGED
 *                 status:
 *                   type: string
 *                   description: State battery in charging or not
 *                   example: UNPLUGGED
 *                 temperature:
 *                   type: float
 *                   description: Current temperature of battery
 *                   example: 100
 *                 current:
 *                   type: integer
 *                   description: Current usage in mikroampere of battery
 *                   example: -26000
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/battery-status").get(batteryStatus);
/**
 * @swagger
 * /brightness:
 *   put:
 *     description: Change screen brighness to android phone.
 *     summary: Set brightness android phone.
 *     tags:
 *       - System
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Required parameters to send.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: integer
 *                 description: Integer value from 1 to 255
 *                 example: 255
 *     responses:
 *       204:
 *         description: Changed
 *       401:
 *         description: Authorization information is missing or invalid.
 *       422:
 *         description: Unprocessed entity.
 */
termux.route("/brightness").put(setBrightness);
/**
 * @swagger
 * /vibrate:
 *   post:
 *     description: Trigger vibration to android phone.
 *     summary: Trigger a vibration.
 *     tags:
 *       - System
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Triggered
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/vibrate").post(triggerVibrate);
/**
 * @swagger
 * /volume:
 *   get:
 *     description: Get current audio volume from android phone.
 *     summary: Get current audio volume.
 *     tags:
 *       - System
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Get current audio volume.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   stream:
 *                     type: string
 *                     example: music
 *                   volume:
 *                     type: integer
 *                     example: 4
 *                   max_volume:
 *                     type: integer
 *                     example: 6
 *       401:
 *         description: Authorization information is missing or invalid.
 *   put:
 *     description: Change audio volume to android phone.
 *     summary: Change audio volume.
 *     tags:
 *       - System
 *     requestBody:
 *       description: Required parameters to send.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stream:
 *                 type: string
 *                 description: Type of stream name.
 *                 example: music
 *               volume:
 *                 type: integer
 *                 description: Value range of audio volume.
 *                 example: 4
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Changed
 *       401:
 *         description: Authorization information is missing or invalid.
 *       422:
 *         description: Unprocessed entity.
 */
termux.route("/volume").get(getCurrentAudioVolume).put(changeAudioVolume);
/**
 * @swagger
 * /notifications:
 *   get:
 *     description: Get list of notification on android phone.
 *     summary: Get list of notification.
 *     tags:
 *       - System
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return list of notification.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 0
 *                   tag:
 *                     type: string
 *                     example: 0|com.android.messaging|0|com.android.messaging:sms:|10278
 *                   group:
 *                     type: string
 *                     example: lorem impsum dolor sit amet
 *                   packageName:
 *                     type: string
 *                     example: com.android.messaging
 *                   title:
 *                     type: string
 *                     example: 3TopUp
 *                   content:
 *                     type: string
 *                     example: lorem ipsum dolor sit amet
 *                   when:
 *                     type: string
 *                     example: 2023-10-29 07:49:10
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/notifications").get(notifications);
/**
 * @swagger
 * /location:
 *   get:
 *     description: Return current location from gps phone.
 *     summary: Get location from gps.
 *     tags:
 *       - System
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return location from gps.
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/location").get(location);
/**
 * @swagger
 * /call-log:
 *   get:
 *     description: Return call log from android phone.
 *     summary: Get call logs.
 *     tags:
 *       - Phone Utility
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return call log.
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/call-log").get(getCallLogs);
/**
 * @swagger
 * /contacts:
 *   get:
 *     description: Return list of contact in contact apps.
 *     summary: Get saved contact list.
 *     tags:
 *       - Phone Utility
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return list of contact.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Dianudi
 *                   number:
 *                     type: string
 *                     example: 081234567890
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/contacts").get(contacts);
/**
 * @swagger
 * /sms:
 *   get:
 *     description: Return list of sms from inbox in android sms apps.
 *     summary: Get list of sms.
 *     tags:
 *       - Phone Utility
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return list of sms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   threadedid:
 *                     type: integer
 *                     example: 10
 *                   type:
 *                     type: string
 *                     example: inbox
 *                   read:
 *                     type: boolean
 *                     example: true
 *                   number:
 *                     type: string
 *                     example: ExampleFrom
 *                   received:
 *                     type: string
 *                     example: 2023-10-25 04:32:49
 *       401:
 *         description: Authorization information is missing or invalid.
 *   post:
 *     description: Create and send sms.
 *     summary: Send single or multiple sms.
 *     tags:
 *       - Phone Utility
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: List of Text field for sms.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 to:
 *                   type: string
 *                   description: Number to deliver this sms.
 *                   example: 081234567890
 *                 body:
 *                   type: string
 *                   description: Sms text body.
 *                   example: lorem ipsum dolor sit amet.
 *     responses:
 *       201:
 *         description: Success create sms and send it.
 *       401:
 *         description: Authorization information is missing or invalid.
 *
 */
termux.route("/sms").get(getSms).post(sendSms);
/**
 * @swagger
 * /media/camera:
 *   get:
 *     description: Get camera information or capture image from android camera.
 *     summary: Camera information or capture image from camera.
 *     tags:
 *       - Media
 *     parameters:
 *       - in: query
 *         name: cam_number
 *         schema:
 *           type: integer
 *         description: Capture an image from rear or front camera default rear.
 *         required: true
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return information camera on android or Return image file.
 *         content:
 *           image/jpg:
 *             type: string
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 0
 *                   facing:
 *                     type: string
 *                     example: back
 *                   jpeg_output_sizes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         width:
 *                           type: integer
 *                           example: 4160
 *                         height:
 *                           type: integer
 *                           example: 2340
 *                   focal_lengths:
 *                     type: array
 *                     items:
 *                       type: number
 *                       example: 0.045454545
 *                   auto_exposure_modes:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: CONTROL_AE_MODE_OFF
 *                   physical_size:
 *                     type: object
 *                     properties:
 *                       width:
 *                         type: number
 *                         example: 3.4545656765
 *                       height:
 *                         type: number
 *                         example: 3.234566
 *                   capabilities:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: manual_sensor
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/media/camera").get(captureCamera);
/**
 * @swagger
 * /network/cell-info:
 *   get:
 *     description: Return current cellular information.
 *     summary: Get cellular information.
 *     tags:
 *       - Network Information
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return cellular information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: lte
 *                   registered:
 *                     type: boolean
 *                     example: true
 *                   asu:
 *                     type: integer
 *                     example: 47
 *                   dbm:
 *                     type: integer
 *                     example: -65
 *                   level:
 *                     type: integer
 *                     example: 3
 *                   ci:
 *                     type: integer
 *                     example: 4206969
 *                   cid:
 *                     type: integer
 *                     example: 456
 *                   pci:
 *                     type: integer
 *                     example: 420
 *                   tac:
 *                     type: integer
 *                     example: 321321
 *                   lac:
 *                     type: integer
 *                     example: 3456
 *                   mcc:
 *                     type: integer
 *                     example: 555
 *                   mnc:
 *                     type: integer
 *                     example: 76
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/network/cell-info").get(cellInfo);
/**
 * @swagger
 * /network/device-info:
 *   get:
 *     description: Return current device cellular information.
 *     summary: Get device cellular information.
 *     tags:
 *       - Network Information
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return device information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data_enabled:
 *                   type: string
 *                   example: true
 *                 data_activity:
 *                   type: string
 *                   example: none
 *                 data_state:
 *                   type: string
 *                   example: disconnected
 *                 device_id:
 *                   type: string
 *                   example: 0
 *                 device_software_version:
 *                   type: string
 *                   example: 00
 *                 phone_count:
 *                   type: integer
 *                   example: 2
 *                 phone_type:
 *                   type: string
 *                   example: gsm
 *                 network_operator:
 *                   type: string
 *                   example: 0987
 *                 network_operator_name:
 *                   type: string
 *                   example: lorem
 *                 network_country_iso:
 *                   type: string
 *                   example: id
 *                 network_type:
 *                   type: string
 *                   example: lte
 *                 network_roaming:
 *                   type: boolean
 *                   example: false
 *                 sim_country_iso:
 *                   type: string
 *                   example: id
 *                 sim_operator:
 *                   type: string
 *                   example: 676437
 *                 sim_operator_name:
 *                   type: string
 *                   example: lorem
 *                 sim_serial_number:
 *                   type: string
 *                   example: null
 *                 sim_subscriber_id:
 *                   type: string
 *                   example: null
 *                 sim_state:
 *                   type: string
 *                   example: ready
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/network/device-info").get(deviceInfo);
/**
 * @swagger
 * /network/wifi/connection-info:
 *   get:
 *     description: Return current Wifi connection information.
 *     summary: Get wifi network information.
 *     tags:
 *       - Network Information
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return Wifi connection information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bssid:
 *                   type: string
 *                   example: aa:aa:aa:aa:aa:aa
 *                 frequency_mhz:
 *                   type: integer
 *                   example: 2412
 *                 ip:
 *                   type: string
 *                   example: 192.168.1.2
 *                 link_speed_mbps:
 *                   type: integer
 *                   example: 72
 *                 mac_address:
 *                   type: string
 *                   example: aa:bb:cc:dd:ee:ff
 *                 network_id:
 *                   type: integer
 *                   example: 2
 *                 rssi:
 *                   type: integer
 *                   example: -56
 *                 ssid:
 *                   type: string
 *                   example: Lorem SSID
 *                 ssid_hidden:
 *                   type: boolean
 *                   example: false
 *                 supplicant_state:
 *                   type: string
 *                   example: COMPLETED
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/network/wifi/connection-info").get(wifiInfo);
/**
 * @swagger
 * /network/wifi/scan-info:
 *   get:
 *     description: Return current discovery wifi information.
 *     summary: Scan wifi on android phone.
 *     tags:
 *       - Network Information
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return discovery wifi information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bssid:
 *                     type: string
 *                     example: aa:bb:cc:dd:ee:ff
 *                   frequency_mhz:
 *                     type: string
 *                     example: 2412
 *                   rssi:
 *                     type: integer
 *                     example: -69
 *                   ssid:
 *                     type: string
 *                     example: Lorem AP
 *                   timestamp:
 *                     type: string
 *                     example: 1234567890
 *                   channel_bandwidth_mhz:
 *                     type: string
 *                     example:
 *       401:
 *         description: Authorization information is missing or invalid.
 */
termux.route("/network/wifi/scan-info").get(scanWifi);

export default termux;
