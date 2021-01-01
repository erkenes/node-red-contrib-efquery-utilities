'use strict';

class EFQueryConverterTasmotaHelper {

    /**
     * Convert Tasmota Bulbs
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static input_bulbs(messageFormat, deviceType, inputPayload) {
        let msg = {
            payload: {
                messageFormat: messageFormat,
                deviceType: deviceType,
                deviceData: {},
                additionalData: {}
            }
        };

        // Power
        if (inputPayload.hasOwnProperty('POWER')) {
            msg.payload.deviceData.power = inputPayload.POWER;
        }

        if (deviceType === 'bulb_rgbw' || deviceType === 'bulb_rgb' || deviceType === 'bulb_ww' || deviceType === 'bulb') {
            // Dimmer
            if (deviceType === 'bulb_rgbw' || deviceType === 'bulb_rgb' || deviceType === 'bulb_ww' || deviceType === 'bulb') {
                if (inputPayload.hasOwnProperty('Dimmer')) {
                    msg.payload.deviceData.dimmer = inputPayload.Dimmer;
                }
            }

            // CT: Calvin-Temperature && RGB
            if (deviceType === 'bulb_rgbw' || deviceType === 'bulb_rgb' || deviceType === 'bulb_ww') {
                if (inputPayload.hasOwnProperty('Color')) {
                    const colorMode = inputPayload.Color;

                    // CT
                    if (colorMode.substr(0, 6) === "000000") {
                        if (inputPayload.hasOwnProperty('CT') && deviceType !== 'bulb_rgb') {
                            const CT = inputPayload.CT;
                            let newCT = CT;

                            /**
                             * @ToDo: This logic doesn't work
                             */
                            if (CT >= 150) {
                                newCT = 4000;
                            } else if (CT >= 400) {
                                newCT = 2700;
                            } else if (CT >= 500) {
                                newCT = 2200;
                            }

                            msg.payload.deviceData.ct = newCT;
                        }
                    }
                    // RGB
                    else if (deviceType === 'bulb_rgbw' || deviceType === 'bulb_rgb') {
                        if (inputPayload.hasOwnProperty('HSBColor')) {
                            let hsbColor,
                                colorBrightness,
                                colorHue,
                                colorSaturation;

                            hsbColor = inputPayload.HSBColor.split(",");
                            colorBrightness = parseInt(hsbColor[2]);
                            colorHue = parseInt(hsbColor[0]);
                            colorSaturation = parseInt(hsbColor[1]);

                            msg.payload.deviceData.hsbColor = inputPayload.HSBColor;
                            msg.payload.deviceData.colorHue = colorHue;
                            msg.payload.deviceData.colorSaturation = colorSaturation / 100;
                            msg.payload.deviceData.colorBrightness = colorBrightness / 100;
                        }
                    }
                }
            }
        }

        return msg;
    }

    /**
     * Convert Tasmota Plugs
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static input_plugs(messageFormat, deviceType, inputPayload) {
        let msg = {
            payload: {
                messageFormat: messageFormat,
                deviceType: deviceType,
                deviceData: {},
                additionalData: {}
            }
        };

        // Power
        if (inputPayload.hasOwnProperty('POWER')) {
            msg.payload.deviceData.power = inputPayload.POWER;
        }

        return msg;
    }
}

module.exports = EFQueryConverterTasmotaHelper;