'use strict';

class EFQueryConverterZigbee2MqttHelper {

    /**
     * Convert Zigbee2Mqtt sensors to EFQ
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {{payload: {deviceType: *, deviceData: {}, additionalData: {}, deviceConnection: *}}}
     */
    static input_sensors(messageFormat, deviceType, inputPayload) {
        let msg = {
            payload: {
                messageFormat: messageFormat,
                deviceType: deviceType,
                deviceData: {},
                additionalData: {}
            }
        };

        // Contact Sensor
        if (deviceType === 'contact_sensor') {
            if (inputPayload.hasOwnProperty('contact')) {
                msg.payload.deviceData.contact = inputPayload.contact ? "CONTACT" : "NO_CONTACT";
            }
        }

        // Motion Sensor
        if (deviceType === 'motion_sensor') {
            if (inputPayload.hasOwnProperty('illuminance')) {
                msg.payload.deviceData.illuminance = inputPayload.illuminance;
            }
            if (inputPayload.hasOwnProperty('illuminance_lux')) {
                msg.payload.deviceData.illuminanceLux = inputPayload.illuminance_lux;
            }

            if (inputPayload.hasOwnProperty('occupancy')) {
                msg.payload.deviceData.occupancy = inputPayload.occupancy;
            }
        }

        // Vibration Sensor
        if (deviceType === 'vibration_sensor') {
            if (inputPayload.hasOwnProperty('action')) {
                msg.payload.deviceData.action = inputPayload.action;
            }

            if (inputPayload.hasOwnProperty('strength')) {
                msg.payload.deviceData.strength = inputPayload.strength;
            }

            if (inputPayload.hasOwnProperty('angle')) {
                msg.payload.deviceData.angle = inputPayload.angle;
            }

            if (inputPayload.hasOwnProperty('angleX')) {
                msg.payload.deviceData.angleX = inputPayload.angleX;
            }

            if (inputPayload.hasOwnProperty('angleXAbsolute')) {
                msg.payload.deviceData.angleXAbsolute = inputPayload.angleXAbsolute;
            }

            if (inputPayload.hasOwnProperty('angleY')) {
                msg.payload.deviceData.angleY = inputPayload.angleY;
            }

            if (inputPayload.hasOwnProperty('angleYAbsolute')) {
                msg.payload.deviceData.angleYAbsolute = inputPayload.angleYAbsolute;
            }

            if (inputPayload.hasOwnProperty('angleZ')) {
                msg.payload.deviceData.angleZ = inputPayload.angleZ;
            }
        }

        // Additional Data
        if (deviceType === 'contact_sensor' || deviceType === 'vibration_sensor') {
            if (inputPayload.hasOwnProperty('battery')) {
                msg.payload.additionalData.battery = inputPayload.battery;
            }

            if (inputPayload.hasOwnProperty('voltage')) {
                msg.payload.additionalData.voltage = inputPayload.voltage;
            }
        }

        if (deviceType === 'contact_sensor' || deviceType === 'motion_sensor' || deviceType === 'vibration_sensor') {
            if (inputPayload.hasOwnProperty('linkquality')) {
                msg.payload.additionalData.linkQuality = inputPayload.linkquality;
            }
        }

        return msg;
    }

    static input_plug(messageFormat, deviceType, inputPayload) {
        let msg = {
            payload: {
                messageFormat: messageFormat,
                deviceType: deviceType,
                deviceData: {},
                additionalData: {}
            }
        };

        // Plugs
        if (deviceType === 'plug') {
            if (inputPayload.hasOwnProperty('state')) {
                msg.payload.deviceData.power = inputPayload.state;
            }

            if (inputPayload.hasOwnProperty('linkquality')) {
                msg.payload.additionalData.linkQuality = inputPayload.linkquality;
            }
        }

        return msg;
    }

    static output_plug(messageFormat, deviceType, inputPayload) {
        let msg = {
            payload: {}
        };

        // Plugs
        if (deviceType === 'plug') {
            // Power
            if (inputPayload.hasOwnProperty('messageFormat') && inputPayload.hasOwnProperty('deviceType') && inputPayload.hasOwnProperty('deviceData')) {
                msg.payload = {
                    state: inputPayload.deviceData.power
                };
            }
        }

        return msg;
    }

    static input_bulbs(messageFormat, deviceType, inputPayload) {
        const devicesBulbs = ['bulb', 'bulb_ww', 'bulb_rgb', 'bulb_rgbw'];
        let msg = {
            payload: {
                messageFormat: messageFormat,
                deviceType: deviceType,
                deviceData: {},
                additionalData: {}
            }
        };

        // Bulbs
        if (devicesBulbs.indexOf(deviceType) !== -1) {
            if (inputPayload.hasOwnProperty('state')) {
                msg.payload.deviceData.power = inputPayload.state;
            }

            if (inputPayload.hasOwnProperty('brightness')) {
                // / 2, cause Bulbs have a Dimm Value to 200
                msg.payload.deviceData.dimmer = inputPayload.brightness > 1 ? (inputPayload.brightness / 2) : 1;
            }

            if (inputPayload.hasOwnProperty('linkquality')) {
                msg.payload.additionalData.linkQuality = inputPayload.linkquality;
            }
        }

        return msg;
    }

    static output_bulbs(messageFormat, deviceType, inputPayload) {
        const devicesBulbs = ['bulb', 'bulb_ww', 'bulb_rgb', 'bulb_rgbw'];
        let msg = {
            payload: {}
        };

        // Bulbs
        if (devicesBulbs.indexOf(deviceType) !== -1) {
            // Power
            if (inputPayload.hasOwnProperty('messageFormat') && inputPayload.hasOwnProperty('deviceType') && inputPayload.hasOwnProperty('deviceData')) {
                msg.payload = {
                    state: inputPayload.deviceData.power
                };

                if (inputPayload.deviceData.hasOwnProperty('dimmer')) {
                    // * 2, cause Bulbs have a Dimm Value to 200
                    msg.payload.brightness = inputPayload.deviceData.dimmer > 1 ? (inputPayload.deviceData.dimmer * 2) : 1;
                }
            }
        }

        return msg;
    }
}

module.exports = EFQueryConverterZigbee2MqttHelper;