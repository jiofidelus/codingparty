/**
 * @class Router
 */
const Router = module.exports = function () {
	this.routes = new Map();

	this.addRoute = function (route) {
		if (!this.routes.has(route.url())) {
			this.routes.set(route.url(), route);
		}
	}

	this.getRoute = function (url) {
		for (const route of this.routes.values()) {
			// console.log(url);
			var varsValues = true;
			if ((varsValues = route.match(url)) !== false) {

				if (route.hasVars()) {
					// console.log(varsValues);
					var varsNames = route.varsNames();
					var listVars = [];
					// console.log(varsNames);
					for (const key in varsValues) {
						if (Object.hasOwnProperty.call(varsValues, key)) {
							const match = varsValues[key];
							// console.log("/////");
							// console.log(key);
							// console.log(match);
							// console.log(varsNames[key - 1] !== undefined);
							// console.log("/////");
							if (key !== 0 && varsNames[key - 1] !== undefined) {
								listVars[varsNames[key - 1]] = match;
							}
						}
					}
					route.setVars(listVars);
				}
				// console.log(route);
				return route;
			}
		}

		new Error("ROUTE NO VALIDE");
	}
}