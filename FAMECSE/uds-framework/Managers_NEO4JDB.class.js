const Managers_api = require("uds-framework/Managers_api.class");
const Entity_NEO4J = require("uds-framework/Dao/Queries/Entity_NEO4J.class");
// const neo4j = require("neo4j-driver");
/**
 * @abstract @class Managers_api
 * @param {String} api 
 * @param {*} dao 
 */
const Managers_NEO4JDB = module.exports = function (api, dao) {
	Managers_api.call(this, api, dao);

	this.getUnique = async function (id) {
		return await this.$query(
			'MERGE (a:Greeting) ON CREATE SET a.message = $message RETURN a.message + ", from node " + id(a)',
			{ message: 'hello, world' }
		);
	}

	this._$add = async function (entity) {
		const entity_PDO = new Entity_NEO4J(entity);
		// console.log(entity_PDO.entityListqlSave());
		const id = await this.$query(entity_PDO.entityListqlSave());
		// console.log(Object.values(id[0]));
		return id[0].id.low;
	}

	this.addEntityAssociation = async function (entityFrom, entityAssoc, entityTo) {
		const entity_PDO = new Entity_NEO4J(entityAssoc);
		// console.log(entity_PDO.entitiesqlAddAssociation(entityFrom, entityTo));
		const id = await this.$query(entity_PDO.entitiesqlAddAssociation(entityFrom, entityTo));
		return id;
	}

	this.$query = async function (query, data = {}) {
		var result = null, resultSend = [];
		const session = this.dao().session();
		try {
			result = await session.writeTransaction(
				tx =>
					tx.run(query, data)
			);
			for (let i = 0; i < result.records.length; i++) {
				const re = result.records[i];
				// console.log(re.get('id'));
				// console.log(re.toObject());
				resultSend.push(re.toObject());
			}
			// const singleRecord = result.records[0];
			// greeting = singleRecord.get(0);
			// console.log(greeting);
		} finally {
			await session.close();
		}

		// on application exit:
		// await driver.close();
		return resultSend;
	}
}