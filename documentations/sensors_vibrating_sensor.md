# Vibration Sensor Definition

```json5
{
  msg: {
    payload: {
      messageFormat: "String",
      deviceType: "vibration_sensor",
      deviceData: {
        action: "String",
        strength: "Integer",
        angle: "Integer",
        angleX: "Integer",
        angleXAbsolute: "Integer",
        angleY: "Integer",
        angleYAbsolute: "Integer",
        angleZ: "Integer"
      },
      additionalData: {
        battery: "Integer",
        voltage: "Integer",
        linkQuality: "Integer"
      }
    }
  }
}
```

## Definition

### Device Type

Type of the Device

Type: String<br>
Values: `vibration_sensor`

### Message Format

Format of the Payload Message

Type: String<br>
Values: `tasmota`, `zigbee2mqtt`, `alexa`, `efq`

### Device Data

#### action

What does the Sensor recognized?

Type: String<br>
Values: `drop`, `vibrating`, `tilt`, `null`

#### strength

?? Only if action isn't set ??

#### angle

Type: Integer

#### angleX

Type: Integer

#### angleXAbsolute

Type: Integer

#### angleY

Type: Integer

#### angleYAbsolute

Type: Integer

#### angleZ

Type: Integer

### Additional Data


#### battery

Shows the fuel percentage of the Battery  (only Zigbee2Mqtt)

Type: Integer<br>
Value: 0 - 100

#### voltage

Show the Voltage of the current Battery (only Zigbee2Mqtt)

Type: Integer<br>

#### linkQuality

Shows the link quality to the coordinator (only Zigbee2Mqtt)

Type: Integer<br>
Value: 0 - 255
