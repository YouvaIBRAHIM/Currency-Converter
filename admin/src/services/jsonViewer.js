const jsonColorizer = {
	/**
	 * Replacer for the json text
	 */
	replacer: function (match, pIndent, pKey, pVal, pEnd) {
		const key = "<span class=json-key>";
		const num = "<span class=json-number>";
		const str = "<span class=json-string>";
		const bool = "<span class=json-boolean>";
		let r = pIndent || "";

		//A key
		if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: ";
		//A value type boolean
		if (pVal == "true" || pVal == "false") r = r + bool + pVal + "</span>";
		//A number value
		else if (!isNaN(pVal)) r = r + num + pVal + "</span>";
		//A string value
		else if (pVal) r = r + str + pVal + "</span>";

		return r + (pEnd || "");
	},

	/**
	 * Returns a formatted text.
	 * @param {Object} json to print.
	 * @param {spaces} number of spaces (default: 2)
	 */
	prettyPrint: function (json, spaces = 2) {
		const text = JSON.stringify(json, null, spaces);
		const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
		return text
			.replace(/&/g, "&amp;")
			.replace(/\\"/g, "&quot;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(jsonLine, jsonColorizer.replacer);
	}
};

export default jsonColorizer;