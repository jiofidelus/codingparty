const PageAction = require("uds-framework/PageAction.class");
/**
 * @class index
 */
const index = module.exports = function (page) {
	PageAction.call(this, page);

	this.getActionView = function () {
		// console.log(this._$page.getVar("classes"));
		return this._$page.getVar("formulaire");
	}
}