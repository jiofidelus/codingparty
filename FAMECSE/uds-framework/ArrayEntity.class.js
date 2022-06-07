const PObject = require('uds-framework/PObject.class');
/**
 *  @class
 */
const ArrayEntity = module.exports = function (donnees = {}) {
	PObject.call(this);

	this._$erreurs = {};
	this._$descriptions = {};
	this._$dateModif = null;
	this._$dateInsert = null;

	this.erreurs = function () {
		return this._$erreurs;
	}

	this.dateInsert = function () {
		return this._$dateInsert;
	}

	this.arrayDescriptions = function () {
		return {};
	}

	this.setDateInsert = function (dateInsert) {
		this._$dateInsert = dateInsert;
	}

	this.addDescription = function (attrib, valeur) {
		this._$descriptions[attrib] = valeur;
	}

	this.setDescriptions = function (data) {
		this._$descriptions = data;
	}

	this.dateModif = function (data) {
		return this._$dateModif;
	}

	this.getDescription = function (attrib) {
		return this._$descriptions[attrib];
	}

	this.getDescriptions = function () {
		return this._$descriptions;
	}

	this.setDateModif = function (dateModif) {
		this._$dateModif = dateModif;
	}

	this.hydrate = function (donnees) {
		for (const attrib in donnees) {
			method = 'set' + attrib.charAt(0).toUpperCase() + attrib.slice(1);
			if (Object.hasOwnProperty.call(this, method)) {
				const valeur = donnees[attrib];
				this[method](valeur);
			}
			else if (Object.hasOwnProperty.call(donnees, attrib)) {
				const valeur = donnees[attrib];
				this.addDescription(attrib, valeur);
				// console.log(this[method]);
			}
		}
	}

	if (Object.keys(donnees).length > 0) {
		this.hydrate(donnees);
	}
}