const FormHeader = require("uds-framework/FormHeader.class");
const HTTPRequest = require("uds-framework/HTTPRequest.class");
/**
 * @class
 * @param {HTTPRequest} request
 */
const AlimentFormHeader = module.exports = function (request, aliment) {
	FormHeader.call(this, request, aliment);


}