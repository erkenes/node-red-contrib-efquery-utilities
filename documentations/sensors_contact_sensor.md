# Contact Sensor Definition

```json5
{
  msg: {
    payload: {
      messageFormat: "String",
      deviceType: "contact_sensor",
      deviceData: {
        contact: "String"
      },
      additionalData: {
        battery: "String",
        voltage: "String",
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
Values: `contact_sensor`

### Message Format

Format of the Payload Message

Type: String<br>
Values: `tasmota`, `zigbee2mqtt`, `alexa`, `efq`

### Device Data

#### contact

Shows if the Contact-Sensor and the Magnet are having contact.

Values: `CONTACT` `NO_CONTACT`

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
