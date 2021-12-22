// PNT: Extremely light vanilla JS notifications library

const init = () => {
	if (!document.querySelector(".pnt_container")) {
		const n_container = document.createElement("div");
		n_container.classList = "pnt pnt_container";
		document.body.appendChild(n_container);
	}
};
init();

const pnt = {
	config: {
		// Specifies if pnt pulls it's default font "Rubik" from google fonts.
		// If this option is disabled and the user doesn't have the font installed, pnt will use a fallback font
		pullFromGooglefonts: true,
		// Specifies the maximum width of the container.
		// If "useFixedWidth" is enabled, this will be the width of all messages
		containerMaxWidth: 400,
		// Specifies the max width of the container and the contents inside it. Use it to control how "long" your messages will be
		animationDuration: 400,
		// Set the interpolation for the adding and removing of messages
		animationInterpolation: "cubic-bezier(0.075, 0.82, 0.165, 1)",
		// Turn debug mode on / off. Debug mode will post logs of the current events to the console
		debug: false,
	},

	linkGoogleFonts: () => {
		const link = document.createElement("link");
		link.setAttribute(
			"href",
			"https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		);
		link.setAttribute("rel", "stylesheet");

		document.head.appendChild(link);
	},

	isLocked: false,
	virtualDomElements: [],

	ID_PREFIX: "pnt_message:",
	BUTTON_PREFIX: "pnt_button:",
	SLIDE_CSS_CLASS_NAME: "pnt_slide_right",
	CONTAINER_NODE: document.querySelector(".pnt_container")
		? document.querySelector(".pnt_container")
		: "",

	uuidv4: () => {
		// Stolen from Stackoverflow, no idea how it works
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		);
	},

	getDomMessageNodes: () => {
		return document.querySelectorAll(".pnt_message_body");
	},

	buildMessageHtml: (messageID, messageText, messageTitle) => {
		const html = `
		<div class="pnt pnt_message_body pnt_slide_right" data-pnt-active="true" id="${
			pnt.ID_PREFIX + messageID
		}">
		<span class="pnt pnt_message_title">${messageTitle}</span>
		<div class="pnt pnt_message_close_button" title="Close" onClick='pnt.message.removeFromDom("${
			pnt.ID_PREFIX + messageID
		}")'>
			<div class="pnt pnt_message_close_button_element pnt_message_close_button_element_1"></div>
			<div class="pnt pnt_message_close_button_element pnt_message_close_button_element_2"></div>
		</div>
		<span class="pnt pnt_message_text">${messageText}</span>
		</div>`;

		if (pnt.config.debug) console.log("built html for: " + messageID);

		return html;
	},

	compose: (text, title, color, fontColor, isUserRemoveable, decayTime) => {
		const currentUUID = pnt.uuidv4();
		const domID = pnt.ID_PREFIX + currentUUID;
		const messageHtml = pnt.buildMessageHtml(currentUUID, text, title);

		if (pnt.config.debug) console.log("(composer) adding to dom: " + domID);
		pnt.message.addToDom(
			messageHtml,
			currentUUID,
			color,
			isUserRemoveable,
			fontColor
		);

		if (!decayTime == 0) {
			setTimeout(() => {
				if (pnt.config.debug) console.log("(composer) removing: " + domID);
				pnt.message.removeFromDom(domID);
			}, decayTime);
		}
	},

	message: {
		addToDom: (
			messageHtml,
			messageID,
			msgBodyColor,
			msgisUserRemoveable,
			msgTextColor
		) => {
			pnt.message.clearOrphaned();
			pnt.CONTAINER_NODE.innerHTML += messageHtml;
			const n_message = document.getElementById(pnt.ID_PREFIX + messageID);
			n_message.style.setProperty(
				"--animaton-duration",
				pnt.config.animationDuration + "ms"
			);
			n_message.style.setProperty(
				"--animation-interpolation",
				pnt.config.animationInterpolation
			);
			if (pnt.config.debug)
				console.log("adding to dom: " + pnt.ID_PREFIX + messageID);
			setTimeout(() => {
				n_message.classList.remove(pnt.SLIDE_CSS_CLASS_NAME);
				n_message.style.setProperty(
					"--message-body-width",
					pnt.config.containerMaxWidth + "px"
				);
				n_message.style.setProperty("--message-color", msgBodyColor);
				n_message.style.setProperty(
					"--message-close-button-display-style",
					msgisUserRemoveable ? "block" : "none"
				);
				n_message.style.setProperty("--message-text-color", msgTextColor);
				pnt.message.clearOrphaned();
			}, 10);
		},

		removeFromDom: (messageID) => {
			const message = document.getElementById(messageID);

			if (!message) {
				if (pnt.config.debug) console.log("(remove from drom) invalid");
				return;
			}

			const remove = (messageToRemove) => {
				messageToRemove.classList.add(pnt.SLIDE_CSS_CLASS_NAME);
				setTimeout(() => {
					messageToRemove.innerHTML = "";
					messageToRemove.remove();
					pnt.message.clearOrphaned();
					if (pnt.config.debug) console.log("removing from dom: " + message.id);
				}, pnt.config.animationDuration);
			};

			if (message.id === messageID) {
				remove(message);
			}
		},

		clearAll: () => {
			pnt.getDomMessageNodes().forEach((message) => {
				pnt.message.removeFromDom(message.id);
			});
		},

		clearOrphaned: () => {
			pnt.getDomMessageNodes().forEach((message) => {
				if (!message.classList.contains("pnt_slide_right")) return;
				if (pnt.config.debug) console.log("removing orphaned: " + message.id);
				pnt.message.removeFromDom(message.id);
			});
		},
	},

	presets: {
		message: (title, message, decayTime = 5000) => {
			pnt.compose(message, title, "green", "white", true, decayTime);
		},
		info: (message, title = "Info", decayTime = 5000) => {
			pnt.compose(message, title, "blue", "white", true, decayTime);
		},
		warn: (message, title = "Warning", decayTime = 8000) => {
			pnt.compose(message, title, "orange", "white", true, decayTime);
		},
		error: (message, title = "Error", decayTime = 8000) => {
			pnt.compose(message, title, "red", "white", true, decayTime);
		},

		clearAll: () => {
			pnt.message.clearAll();
		},
	},
};
if (pnt.config.pullFromGooglefonts) pnt.linkGoogleFonts();
