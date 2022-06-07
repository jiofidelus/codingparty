const xmldom = require('xmldom-ts');
const fs = require('fs');

const ApplicationUtilitary = module.exports = {
	_$appFileConfig: null,

	loadAppConfig: function () {
		if (this._$appFileConfig == null) {
			var domParserImpl = new xmldom.DOMParserImpl();
			var xslString = fs.readFileSync(__dirname + "/../../AppliLib/appConfig.xml").toString();
			var dxml = domParserImpl.parseFromString(xslString);

			this._$appFileConfig = dxml;
		}

		return this._$appFileConfig;
	},

	getAppConfigAttr: function (attrib, api) {
		var xmlConfig = this.loadAppConfig();
		var daoConfigs = xmlConfig.getElementsByTagName("daoConfig");
		var daoConfig = null;

		daoConfigs.forEach(dao => {
			if (dao.getAttribute("type") == api) {
				daoConfig = dao;
			}
		});
		// console.log(attrib);
		// console.log(api);
		// console.log(daoConfig.getElementsByTagName(attrib)[0].firstChild.nodeValue);
		const child = daoConfig.getElementsByTagName(attrib)[0].firstChild;
		return child !== null ? child.nodeValue : "";
	}
}
