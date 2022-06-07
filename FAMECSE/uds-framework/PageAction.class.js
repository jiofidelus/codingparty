const Page = require("uds-framework/Page.class");
/**
 * @abstract @class PageAction
 * @param {Page} page
 */
const PageAction = module.exports = function (page) {
	this._$page = page;

	this.getActionView = function () {
		return "";
	}
}