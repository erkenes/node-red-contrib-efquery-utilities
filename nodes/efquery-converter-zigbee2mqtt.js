const EFQueryConverterZigbee2MqttHelper = require('../lib/EFQueryConverterZigbee2MqttHelper.js');

module.exports = function(RED) {

    function EFQueryConverterZigbee2MqttNode(config) {
        RED.nodes.createNode(this, config);
        this.deviceInputData = config.deviceInputData;
        this.deviceType = config.deviceType;
        const node = this;
        const devicesSensor = ['contact_sensor', 'motion_sensor', 'vibration_sensor'];
        const devicesBulbs = ['bulb', 'bulb_ww', 'bulb_rgb', 'bulb_rgbw'];


        node.on('input', function (msg, send, done) {
            let messageFormat;
            const deviceInputData = node.deviceInputData;
            const deviceType = node.deviceType;
            const inputMsg = msg;
            const inputPayload = inputMsg.payload;


            if (deviceInputData === 'zigbee2mqttToEfquery') {
                messageFormat = 'EFQ';

                if (devicesSensor.indexOf(deviceType) !== -1) {
                    msg = EFQueryConverterZigbee2MqttHelper.input_sensors(messageFormat, deviceType, inputPayload);
                }
                else if (devicesBulbs.indexOf(deviceType) !== -1) {
                    msg = EFQueryConverterZigbee2MqttHelper.input_bulbs(messageFormat, deviceType, inputPayload);
                }
                else if (deviceType === 'plug') {
                    msg = EFQueryConverterZigbee2MqttHelper.input_plug(messageFormat, deviceType, inputPayload);
                }
            } else if (deviceInputData === 'efqueryToZigbee2mqtt') {
                messageFormat = 'zigbee2mqtt';

                if (devicesBulbs.indexOf(deviceType) !== -1) {
                    msg = EFQueryConverterZigbee2MqttHelper.output_bulbs(messageFormat, deviceType, inputPayload);
                }
                else if (deviceType === 'plug') {
                    msg = EFQueryConverterZigbee2MqttHelper.output_plug(messageFormat, deviceType, inputPayload);
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

    RED.nodes.registerType("efquery-converter-zigbee2mqtt", EFQueryConverterZigbee2MqttNode, {
        settings: {
            efqueryConverterZigbee2mqttDeviceInputData: {
                value: "zigbee2mqttToEfquery",
                exportable: true
            },
            efqueryConverterZigbee2mqttDeviceType: {
                value: "plug",
                exportable: true
            }
        }
    });
}