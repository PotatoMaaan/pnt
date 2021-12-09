// PNT: Extremely light vanilla JS notifications library

// Change settings here
const config = {
	// Specifies if pnt pulls it's default font "Rubik" from google fonts.
	// If this option is disabled and the user doesn't have the font installed, pnt will use a fallback font
	pullFromGooglefonts: true,
};

const linkGoogleFonts = () => {
	const link = document.createElement("link");
	link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,700;1,400;1,700&display=swap");
	link.setAttribute("rel", "stylesheet");

	document.head.appendChild(link);
};

if (config.pullFromGooglefonts) linkGoogleFonts();
