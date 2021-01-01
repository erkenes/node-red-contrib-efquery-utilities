const EFQueryConverterTasmotaHelper = require('../lib/EFQueryConverterTasmotaHelper.js');

module.exports = function(RED) {

    function EFQueryConverterTasmotaNode(config) {
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

            if (deviceInputData === 'tasmotaToEfquery') {
                messageFormat = 'EFQ';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                    msg = EFQueryConverterTasmotaHelper.input_bulbs(messageFormat, deviceType, inputPayload);
                } else if (deviceType === 'plug') {
                    msg = EFQueryConverterTasmotaHelper.input_plugs(messageFormat, deviceType, inputPayload);
                }
            } else if (deviceInputData === 'efqueryToTasmota') {
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

    RED.nodes.registerType("efquery-converter-tasmota", EFQueryConverterTasmotaNode, {
        settings: {
            efqueryConvertInputDeviceInputData: {
                value: "tasmotaToEfquery",
                exportable: true
            },
            efqueryConvertInputDeviceType: {
                value: "plug",
                exportable: true
            }
        }
    });
}