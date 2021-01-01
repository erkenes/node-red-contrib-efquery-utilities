module.exports = function(RED) {
    function TradfriOnOffSwitchNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function (msg, send, done) {
            msg.payload = msg.payload.toLowerCase();

            node.send(msg);

            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("tradfri-on-off-switch", TradfriOnOffSwitchNode);
}