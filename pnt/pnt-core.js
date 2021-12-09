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
		containerMaxWidth: 500,
		// Specifies if the messages width should be user-defined or constant
		useFixedWidth: true,
		animationDuration: 400,
		animationInterpolation: "cubic-bezier(0.075, 0.82, 0.165, 1)",
	},

	linkGoogleFonts: () => {
		const link = document.createElement("link");
		link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,700;1,400;1,700&display=swap");
		link.setAttribute("rel", "stylesheet");

		document.head.appendChild(link);
	},

	isLocked: false,
	getDomElements: () => {
		return pnt.CONTAINER_NODE.childElementCount;
	},
	virtualDomElements: [],

	ID_PREFIX: "pnt_message:",
	BUTTON_PREFIX: "pnt_button:",
	SLIDE_CSS_CLASS_NAME: "pnt_slide_right",
	CONTAINER_NODE: document.querySelector(".pnt_container") ? document.querySelector(".pnt_container") : "",

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
		<div class="pnt pnt_message_close_button" title="Close" onClick='pnt.message.removeFromDom("${pnt.ID_PREFIX + messageID}")'>
			<div class="pnt pnt_message_close_button_element pnt_message_close_button_element_1"></div>
			<div class="pnt pnt_message_close_button_element pnt_message_close_button_element_2"></div>
		</div>
		<span class="pnt pnt_message_text">${messageText}</span>
		</div>`;

		return html;
	},

	compose: (text, title, color, fontColor, isUserRemoveable, decayTime, dynamicWidth = false) => {
		if (pnt.isLocked) {
			console.warn("PNT: rate limited");
			return;
		}

		const currentUUID = pnt.uuidv4();
		const domID = pnt.ID_PREFIX + currentUUID;
		const messageHtml = pnt.buildMessageHtml(currentUUID, text, title);
		pnt.message.addToDom(messageHtml, currentUUID, dynamicWidth, color, isUserRemoveable, fontColor);

		setTimeout(() => {
			pnt.message.removeFromDom(domID);
		}, decayTime);
	},

	message: {
		addToDom: (messageHtml, messageID, msgDynmaicWidth, msgBodyColor, msgisUserRemoveable, msgTextColor) => {
			pnt.CONTAINER_NODE.innerHTML += messageHtml;
			const n_message = document.getElementById(pnt.ID_PREFIX + messageID);
			n_message.style.setProperty("--animaton-duration", pnt.config.animationDuration + "ms");
			n_message.style.setProperty("--animation-interpolation", pnt.config.animationInterpolation);
			console.log(pnt.ID_PREFIX + messageID);
			setTimeout(() => {
				n_message.classList.remove(pnt.SLIDE_CSS_CLASS_NAME);
				if (msgDynmaicWidth) {
					n_message.style.setProperty("--message-body-width", "auto");
				} else {
					n_message.style.setProperty("--message-body-width", pnt.config.containerMaxWidth);
				}
				n_message.style.setProperty("--message-color", msgBodyColor);
				n_message.style.setProperty("--message-close-button-display-style", msgisUserRemoveable ? "block" : "none");
				n_message.style.setProperty("--message-text-color", msgTextColor);
			}, 10);
			setTimeout(() => {}, pnt.config.animationDuration + 50);
		},

		removeFromDom: (messageID) => {
			pnt.getDomMessageNodes().forEach((message) => {
				if (message.id === messageID) {
					message.classList.add(pnt.SLIDE_CSS_CLASS_NAME);
					setTimeout(() => {
						pnt.virtualDomElements.pop(message);
						message.innerHTML = "";
						message.remove();
					}, pnt.config.animationDuration);
				}
			});
		},
	},
};
if (pnt.config.pullFromGooglefonts) pnt.linkGoogleFonts();
