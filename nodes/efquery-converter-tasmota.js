const EFQueryConverterTasmotaHelper = require('../lib/EFQueryConverterTasmotaHelper.js');

module.exports = function(RED) {

    function EFQueryConverterTasmotaNode(config) {
        RED.nodes.createNode(this, config);
        this.deviceInputData = config.deviceInputData;
        this.deviceType = config.deviceType;
        this.globalContextName = config.globalContextName;

        const node = this;
        const devicesBulbs = ['bulb', 'bulb_ww', 'bulb_rgb', 'bulb_rgbw'];

        node.on('input', function (msg, send, done) {
            let messageFormat,
                outputOfFunction;
            const deviceInputData = node.deviceInputData;
            const deviceType = node.deviceType;
            const globalContextName = node.globalContextName;
            const inputMsg = msg;
            const inputPayload = inputMsg.payload;

            // If input is from tasmota
            if (deviceInputData === 'tasmotaToEfquery') {
                messageFormat = 'EFQ';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                    outputOfFunction = EFQueryConverterTasmotaHelper.input_bulbs(messageFormat, deviceType, inputPayload)

                    msg = outputOfFunction[0];
                    this.status(outputOfFunction[1]);
                }
                else if (deviceType === 'plug') {
                    outputOfFunction = EFQueryConverterTasmotaHelper.input_plugs(messageFormat, deviceType, inputPayload);

                    msg = outputOfFunction[0];
                    this.status(outputOfFunction[1]);
                }

                // Save EFQuery into the global context if a name is set
                if (globalContextName) {
                    const globalContext = this.context().global;

                    globalContext.set(globalContextName, msg.payload);
                }
            }

            // if input is form EFQuery
            else if (deviceInputData === 'efqueryToTasmota') {
                messageFormat = 'tasmota';
                if (devicesBulbs.indexOf(deviceType) !== -1) {
                    outputOfFunction = EFQueryConverterTasmotaHelper.output_bulbs(messageFormat, deviceType, inputPayload);

                    msg = outputOfFunction[0];
                    this.status(outputOfFunction[1]);
                }
                else if (deviceType === 'plug') {
                    outputOfFunction = EFQueryConverterTasmotaHelper.output_plugs(messageFormat, deviceType, inputPayload);

                    msg = outputOfFunction[0];
                    this.status(outputOfFunction[1]);
                }
            }
            else {
                this.status({fill: "error", shape: "ring", text: "No Device Type was specified!"});
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
            efqueryConvertTasmotaDeviceInputData: {
                value: "tasmotaToEfquery",
                exportable: true
            },
            efqueryConvertTasmotaDeviceType: {
                value: "plug",
                exportable: true
            },
            efqueryConvertTasmotaGlobalContextName: {
                value: "",
                exportable: true
            }
        }
    });
}