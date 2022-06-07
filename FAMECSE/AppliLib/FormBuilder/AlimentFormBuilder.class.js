const Managers = require("uds-framework/Managers.class");
const Entity = require("uds-framework/Entity.class");
const FormBuilder = require("uds-framework/FormBuilder.class");
const NotNullValidator = require("uds-framework/Validators/NotNullValidator.class");
const StringField = require("uds-framework/Fields/StringField.class");
/**
 * @class
 * @param {Managers} managers 
 * @param {Entity} entity 
 * @param {Array} options 
 */
const AlimentFormBuilder = module.exports = function (managers, entity, options = {}) {
	FormBuilder.call(this, managers, entity, options);

	this.build = function () {
		this.form().add(
			new StringField({
				'name': "labelFr",
				'placeholder': "NOM DE L'ALIMENT",
				'validators': [
					new NotNullValidator("Merci de spécifier une valeur")
				]
			})
		).add(
			new StringField({
				'name': "categorie",
				'placeholder': "CATEGORIE DE L'ALIMENT",
				'validators': [
					new NotNullValidator("Merci de spécifier une valeur")
				]
			})
		);
	}

}