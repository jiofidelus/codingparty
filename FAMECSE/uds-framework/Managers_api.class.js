const Entity = require('uds-framework/Entity.class');
const Managers = require('uds-framework/Managers.class');
/**
 * @abstract @class Managers_api
 * @param {String} api 
 * @param {Application} api 
 */
const Managers_api = module.exports = function (api, dao) {
	Managers.call(this, api, dao);
	/**
	 * @abstract @protected @function
	 * Méthode permettant d'ajouter une entité
	 * @param {Entity} entity L'entité à ajouter
	 * @returns Int
	 */
	this._$add = async function (entity) { }
	/**
	 * @abstract @protected @function
	 * Méthode perméttant de modifier une entité
	 * @param {Entity} entity L'entité à modifier
	 * @returns Int
	 */
	this._$modify = async function (entity) { }
	/**
	 * Méthode permettant d'enrégistrer une intité.
	 * @param {Entity} entity L'entité à enrégistrer
	 * @returns Int
	 */
	this.save = async function (entity) {
		// console.log(entity.isNew());
		if (entity.isValid()) {
			var id = 0;
			entity.isNew() ? id = await this._$add(entity) : id = await this._$modify(entity);
			entity.setId(id);
			return id;
		} else {
			new Error("L'entité doit être validée avant l'enrégistrement ou isValid() n'est pas defini !");
		}
	}
	/**
	 * @abstract @function
	 * Méthode retournant une liste d'entités demandée
	 * @param {Entity} entityFrom 
	 * @param {Entity} entityBy
	 * @param {Entity} entityTo
	 * @returns id Entity Association
	 */
	this.addEntityAssociation = function (entityFrom, enityBy, entityTo) { }

	/**
	 * @abstract @function
	 * Méthode retournant une liste d'entités demandée
	 * @param {Int} debut La première enité à selectionner
	 * @param {Int} limit Le nombre d'entité à selectionner
	 * @returns array La liste des entités. chaque entrée est une instance de Entity
	 */
	this.getList = function (debut = -1, limit = -1) { }
	/**
	 * @abstract @function
	 * Méthode retournant une liste d'entités demandée
	 * @param {Int} id La première enité à selectionner
	 * @returns array La liste des entités. chaque entrée est une instance de Entity
	 */
	this.getUnique = function (id) { }
	/**
	 * @abstract @function
	 * Méthode permettant de supprimer une entité
	 * @param {Int} id La première enité à selectionner
	 * @returns void
	 */
	this.delete = function (id) { }
	/**
	 * Méthode renvoyant le nombre d'entité total
	 * @returns int
	 */
	this.count = function (id) { }
}