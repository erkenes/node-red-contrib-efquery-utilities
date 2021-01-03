# node-red-contrib-efquery-utilities
Node-Red Nodes for a better working with Tasmota, zigbee2mqtt and Alexa.

Available Nodes are:
* **efquery-converter-tasmota**: Converts an incoming tasmota payload to EFQuery or converts an incoming EFQuery to Tasmota-Query.
* **efquery-converter-zigbee2mqtt**: Converts an incoming zigbee2mqtt payload to EFQuery or converts an incoming EFQuery to zigbee2mqtt-Query.
* **efquery-converter-alexa**: Converts an incoming alexa payload to EFQuery or converts an incoming EFQuery to alexa-Query.

---

## What works:

### zigbee2mqtt:

* Convert Sensors to EFQuery: `motion_sensor`, `contact_sensor`, `vibration_sensor`
* Convert Plugs to EFQuery: `plug`
* Convert Bulbs to EFQuery: `bulb`


* Convert EFQuery plugs to zigbee2mqtt: `plug`
* Convert EFQuery bulbs to zigbee2mqtt: `bulb`

### tasmota

* Convert bulbs to EFQuery: `bulb`, `bulb_ww`, `bulb_rgb`, `bulb_rgbw`
* Convert Plugs to EFQuery: `plug`


* Convert EFQuery bulbs to Tasmota: `bulb`, `bulb_ww`, `bulb_rgb`, `bulb_rgbw`
* Convert EFQuery plugs to Tasmota: `plug`



### alexa:

* Convert bulbs to EFQuery: `bulb`, `bulb_ww`, `bulb_rgb`, `bulb_rgbw`
* Convert Plugs to EFQuery: `plug`


* Convert EFQuery bulbs to Alexa: `bulb`, `bulb_ww`, `bulb_rgb`, `bulb_rgbw`
* Convert EFQuery plugs to Alexa: `plug`
* Convert EFQuery sensors to Alexa: `motion_sensor`, `contact_sensor`

---

## What is missing:

### zigbee2mqtt:

### tasmota:

### alexa:

---

## Future Features
Second Repository for EFQuery-Devices or EFQuery-Tools.

### zigbee2mqtt

* Convert bulbs to EFQuery: `bulb_ww`, `bulb_rgb`, `bulb_rgbw`
* Convert EFQuery bulbs to zigbee2mqtt: `bulb_ww`, `bulb_rgb`, `bulb_rgbw`

### alexa:

* Convert EFQuery smart locks to Alexa: `smart_lock`