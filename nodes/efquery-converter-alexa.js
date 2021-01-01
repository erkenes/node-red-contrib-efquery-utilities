const EFQueryConverterAlexaHelper = require('../lib/EFQueryConverterAlexaHelper.js');

module.exports = function(RED) {

    function EFQueryConverterAlexaNode(config) {
        RED.nodes.createNode(this, config);
        this.deviceInputData = config.deviceInputData;
        this.deviceType = config.deviceType;
        const node = this;

        node.on('input', function (msg, send, done) {
            let messageFormat;
            const deviceInputData = node.deviceInputData;
            const deviceType = node.deviceType;
            const inputMsg = msg;
            const inputPayload = inputMsg.payload;

            const devicesSensor = ['contact_sensor', 'motion_sensor', 'vibration_sensor'];
            const devicesBulbs = ['bulb', 'bulb_ww', 'bulb_rgb', 'bulb_rgbw'];

            if (deviceInputData === 'alexaToEfquery') {
                messageFormat = 'EFQ';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                    msg = EFQueryConverterAlexaHelper.bulbs_input(messageFormat, deviceType, inputPayload);
                } else if (deviceType === 'plug') {
                    msg = EFQueryConverterAlexaHelper.plugs_input(messageFormat, deviceType, inputPayload);
                }
            } else if (deviceInputData === 'efqueryToAlexa') {
                messageFormat = 'alexa';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                        msg = EFQueryConverterAlexaHelper.bulbs_output(messageFormat, deviceType, inputPayload);
                } else if (deviceType === 'plug') {
                    msg = EFQueryConverterAlexaHelper.plugs_output(messageFormat, deviceType, inputPayload);
                } else if (devicesSensor.indexOf(deviceType) !== -1) {
                    msg = EFQueryConverterAlexaHelper.sensors_output(messageFormat, deviceType, inputPayload);
                }
            } else {
                node.error("No Device Type was specified!");
                msg = inputMsg;
            }

            node.send(msg);

            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("efquery-converter-alexa", EFQueryConverterAlexaNode, {
        settings: {
            efqueryConverterAlexaDeviceInputData: {
                value: "alexaToEfquery",
                exportable: true
            },
            efqueryConverterAlexaDeviceType: {
                value: "plug",
                exportable: true
            }
        }
    });
}