const MqttDevicesConverterZigbee2MqttHelper = require('../lib/MqttDevicesConverterZigbee2MqttHelper.js');

module.exports = function(RED) {

    function MqttDeviceConverterZigbee2MqttNode(config) {
        RED.nodes.createNode(this, config);
        this.deviceInputData = config.deviceInputData;
        this.deviceType = config.deviceType;
        const node = this;
        const devicesSensor = ['contact_sensor', 'motion_sensor', 'vibration_sensor'];

        node.on('input', function (msg, send, done) {
            let messageFormat;
            const deviceInputData = node.deviceInputData;
            const deviceType = node.deviceType;
            const inputMsg = msg;
            const inputPayload = inputMsg.payload;


            if (deviceInputData === 'zigbee2mqttToEfq') {
                messageFormat = 'EFQ';

                if (devicesSensor.indexOf(deviceType) !== -1) {
                    msg = MqttDevicesConverterZigbee2MqttHelper.input_sensors(messageFormat, deviceType, inputPayload);
                }
                else if (deviceType === 'plug') {
                    msg = MqttDevicesConverterZigbee2MqttHelper.input_plug(messageFormat, deviceType, inputPayload);
                }
            } else if (deviceInputData === 'efqToZigbee2mqtt') {
                messageFormat = 'zigbee2mqtt';

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

    RED.nodes.registerType("mqtt-device-converter-zigbee2mqtt", MqttDeviceConverterZigbee2MqttNode, {
        settings: {
            mqttDeviceConverterZigbee2MqttDeviceInputData: {
                value: "zigbee2mqttToEfq",
                exportable: true
            },
            mqttDeviceConverterZigbee2MqttDeviceType: {
                value: "plug",
                exportable: true
            }
        }
    });
}