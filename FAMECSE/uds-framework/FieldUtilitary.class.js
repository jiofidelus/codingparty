const PObject = require('uds-framework/PObject.class');
/**
 *  @class
 */
const FieldUtilitary = module.exports = function () {
    PObject.call(this);

    this._$$TYPE_TEXT = "text";
    this._$$TYPE_PWD = "password";
    this._$$TYPE_NUMBER = "number";
    this._$$TYPE_CHECK = "checkbox";
    this._$$TYPE_DATE = "date";
    this._$$TYPE_EMAIL = "email";
    this._$$TYPE_FILE = "file";
    this._$$TYPE_TEL = "tel";
    this._$$TYPE_TIME = "time";
    this._$$CLASS_FORM = "form-control";

    this._$motifInputBody = function (name, type, value = "", _class = "", label = "", placeholder = "", id = "", require = false) {
        var widget = "";
        if (!this.emptyString(label)) {
            widget += "<label>" + label + "</label>";
        }

        var optClass = this.emptyString(_class) ? this._$$CLASS_FORM : _class;
        // throw new \Exception($optClass);

        widget += '<input class="' + optClass + '" type="' + type + '" name="' + name + '"';

        if (!this.emptyString(value)) {
            widget += ' value="' + this.escapeHtml(value) + '"';
        }

        if (!this.emptyString(placeholder)) {
            widget += ' placeholder="' + placeholder + '"';
        }

        var require_c = (require) ? "required" : "";
        var filePDF = (type == "file") ? ' accept="image/x-eps,application/pdf"' : "";

        return widget += " " + require_c + " " + filePDF + "";
    }

    this.motifInput = function (name, type, value = "", _class = "", label = "", placeholder = "", id = "", require = false, disable = "") {
        return this._$motifInputBody(name, type, value, _class, label, placeholder, id, require) + " disable='$disable' />";
    }
}