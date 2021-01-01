# Plug Definition

```json5
{
  msg: {
    payload: {
      messageFormat: "String",
      deviceType: "String",
      deviceData: {
          power: "String"
      },
      additionalData: {
        linkQuality: "String"
      }
    }
  }
}
```

## Definition

### Device Type

Type of the Device

Type: String<br>
Values: `plug`

### Message Format

Format of the Payload Message

Type: String<br>
Values: `tasmota`, `zigbee2mqtt`, `alexa`, `efq`

### Device Data

#### power

Shows if the Device is turned on or off.

Type: String<br>
Values: `ON` `OFF`

### Additional Data

#### linkQuality

Shows the link quality to the coordinator (only Zigbee2Mqtt)

Type: Integer<br>
Value: 0 - 255