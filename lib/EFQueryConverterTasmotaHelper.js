'use strict';

class EFQueryConverterTasmotaHelper {

    /**
     * Convert Tasmota Bulbs to EFQuery
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
            },
            statusMessage;

        // Power
        if (inputPayload.hasOwnProperty('POWER')) {
            msg.payload.deviceData.power = inputPayload.POWER;
        } else {
            statusMessage = {fill: "yellow", shape: "ring", text: "POWER-Payload wasn't set!"};
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

        return [msg, statusMessage];
    }

    /**
     * Convert EFQuery to Tasmota Bulbs
     * !!! The output has to send to the MQTT-Topic `Backlog` !!!
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static output_bulbs(messageFormat, deviceType, inputPayload) {
        let msg = {
                payload: ""
            },
            backlogMessage = "",
            statusMessage;
        const devicesBulbs = ['bulb', 'bulb_ww', 'bulb_rgb', 'bulb_rgbw'];

        if (devicesBulbs.indexOf(deviceType) !== -1) {
            if (inputPayload.hasOwnProperty('messageFormat') && inputPayload.hasOwnProperty('deviceType') && inputPayload.hasOwnProperty('deviceData')) {
                if (inputPayload.deviceType.indexOf(deviceType) !== -1) {
                    const deviceData = inputPayload.deviceData;

                    // Power
                    if (deviceData.hasOwnProperty('power')) {
                        backlogMessage += "Power " + deviceData.power + "; ";
                    }

                    // Dimmer
                    if (deviceData.hasOwnProperty('dimmer')) {
                        backlogMessage += "Dimmer " + deviceData.dimmer + "; ";
                    }

                    // HSBColor
                    if (deviceData.hasOwnProperty('hsbColor')) {
                        backlogMessage += "HSBColor " + deviceData.hsbColor + "; ";
                    }

                    // CT
                    if (deviceData.hasOwnProperty('ct')) {
                        let newCT = deviceData.ct

                        if (deviceData.ct >= 4000) {
                            newCT = 150;
                        } else if (deviceData.ct >= 2700) {
                            newCT = 400;
                        } else if (deviceData.ct >= 2200) {
                            newCT = 500;
                        }
                        backlogMessage += "CT " + newCT + "; ";
                    }

                    statusMessage = {fill: "green", shape: "dot", text: backlogMessage};

                    msg.payload = backlogMessage;
                } else {
                    statusMessage = {fill: "red", shape: "dot", text: "The Device is not compatible with this Utility! Device: " + inputPayload.deviceType};
                }
            } else {
                statusMessage = {fill: "red", shape: "dot", text: "The Message isn't formatted to a EFQuery!"};
            }
        } else {
            statusMessage = {fill: "red", shape: "dot", text: "The Device is not a Bulb!"};
        }

        return [msg, statusMessage];
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
            },
            statusMessage;

        // Power
        if (inputPayload.hasOwnProperty('POWER')) {
            msg.payload.deviceData.power = inputPayload.POWER;

            statusMessage = {fill: "green", shape: "dot", text: inputPayload.POWER};
        } else {
            statusMessage = {fill: "red", shape: "dot", text: "POWER-Payload wasn't set!"};
        }

        return [msg, statusMessage];
    }

    /**
     * Convert EFQuery to Tasmota Plugs
     * !!! The output has to send to the MQTT-Topic `Backlog` !!!
     *
     * @param messageFormat
     * @param deviceType
     * @param inputPayload
     * @returns {*}
     */
    static output_plugs(messageFormat, deviceType, inputPayload) {
        let msg = {
                payload: ""
            },
            backlogMessage = "",
            statusMessage;
        const devicesPlugs = ['plug'];

        if (devicesPlugs.indexOf(deviceType) !== -1) {
            if (inputPayload.hasOwnProperty('messageFormat') && inputPayload.hasOwnProperty('deviceType') && inputPayload.hasOwnProperty('deviceData')) {
                if (inputPayload.deviceType.indexOf(deviceType) !== -1) {
                    const deviceData = inputPayload.deviceData;

                    // Power
                    if (deviceData.hasOwnProperty('power')) {
                        backlogMessage += "Power " + deviceData.power + "; ";
                    }

                    statusMessage = {fill: "green", shape: "dot", text: backlogMessage};

                    msg.payload = backlogMessage;
                } else {
                    statusMessage = {fill: "red", shape: "dot", text: "The Device is not compatible with this Utility! Device: " + inputPayload.deviceType};
                }
            } else {
                statusMessage = {fill: "red", shape: "dot", text: "The Message isn't formatted to a EFQuery!"};
            }
        } else {
            statusMessage = {fill: "red", shape: "dot", text: "The Device is not a Bulb!"};
        }

        return [msg, statusMessage];
    }
}

module.exports = EFQueryConverterTasmotaHelper;