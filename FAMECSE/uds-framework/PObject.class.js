/**
 * @abstract @class
 */
const PObject = module.exports = function () {

	/**
	 * @param {string} value 
	 * @returns bool
	 */
	this.emptyString = function (value) {
		if (typeof value === "string") {
			// console.log(value);
			return value.trim() == '';
		}
		return false;
	}

	this.className = function () {
		return this.constructor.name;
	}

	this.propertiesNames = function () {
		var result = [];
		const properties = Object.keys(this);

		for (const key in properties) {
			if (Object.hasOwnProperty.call(properties, key)) {
				const propertyName = properties[key];
				if (!this.isFunction(this[propertyName])) {
					// console.log(typeof propertyName);
					result.push(propertyName);
				}
			}
		}

		return result;
	}
	this.properties = function () {
		var result = {};
		const properties = this.propertiesNames();

		for (let i = 0; i < properties.length; i++) {
			const propertyName = properties[i];
			result[propertyName] = this[propertyName];
		}

		return result;
	}

	this.escapeHtml = function (text) {
		if (text == null || text === undefined) {
			text = "";
		}

		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};

		return text.replace(/[&<>"']/g, function (m) { return map[m]; });
	}

	this.mergeArrays = function (tab1, tab2) {
		var result = {};
		for (const key in tab1) {
			if (Object.hasOwnProperty.call(tab1, key)) {
				const elt = tab1[key];
				result[key] = elt;
			}
		}

		for (const key in tab2) {
			if (Object.hasOwnProperty.call(tab2, key)) {
				const elt = tab2[key];
				result[key] = elt;
			}
		}

		return result;
	}

	this.isFunction = function (tFunction) {
		return tFunction && {}.toString.call(tFunction) === '[object Function]';
	}

	this.currentStringDate = function () {
		// const monthNames = ["January", "February", "March", "April", "May", "June",
		// 	"July", "August", "September", "October", "November", "December"];
		// const dateObj = new Date();
		// const month = monthNames[dateObj.getMonth()];
		// const day = String(dateObj.getDate()).padStart(2, '0');
		// const year = dateObj.getFullYear();
		// const output = month + '\n' + day + ',' + year;

		return new Date(Date.now()).toLocaleString();
	}
}