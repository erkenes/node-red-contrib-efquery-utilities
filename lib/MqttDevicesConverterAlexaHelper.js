'use strict';

class MqttDevicesConverterAlexaHelper {

    /**
     * Convert Alexa Bulbs to EFQ Bulbs
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static bulbs_input(messageFormat, deviceType, inputPayload) {
        let msg = {
            acknowledge: true,
            payload: {
                messageFormat: messageFormat,
                deviceType: deviceType,
                deviceData: {},
                additionalData: {}
            }
        };

        if (inputPayload) {
            // POWER
            if (inputPayload === "ON" || inputPayload === "OFF") {
                msg.payload.deviceData.power = inputPayload;
            }

            // CT
            if (inputPayload > 101) {
                msg.payload.deviceData.power = "ON";
                msg.payload.deviceData.ct = inputPayload;
            }

            // Dimmer
            if (inputPayload > 0 && inputPayload <= 100) {
                msg.payload.deviceData.power = "ON";
                msg.payload.deviceData.dimmer = inputPayload;
            }

            // HSBColor
            if (inputPayload.hasOwnProperty('hue') && inputPayload.hasOwnProperty('saturation') && inputPayload.hasOwnProperty('brightness')) {
                msg.payload.deviceData.power = "ON";
                msg.payload.deviceData.hsbColor = inputPayload.hue + "," + (inputPayload.saturation * 100) + "," + (inputPayload.brightness * 100);
                msg.payload.deviceData.colorHue = inputPayload.hue;
                msg.payload.deviceData.colorSaturation = inputPayload.saturation;
                msg.payload.deviceData.colorBrightness = inputPayload.brightness;
            }
        }

        return msg;
    }

    /**
     * Convert EFQ Bulbs to Alexa Bulbs
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static bulbs_output(messageFormat, deviceType, inputPayload) {
        let msg = {
            acknowledge: true,
            payload: {
                state: {}
            }
        };

        if (inputPayload.hasOwnProperty('messageFormat') && inputPayload.hasOwnProperty('deviceType') && inputPayload.hasOwnProperty('deviceData')) {

            // Power
            if (inputPayload.deviceData.hasOwnProperty('power')) {
                if (inputPayload.deviceData.power === 'OFF') {
                    msg.payload.state.power = 'OFF';

                    return msg;
                }

                msg.payload.state.power = inputPayload.deviceData.power;

                // Dimmer
                if (inputPayload.deviceData.hasOwnProperty('dimmer')) {
                    msg.payload.state.brightness = inputPayload.deviceData.dimmer;
                }

                // CT
                if (inputPayload.deviceData.hasOwnProperty('ct')) {
                    msg.payload.state.colorTemperature = inputPayload.deviceData.ct;
                }

                // RGB
                if (inputPayload.deviceData.hasOwnProperty('colorHue') && inputPayload.deviceData.hasOwnProperty('colorSaturation') && inputPayload.deviceData.hasOwnProperty('colorBrightness')) {
                    msg.payload.state.colorHue = inputPayload.deviceData.colorHue;
                    msg.payload.state.colorSaturation = inputPayload.deviceData.colorSaturation;
                    msg.payload.state.colorBrightness = inputPayload.deviceData.colorBrightness;
                }
            }
        }

        return msg;
    }

    /**
     * Convert Alexa Plugs to EFQ Plugs
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static plugs_input(messageFormat, deviceType, inputPayload) {
        let msg = {
            payload: {
                messageFormat: messageFormat,
                deviceType: deviceType,
                deviceData: {},
                additionalData: {}
            }
        };

        // Power
        if (inputPayload) {
            msg.payload.deviceData.power = inputPayload;
        }

        return msg;
    }

    /**
     * Convert EFQ Plugs to Alexa Plugs
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static plugs_output(messageFormat, deviceType, inputPayload) {
        let msg = {
            acknowledge: true,
            payload: {}
        };

        // Power
        if (inputPayload.hasOwnProperty('messageFormat') && inputPayload.hasOwnProperty('deviceType') && inputPayload.hasOwnProperty('deviceData')) {
            msg.payload = {
                state: {
                    power: inputPayload.deviceData.power
                }
            };
        }

        return msg;
    }

    /**
     * Convert EFQ Sensors to Alexa Sensors
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static sensors_output(messageFormat, deviceType, inputPayload) {
        let msg = {
            acknowledge: true,
            payload: {}
        };

        // Power
        if (inputPayload.hasOwnProperty('messageFormat') && inputPayload.hasOwnProperty('deviceType') && inputPayload.hasOwnProperty('deviceData')) {

            if (deviceType === 'contact_sensor') {
                msg.payload = {
                    state: {
                        contact: inputPayload.deviceData.contact === "CONTACT" ? "DETECTED" : "NOT_DETECTED"
                    }
                };
            } else if (deviceType === 'motion_sensor') {
                // @ToDo: Check if `occupancy` is the right value for this

                msg.payload = {
                    state: {
                        contact: inputPayload.deviceData.occupancy ? "DETECTED" : "NOT_DETECTED"
                    }
                };
            } else if (deviceType === 'vibration_sensor') {
                // @Note: Doesn't supported yet
            }
        }

        return msg;
    }
}

module.exports = MqttDevicesConverterAlexaHelper;