const BackController = require('uds-framework/BackController.class');
const HTTPRequest = require('uds-framework/HTTPRequest.class');
const Person = require('../../../../AppliLib/Entities/Person.class');
const Aliment = require('../../../../AppliLib/Entities/Aliment.class');
const Conduit = require('../../../../AppliLib/Entities/Conduit.class');
/**
 * @class PublicController
 */
const PublicController = module.exports = function (app, module, action) {
	BackController.call(this, app, module, action);
	app.httpResponse().addHeaderAccess('http://localhost:8080');

	this.executeInsertPlat = async function (httpRequest) {
		const formHandler = this.formHandler("Aliment", httpRequest);
		// var stats = await managers.getUnique();
		// console.log(stats);
		if (await formHandler.process()) {
			// console.log(formHandler.form().entity());
			// const idChauffeur = formHandler.form().entity().id();
			// this.app().httpResponse().redirect("/insert/" + idChauffeur + "-conduit")
		}

		this.page().addVar("formulaire", formHandler.form().createView());
		this.useViewM("insert");
	}

	this.executeListInsert = async function (httpRequest) {
		var managers = this.getManagers().getManagerOf("Aliment");
		// managers.save(aliment);
		var aliments = await managers.getList();

		this.page().addVar("classes", aliments);
		this.useViewM("index");
	}

}