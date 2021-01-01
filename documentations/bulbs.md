# Bulbs Definition

```json5
{
  msg: {
    payload: {
      messageFormat: "String",
      deviceType: "String",
      deviceData: {
          power: "String",
          dimmer: "Integer",
          hsbColor: "String",
          colorHue: "Integer",
          colorSaturation: "Integer",
          colorBrightness: "Integer",
          ct: "Integer"
      },
      additionalData: {}
    }
  }
}
```

## Definition

### Device Type

Type of the Device

Type: String<br>
Values: `bulb`, `bulb_ww`, `bulb_rgb`, `bulb_rgbw`

### Message Format

Format of the Payload Message

Type: String<br>
Values: `tasmota`, `zigbee2mqtt`, `alexa`, `efq`

### Device Data

#### power

Shows if the Device is turned on or off.

Type: String<br>
Values: `ON` `OFF`

#### dimmer

Shows the current dimming Value

Type: Integer<br>
Values: 0 - 100

#### hsbColor

HSBColor

Type: String<br>
Value: example: `21,14,100`

### colorHue

Current Hue (from hsbColor)

Type: Integer<br>
Value: 0 - 359

### colorSaturation

Current Saturation (from hsbColor)

Type: Integer<br>
Value: 0 - 1

### colorBrightness

Current Brightness of Color (from hsbColor)

Type: Integer<br>
Value: 0 - 1

## ct

Calvin-Temperature

Type: Integer