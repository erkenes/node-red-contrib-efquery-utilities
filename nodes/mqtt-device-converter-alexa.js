const MqttDevicesConverterAlexaHelper = require('../lib/MqttDevicesConverterAlexaHelper.js');

module.exports = function(RED) {

    function MqttDeviceConverterAlexaNode(config) {
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

            if (deviceInputData === 'alexaToEfq') {
                messageFormat = 'EFQ';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                    msg = MqttDevicesConverterAlexaHelper.bulbs_input(messageFormat, deviceType, inputPayload);
                } else if (deviceType === 'plug') {
                    msg = MqttDevicesConverterAlexaHelper.plugs_input(messageFormat, deviceType, inputPayload);
                }
            } else if (deviceInputData === 'efqToAlexa') {
                messageFormat = 'alexa';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                        msg = MqttDevicesConverterAlexaHelper.bulbs_output(messageFormat, deviceType, inputPayload);
                } else if (deviceType === 'plug') {
                    msg = MqttDevicesConverterAlexaHelper.plugs_output(messageFormat, deviceType, inputPayload);
                } else if (devicesSensor.indexOf(deviceType) !== -1) {
                    msg = MqttDevicesConverterAlexaHelper.sensors_output(messageFormat, deviceType, inputPayload);
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

    RED.nodes.registerType("mqtt-device-converter-alexa", MqttDeviceConverterAlexaNode, {
        settings: {
            mqttDeviceConverterAlexaDeviceInputData: {
                value: "alexaToEfq",
                exportable: true
            },
            mqttDeviceConverterAlexaDeviceType: {
                value: "plug",
                exportable: true
            }
        }
    });
}