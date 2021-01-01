module.exports = function(RED) {
    function MqttRgbwLightConverterNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function (msg, send, done) {
            const mqttInputDirection = msg.mqttInputDirection || false;

            let msgToAlexa = null,
                msgToMqttPower = null,
                msgToMqttCT = null,
                msgToMqttDimmer = null,
                msgToMqttHSBColor = null;

            if (mqttInputDirection) {
                if (msg.payload) {
                    if (msg.payload === "ON" || msg.payload === "OFF") {
                        msgToMqttCT = msg;
                    }

                    if(msg.payload > 101) {
                        msgToMqttCT = msg;
                    }

                    if (msg.payload > 0 && msg.payload < 100) {
                        msgToMqttDimmer = msg;
                    }

                    if(msg.payload.hasOwnProperty("hue") && msg.payload.hasOwnProperty("saturation") && msg.payload.hasOwnProperty("brightness")) {
                        msg.payload = msg.payload.hue + "," + (msg.payload.saturation * 100) + "," + (msg.payload.brightness * 100);

                        msgToMqttHSBColor = msg;
                    }
                }
            } else {
                if(msg.payload.brightness) {
                    msg.payload.Dimmer = msg.payload.brightness;
                }

                if (msg.payload.POWER === "OFF") {
                    msg = {payload: {state: {"power": "OFF"}}}
                }
                else {

                    let newCT = null;
                    let newHSBColor = null;
                    let colorBrightness = null;
                    let colorHue = null;
                    let colorSaturation = null;

                    if (msg.payload.hasOwnProperty("Color")) {
                        let colorMode = msg.payload.Color;

                        if (colorMode.substr(0, 6) === "000000") {
                            // CT
                            let CT = msg.payload.CT;

                            if (CT >= 150) {
                                newCT = 4000;
                            }
                            if (CT >= 400) {
                                newCT = 2700;
                            }
                            if (CT >= 500) {
                                newCT = 2200;
                            }
                        } else {
                            // RGB
                            newHSBColor = msg.payload.HSBColor.split(",")
                            colorBrightness = parseInt(newHSBColor[2]);
                            colorHue = parseInt(newHSBColor[0]);
                            colorSaturation = parseInt(newHSBColor[1]);
                        }
                    }

                    msg.payload = {
                        state: {
                            "power": msg.payload.POWER,
                            "brightness": msg.payload.Dimmer
                        }
                    };

                    if (newCT) {
                        msg.payload.state.colorTemperature = newCT;
                    }

                    if (newHSBColor) {
                        msg.payload.state.colorBrightness = colorBrightness / 100;
                        msg.payload.state.colorHue = colorHue;
                        msg.payload.state.colorSaturation = colorSaturation / 100;
                    }
                }
                msgToAlexa = msg;
            }

            node.send([msgToAlexa, msgToMqttPower, msgToMqttCT, msgToMqttDimmer, msgToMqttHSBColor]);

            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("mqtt-rgbw-light-converter", MqttRgbwLightConverterNode);
}