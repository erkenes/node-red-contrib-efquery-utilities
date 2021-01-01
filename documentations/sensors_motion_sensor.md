# Motion Sensor Definition

```json5
{
  msg: {
    payload: {
      messageFormat: "String",
      deviceType: "motion_sensor",
      deviceData: {
        illuminance: "Integer",
        illuminanceLux: "Integer",
        occupancy: "Boolean"
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
Values: `motion_sensor`

### Message Format

Format of the Payload Message

Type: String<br>
Values: `tasmota`, `zigbee2mqtt`, `alexa`, `efq`

### Device Data

#### illuminance

#### illuminanceLux

#### occupancy

Checks if someone is in the room.

Type: Boolean<br>
Values: `true` `false`

### Additional Data

#### linkQuality

Shows the link quality to the coordinator (only Zigbee2Mqtt)

Type: Integer<br>
Value: 0 - 255
