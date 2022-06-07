const PageAction = require("uds-framework/PageAction.class");
/**
 * @class layout
 */
const layout = module.exports = function (page) {
	PageAction.call(this, page);

	this.getActionView = function () {
		return this._$page.getVar("content-action-view");
	}
}