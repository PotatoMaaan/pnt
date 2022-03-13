# PNT: Extremely lightweight (and shitty) vanilla Js notifications Library

![Info](https://raw.githubusercontent.com/PotatoMaaan/pnt/master/sample-images/Info.png)

![Success](https://raw.githubusercontent.com/PotatoMaaan/pnt/master/sample-images/Success.png)

![Warning](https://raw.githubusercontent.com/PotatoMaaan/pnt/master/sample-images/Warning.png)

![Error](https://raw.githubusercontent.com/PotatoMaaan/pnt/master/sample-images/Error.png)

# Usage
This section will detail how to use PNT in your project

## Including PNT in your website
To include PNT in your website you just need to place the `pnt-core.js` and the `pnt-styles.css` in your website files and include them in any html page on which you want to use it. For Example:
```html
<link rel="stylesheet" href="pnt-styles.css" />
<script src="pnt-core.js"></script>
```

## Using PNT to create a notification
### Using presets
Presets offer a quick way to add a pre-made notification. Presets use the following syntax
`pnt.presets.preset("message", "title", decayTime)`

Here we are creating a sample message using the `info` preset
```js
pnt.presets.info("Your message goes here");
```
![Sample Notification](https://raw.githubusercontent.com/PotatoMaaan/pnt/master/sample-images/Info.png)
### All presets:
| Preset | Color | Decay Time |
| --- | --- | --- |
| `info` | blue | 5000ms |
| `success` | green | 5000ms |
| `warn` | yellow | 8000ms | 
| `error` | red | 8000ms |

### Using `compose` to create a fully custom message
you can use `pnt.compose` to create a message with fully custom parameters

`compose` uses the following syntax: `pnt.compose("text", "title", "color", "fontColor", isUserRemoveable, decayTime)`

Here we are creating a white message with black text that is not removeable by the user.
```js
pnt.compose("Your message goes here", "Your title goes here", "#ffffff", "#000000", false, 5000);
```
![Sample Notification](https://raw.githubusercontent.com/PotatoMaaan/pnt/master/sample-images/Custom.png)

## Configuration
PNT offers configuration options directly in the code: 
```js
config: {
	pullFromGooglefonts: true,
	containerMaxWidth: 400, // (px)
	animationDuration: 400, // (ms)
	animationInterpolation: "cubic-bezier(0.075, 0.82, 0.165, 1)",
	debug: false,
}
```

You *can* edit the values on the fly by doing something like `pnt.config.pullFromGooglefonts = false`, however I recommend editing the values in the code directly.

### Configuration options

| Option | Unit | Default | Description |
| :--- | :---: | :---: | :--- |
| `pullFromGooglefonts` | bool | true | Specifies if pnt pulls it's default font "Rubik" from google fonts. If this option is disabled and the user doesn't have the font installed, pnt will use a fallback font |
| `containerMaxWidth` | px | 400 | Specifies the max width (in px) of the container and the contents inside it. Use it to control how "long" your messages will be |
| `animationDuration` | ms | 400 | The amount of time (in ms) an animation will take to complete | 
| `animationInterpolation` | - | cubic-bezier(0.075, 0.82, 0.165, 1) | Sets the interpolation for the adding and removing of messages |
| `debug` | bool | false | Turn debug mode on / off. Debug mode will post logs of the current events to the console |

# Important
I made this for fun and I did not properly test this. There are also some bugs present right now that I can't really figure out. Most of those bugs occur when trying to spawn or delete a lot of notifications at a time. 
Becuase of this I would not use this in any serious project. 
