const ApplicationComponent = require("./ApplicationComponent.class");
const Managers = require("./Managers.class");
const Page = require("./Page.class");
const DAOFactory = require("./Dao/DAOFactory.class");
const FormHeaderFactory = require("./FormHeaderFactory.class");
const FormHandlerFactory = require("./FormHandlerFactory.class");
/**
 * @abstract @class BackController
 * @param {Application} app 
 * @param {String} module
 * @param {String} action
 */
const BackController = module.exports = function (app, module, action) {
	ApplicationComponent.call(this, app);
	// console.log(DAOFactory.getConnexion("Gdb"));
	this.managers = new Managers("OntGDB", DAOFactory.getConnexion("OntGDB"));

	this._$module = "";
	this._$action = "";
	this._$page = null;
	this._$view = "";

	this._$initContext = function (app, module, action, pageTitle) {
		this._$page = new Page(app);
		this._$page.addVar("title", pageTitle);
		this.setModule(module);
		this.setAction(action);
	}

	this._$initContextPage = function () {

		this.useViewM(this._$action);
	}

	this.formHandler = function (classeName, request, modified = false, options = {}) {
		const formHeaderFactory = new FormHeaderFactory(request);
		var classe = formHeaderFactory.get(classeName);
		// console.log(classe);
		if (modified !== false && request.method() != "POST") {
			classe = this.getManagers().getManagerOf(classeName).getUnique(modified);
			// $classe->prepareToModify();
		}

		if (modified !== false && request.method() == "POST") {
			classe.setId(modified);
		}

		const formHandlerFactory = new FormHandlerFactory(this.getManagers().getManagerOf(classeName), classe, request, options);
		formHandlerFactory.build();
		// $this->testVar($classe);
		// console.log(classe);
		return formHandlerFactory.formHandler();
	}

	this.useViewM = function (model, mapping = "") {
		const app = this._$app.name();
		const module = this._$module;

		const rep = "./../../Applications/" + app + "/Modules/" + module + "/Views/" + model + ".view";
		this.page().setView(rep);
	}

	this.execute = async function () {
		// this.executeIndex(this.app.httpRequest);
		// console.log(this.action.slice(1));
		await this["execute" + this._$action.charAt(0).toUpperCase() + this._$action.slice(1)](this.app().httpRequest());
		// console.log(this.page()._$vars);
		this.app().httpResponse().setPage(this.page());
	}

	this.initManagerNeo4j = function () {
		this.managers = new Managers("NEO4JDB", DAOFactory.getConnexion("NEO4JDB"));
	}

	this.getManagers = function () {
		return this.managers;
	}

	this.setModule = function (module) {
		this._$module = module;
	}

	this.setAction = function (action) {
		this._$action = action;
	}

	this.page = function () {
		return this._$page;
	}

	this._$initContext(app, module, action);
	this._$initContextPage();
}