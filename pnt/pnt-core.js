// PNT: Extremely light vanilla JS notifications library

const pnt = {
	config: {
		// Specifies if pnt pulls it's default font "Rubik" from google fonts.
		// If this option is disabled and the user doesn't have the font installed, pnt will use a fallback font
		pullFromGooglefonts: true,
		// Specifies the maximum width of the container.
		// If "useFixedWidth" is enabled, this will be the width of all messages
		containerMaxWidth: 500,
		// Specifies if the messages width should be user-defined or constant
		useFixedWidth: true,
		animationDuration: 400,
		animationInterpolation: "cubic-bezier(0.075, 0.82, 0.165, 1)",
		// animationInterpolation: "linear",
	},

	linkGoogleFonts: () => {
		const link = document.createElement("link");
		link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,700;1,400;1,700&display=swap");
		link.setAttribute("rel", "stylesheet");

		document.head.appendChild(link);
	},

	isLocked: false,

	ID_PREFIX: "pnt_message:",
	BUTTON_PREFIX: "pnt_button:",
	SLIDE_CSS_CLASS_NAME: "pnt_slide_right",
	CONTAINER_NODE: document.querySelector(".pnt_container"),

	uuidv4: () => {
		// Stolen from Stackoverflow, no idea how it works
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
	},

	getDomMessageNodes: () => {
		return document.querySelectorAll(".pnt_message_body");
	},

	buildMessageHtml: (messageID, messageText, messageTitle) => {
		const html = `
		<div class="pnt pnt_message_body pnt_slide_right" id="${pnt.ID_PREFIX + messageID}">
		<span class="pnt pnt_message_title">${messageTitle}</span>
		<div class="pnt pnt_message_close_button" title="Close" onClick="pnt.messages.removeFromDom("${pnt.ID_PREFIX + messageID}")>
			<div class="pnt pnt_message_close_button_element pnt_message_close_button_element_1"></div>
			<div class="pnt pnt_message_close_button_element pnt_message_close_button_element_2"></div>
		</div>
		<span class="pnt pnt_message_text">${messageText}</span>
		</div>`;

		return html;
	},

	compose: (text, title, color, fontColor, isUserRemoveable, decayTime, width) => {
		const currentUUID = pnt.uuidv4();
		const messageHtml = pnt.buildMessageHtml(currentUUID, text, title);
		pnt.message.addToDom(messageHtml, currentUUID, width, color, isUserRemoveable, fontColor);

		// const n_message = document.getElementById(pnt.ID_PREFIX + currentUUID);

		if (isUserRemoveable) {
			// console.log(n_message);
		}
	},

	message: {
		addToDom: (messageHtml, messageID, msgBodyWidth, msgBodyColor, msgisUserRemoveable, msgTextColor) => {
			pnt.CONTAINER_NODE.innerHTML += messageHtml;
			const n_message = document.getElementById(pnt.ID_PREFIX + messageID);
			n_message.style.setProperty("--animaton-duration", pnt.config.animationDuration + "ms");
			n_message.style.setProperty("--animation-interpolation", pnt.config.animationInterpolation);
			console.log(messageID);
			setTimeout(() => {
				n_message.classList.remove(pnt.SLIDE_CSS_CLASS_NAME);
				n_message.style.setProperty("--message-body-width", pnt.config.useFixedWidth ? pnt.config.containerMaxWidth : msgBodyWidth + "px");
				n_message.style.setProperty("--message-color", msgBodyColor);
				n_message.style.setProperty("--message-close-button-display-style", msgisUserRemoveable ? "block" : "none");
				n_message.style.setProperty("--message-text-color", msgTextColor);
			}, 10);
		},

		removeFromDom: (messageID) => {
			pnt.getDomMessageNodes().forEach((message) => {
				if (message.id === messageID) {
					message.classList.add(pnt.SLIDE_CSS_CLASS_NAME);
					setTimeout(() => {
						message.innerHTML = "";
						pnt.CONTAINER_NODE.removeChild(message);
					}, pnt.config.animationDuration);
				}
			});
		},
	},
};

if (pnt.config.pullFromGooglefonts) pnt.linkGoogleFonts();
