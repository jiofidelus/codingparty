// const { EnapsoGraphDBClient } = require("@innotrade/enapso-graphdb-client");
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client');
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
const ApplicationUtilitary = require("uds-framework/ApplicationUtilitary.class");
const neo4j = require("neo4j-driver");
/**
 * @static @class DAOFactory
 */
const DAOFactory = module.exports = {
	_$dao: {},
	_$api: "",

	_$establishConnexion_OntGDB: function () {
		const GRAPHDB_BASE_URL = ApplicationUtilitary.getAppConfigAttr("host", this._$api);
		const GRAPHDB_USERNAME = ApplicationUtilitary.getAppConfigAttr("user", this._$api);
		const GRAPHDB_REPOSITORY = ApplicationUtilitary.getAppConfigAttr("dbrepository", this._$api);
		const GRAPHDB_PASSWORD = ApplicationUtilitary.getAppConfigAttr("passWord", this._$api);
		const GRAPHDB_PREFIX = ApplicationUtilitary.getAppConfigAttr("dbprefix", this._$api);
		// var dbname = daoConfig.getElementsByTagName("dbname")[0].nodeValue;
		var ONTOLOGY_URI = ApplicationUtilitary.getAppConfigAttr("dbcontext", this._$api);
		// console.log(GRAPHDB_BASE_URL);
		// connection data to the run GraphDB instance
		// const GRAPHDB_BASE_URL = "http://localhost:7200",
		// 	GRAPHDB_REPOSITORY = "Test",
		// 	GRAPHDB_USERNAME = "Test",
		// 	GRAPHDB_PASSWORD = "Test",
		// 	GRAPHDB_CONTEXT_TEST = "http://ont.enapso.com/repo";
		// console.log(GRAPHDB_REPOSITORY);
		const DEFAULT_PREFIXES = [
			EnapsoGraphDBClient.PREFIX_OWL,
			EnapsoGraphDBClient.PREFIX_RDF,
			EnapsoGraphDBClient.PREFIX_RDFS,
			EnapsoGraphDBClient.PREFIX_XSD,
			EnapsoGraphDBClient.PREFIX_PROTONS,
			// EnapsoGraphDBClient.PREFIX_ENTEST,
			{
				prefix: GRAPHDB_PREFIX,
				iri: ONTOLOGY_URI,
			}
		];

		let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
			baseURL: GRAPHDB_BASE_URL,
			repository: GRAPHDB_REPOSITORY,
			prefixes: DEFAULT_PREFIXES,
			transform: 'JSON',
		});

		// connect and authenticate
		graphDBEndpoint.login(GRAPHDB_USERNAME, GRAPHDB_PASSWORD)
			.then((result) => {
				console.log(result);
			}).catch((err) => {
				console.log(err);
			});

		// graphDBEndpoint.getRepositories()
		// 	.then((result) => {
		// 		console.log(result);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		// graphDBEndpoint
		// 	.getContexts()
		// 	.then((result) => {
		// 		console.log(result);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err, 'process error here...');
		// 	});

		return graphDBEndpoint;
	},

	_$establishConnexion_NEO4JDB: function () {
		const GRAPHDB_BASE_URL = ApplicationUtilitary.getAppConfigAttr("host", this._$api);
		const GRAPHDB_USERNAME = ApplicationUtilitary.getAppConfigAttr("user", this._$api);
		const GRAPHDB_PASSWORD = ApplicationUtilitary.getAppConfigAttr("passWord", this._$api);
		const GRAPHDB_DBNAME = ApplicationUtilitary.getAppConfigAttr("dbname", this._$api);

		// const driver = neo4j.driver(GRAPHDB_BASE_URL);
		const driver = neo4j.driver(GRAPHDB_BASE_URL, neo4j.auth.basic(GRAPHDB_USERNAME, GRAPHDB_PASSWORD));
		return driver;
		// return session;
	},

	getConnexion: function (api) {
		this._$api = api;
		if (this._$dao[api] === undefined) {

			this._$dao[api] = this["_$establishConnexion_" + api]();
		}
		// console.log(this._$dao);
		return this._$dao[api];
	}
}