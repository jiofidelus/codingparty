const HTTPRequest = require("uds-framework/HTTPRequest.class");
const HTTPResponse = require("uds-framework/HTTPResponse.class");
const PObject = require("uds-framework/PObject.class");

const Router = require("uds-framework/Router.class");
const Route = require("uds-framework/Route.class");
const xmldom = require('xmldom-ts');
const fs = require('fs');

/**
 * @abstract @class Application
 */
const Application = module.exports = function () {
	PObject.call(this);
	this._$httpRequest = new HTTPRequest(this);
	this._$httpResponse = new HTTPResponse(this);

	this._$filterChain = null;
	this._$currentRoute = null;
	this._$currentController = null;
	this._$name = "";

	this._$currentDate = null;
	this._$config = null;
	this._$user = null;
	// this._$sessionController = "";
	// this._$filigranne = "";
	this._$forwardURI = "";
	this._$appFileConfig = "";

	this._$getInitRouter = function (contextURI = "") {
		var router = new Router();
		var domParserImpl = new xmldom.DOMParserImpl();

		var xslString = fs.readFileSync(__dirname + '/../../Applications/' + this._$name + '/Config/routes.xml').toString();
		var dxml = domParserImpl.parseFromString(xslString);
		var routes = dxml.getElementsByTagName("route");

		for (const key in routes) {
			if (Object.hasOwnProperty.call(routes, key) && routes[key].nodeName == "route") {
				const route = routes[key];
				var vars = [];
				// console.log();
				if (route.hasAttribute('vars')) {
					vars = route.getAttribute('vars').split(',');
				}

				router.addRoute(new Route(
					route.getAttribute('url'),
					route.getAttribute('module'),
					route.getAttribute('action'),
					vars
				));
			}
		}

		return router;
	}

	/**
	 * Instancier le controller de l'action
	 * @param {Router} router 
	 * @param {String} url 
	 */
	this._$getMatchRouteController = function (router, url) {
		// console.log(url);
		try {
			var matchedRoute = router.getRoute(url);
			// console.log(matchedRoute);
			// console.log(url);
			this._$currentRoute = matchedRoute;
		} catch (error) {
			console.log("NO ROUTE : " + url);
		}
		// $_GET = array_merge($_GET, $matchedRoute->vars());
		var controlerClass = '../../Applications/' + this._$name + '/Modules/' + matchedRoute.module() + '/' + matchedRoute.module() + 'Controller.class';
		var cClass = require(controlerClass);
		global._$params = matchedRoute.vars();
		// $this->filigranne->actualise($matchedRoute);
		return new cClass(this, matchedRoute.module(), matchedRoute.action());
	}

	/**
	 * @returns BackController
	 */
	this.getController = function () {
		var router = this._$getInitRouter();
		this._$currentController = this._$getMatchRouteController(router, this._$httpRequest.requestURI());

		return this._$currentController;
	}

	this.run = async function () {
		var controller = this.getController();
		await controller.execute();

		this._$httpResponse.send();
	}

	/**
	 * @returns HTTPRequest
	 */
	this.httpRequest = function () {
		return this._$httpRequest;
	}

	/**
	 * @returns HTTPResponse
	 */
	this.httpResponse = function () {
		return this._$httpResponse;
	}

	/**
	 * @returns BackController
	 */
	this.currentController = function () {
		return this._$currentController;
	}

	/**
	 * @returns Route
	 */
	this.currentRoute = function () {
		return this._$currentRoute;
	}

	/**
	 * @returns String
	 */
	this.name = function () {
		return this._$name;
	}
}