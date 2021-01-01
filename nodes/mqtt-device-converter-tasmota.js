const MqttDevicesConverterTasmotaHelper = require('../lib/MqttDevicesConverterTasmotaHelper.js');

module.exports = function(RED) {

    function MqttDeviceConverterTasmotaNode(config) {
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

            const devicesBulbs = ['bulb', 'bulb_ww', 'bulb_rgb', 'bulb_rgbw'];

            if (deviceInputData === 'tasmotaToEfq') {
                messageFormat = 'EFQ';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                    msg = MqttDevicesConverterTasmotaHelper.input_bulbs(messageFormat, deviceType, inputPayload);
                } else if (deviceType === 'plug') {
                    msg = MqttDevicesConverterTasmotaHelper.input_plugs(messageFormat, deviceType, inputPayload);
                }
            } else if (deviceInputData === 'efqToTasmota') {
                messageFormat = 'tasmota';

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

    RED.nodes.registerType("mqtt-device-converter-tasmota", MqttDeviceConverterTasmotaNode, {
        settings: {
            mqttDeviceConvertInputDeviceInputData: {
                value: "tasmotaToEfq",
                exportable: true
            },
            mqttDeviceConvertInputDeviceType: {
                value: "plug",
                exportable: true
            }
        }
    });
}