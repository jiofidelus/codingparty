const Entity = require('uds-framework/Entity.class');
/**
 * @class
 */
const Aliment = module.exports = function Aliment(donnees = {}) {
	Entity.call(this, donnees);
	this._$labelFr = null;
	this._$categorie = null;

	this.isValid = function () {
		return this._$categorie !== null && this._$labelFr !== null;
	}

	this.labelFr = function () {
		return this._$labelFr;
	}

	this.setLabelFr = function (labelFr) {
		this._$labelFr = labelFr;
	}

	this.categorie = function () {
		return this._$categorie;
	}

	this.setCategorie = function (categorie) {
		this._$categorie = categorie;
	}
}