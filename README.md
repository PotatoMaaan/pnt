# PNT

Extremely lightweight (and shitty) vanilla Js notifications Library

# Usage
This section will detail how to use PNT in your project

## Including PNT in your website
To include PNT in your website you just need to place the `pnt-core.js` and the `pnt-styles.css` in your website files and include them in any html page on which you want to use it. For Example:
```html
<link rel="stylesheet" href="pnt-styles.css" />
<script src="pnt-core.js"></script>
```

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
