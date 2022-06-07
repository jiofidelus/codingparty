const ApplicationComponent = require("uds-framework/ApplicationComponent.class");
const PageAction = require("uds-framework/PageAction.class");
/**
 * @class Page
 * @param {Application} app
 */
const Page = module.exports = function (app) {
	ApplicationComponent.call(this, app);

	this._$vars = new Map();
	this._$viewContent = "";
	this._$viewPath = "";
	this._$onlyViewAction = false;

	this.initPageVars = function () {
		this._$vars = new Map();
	}

	this.addVar = function (varName, value) {
		// console.log(varName);
		// console.log(value);
		this._$vars.set(varName, value);
		// console.log(this._$vars);
	}

	this.getVar = function (varName) {
		return this._$vars.get(varName);
	}

	/**
	 * @returns String
	 */
	this.getGeneratedPage = function () {
		var action_view = this.getControllerView();
		if (this._$onlyViewAction) {
			return action_view;
		}

		const cPage = require("./../../Applications/" + this._$app.name() + "/Templates/layout.view");
		this._$vars.set("content-action-view", action_view);

		const view = new cPage(this);
		return view.getActionView();
	}

	/**
	 * @returns String
	 */
	this.getControllerView = function () {
		if (this._$viewContent == "") {
			this._$viewContent = this._$getControllerViewActu();
		}
		return this._$viewContent;
	}

	/**
	 * @returns String
	 */
	this._$getControllerViewActu = function () {
		/**
		 * @var {PageAction}
		 */
		const cPageAction = require(this._$viewPath);
		const view = new cPageAction(this);
		return view.getActionView();
	}

	this.setView = function (path) {
		this._$viewPath = path;
	}

	this.setOnlyViewAction = function (onlyViewAction = true) {
		this._$onlyViewAction = onlyViewAction;
	}
}