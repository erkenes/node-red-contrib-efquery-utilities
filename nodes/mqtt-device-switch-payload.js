module.exports = function(RED) {
    function mqttDeviceSwitchPayloadNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function (msg, send, done) {
            if (msg.payload) {
                if (msg.payload.hasOwnProperty('deviceData')) {
                    if (msg.payload.hasOwnProperty('power')) {
                        const currentPower = msg.payload.deviceData.power;
                        msg.payload.deviceData.power = currentPower === "ON" ? "OFF" : "ON";
                    }
                }
            }

            node.send(msg);

            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("mqtt-device-switch-payload", mqttDeviceSwitchPayloadNode);
}