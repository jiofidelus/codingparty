const Managers_Gdb = require("uds-framework/Managers_OntGDB.class");
/**
 * @class AlimentManager_OntGDB
 */
module.exports = function AlimentManager_OntGDB(api, dao) {
	Managers_Gdb.call(this, api, dao);

	this.setApport = (substances) => {
		return substances.join(', ');
	};

	this.insertAliment = async function (debut = -1, limit = -1) {
		const
			name = "rizA",
			labelFR = "riz",
			labelEN = "rize",
			comment = "riz à manger !",
			apports = "vitamineA, vitamineE";

		try {
			let aliment = await this.dao().update(
				`
				PREFIX entity: <http://example/framework/entity/> 
				PREFIX atrib: <http://example/framework/entity/atributs/> 
				PREFIX instance: <http://example/framework/entity/instance/>
				INSERT DATA { instance:181360bd1bf rdf:type rdfs:Class.}
			  `,
				{ tranform: 'toJSON' }
			);

			// console.log(aliment);

			return aliment;
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	this.getAliments = async function (debut = -1, limit = -1) {
		try {
			let aliments = await this.dao()
				.query(
					`SELECT ?entity ?label ?comment ?value
					WHERE  { 
						{ ?entity rdf:type  food:Aliment } UNION {?entity rdf:type  food:Legumes }  UNION {?entity rdf:type  food:ProduitLaitiers } UNION {?entity rdf:type  food:MatiereGrasses } UNION {?entity rdf:type  food:ViandeSeche } UNION  {?entity rdf:type  food:Cereales }  UNION  {?entity rdf:type  food:ViandeBrousse } 
						UNION {?entity rdf:type  food:MatiereGrasses } UNION {?entity rdf:type  food:ViandeBlanche } UNION {?entity rdf:type  food:Cereales }
						OPTIONAL {
								?entity rdfs:label ?label 
									FILTER (lang(?label) = "fr") .
							}
						
							OPTIONAL {
								?entity rdfs:label ?value 
									FILTER (lang(?value) = "fr") .
							}
					}
				`,
					{ transform: 'toJSON' }
				);
			return aliments;
		} catch (error) {
			return [];
		}
	}

}