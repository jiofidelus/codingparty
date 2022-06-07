var tools = {
	Applications: {
		Frontend: {
			Config: {
				routes: [
					// { url: "/s.admin/censeur/enseignements/", module: "Bulletins", action: "evaluateDepartStatsPedagogikCenseur" },
					// { url: "/s.admin/censeur/classes/", module: "Bulletins", action: "evaluateClassesStatsPedagogikCenseur" },
					// { url: "/s.admin/school/classe-([0-9]+)/", module: "Bulletins", action: "resumeNotesClasse" },
					// { url: "/s.admin/proviseur/", module: "Statistique", action: "evalStats" },
					{ url: "/student/enseignant/print/fiche_trim([0-9]+)_synthese([0-9]+)_([0-9]+)/", module: "Statistique", action: "resumeNotesClasseTrim", vars: "trim,idEvaluation,idClasse" },
					{ url: "/student/enseignant/print/fiche_synthese([0-9]+)_([0-9]+)/", module: "Statistique", action: "resumeNotesClasse", vars: "idEvaluation,idClasse" },
					{ url: "/s.admin/stats/trim([1-3])", module: "Statistique", action: "evalStats" },
					{ url: "/s.admin/censeur/", module: "Bulletins", action: "controlNotesCurrentEval" },
					{ url: "(.*)", module: "Bulletins", action: "index" }
				]
			},
			Modules: {
				Bulletins: {
					DataLoad: {
						ActionEvaluateStatsPedagogikCenseur: {
							loadResumeStats: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Resumestatpedagogik").inEvaluationFromContext(httpResquest, "resumes");
							},
							loadDepartements: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Departement").inEvaluationFromContext(httpResquest, "departement");
							},
							loadClasseEnseignement: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Enseignement").inEvaluationFromContext(httpResquest, "enseignemnts");
							},
							loadClasseDiscipline: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Discipline").inEvaluationFromContext(httpResquest, "disciplines");
							}
						},
						ActionResumeNotesClasse: {
							loadSequenceFstNote: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Note").inEvaluationFromClasse(1, 1, httpResquest, "noteSeq1");
							},
							loadSequenceSndNote: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Note").inEvaluationFromClasse(1, 2, httpResquest, "noteSeq2");
							},
							loadClasseEnseignement: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Enseignement").fromClasseInYear(1, httpResquest, "enseignemnts");
							},
							loadClasseDiscipline: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Discipline").fromClasseInYear(1, httpResquest, "disciplines");
							},
							loadClasseEleves: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Eleve").fromClasseInYear(1, httpResquest, "eleves");
							}
						},
						ActionEvaluateDepartStatsPedagogikCenseur: {
							loadResumeStats: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Resumestatpedagogik").inEvaluationFromContext(httpResquest, "resumes");
							},
							loadDepartements: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Departement").inEvaluationFromContext(httpResquest, "departement");
							},
							loadClasseEnseignement: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Enseignement").inEvaluationFromContext(httpResquest, "enseignemnts");
							},
							loadClasseDiscipline: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Discipline").inEvaluationFromContext(httpResquest, "disciplines");
							}
						},
						ActionEvaluateClassesStatsPedagogikCenseur: {
							loadResumeStats: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Resumestatpedagogik").inEvaluationFromContext(httpResquest, "resumes");
							},
							loadDepartements: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Departement").inEvaluationFromContext(httpResquest, "departement");
							},
							loadClasseEnseignement: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Enseignement").inEvaluationFromContext(httpResquest, "enseignemnts");
							},
							loadClasseDiscipline: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Discipline").inEvaluationFromContext(httpResquest, "disciplines");
							}
						},
						// ActionControlNotesCurrentEval: {
						//     loadSequenceFstNote: function (httpResquest) {
						//         var managers = httpResquest.getApp().getCurrentController().getManagers();
						//         managers.getManagerOf("Json").inEvaluationCurrentFromClasse(1, httpResquest, "noteSeq");
						//     }
						// },
					},
					BulletinsController: function (app, module, action) {
						tools.Library.BackController.call(this, app, module, action);

						this.executeEvaluateClassesStatsPedagogikCenseur = function (httpRequest) {
							// console.log("jkjkj");
							var
								resumes = httpRequest.getAttribute("resumes"),
								departements = httpRequest.getAttribute("departement"),
								enseignements = httpRequest.getAttribute("enseignemnts"),
								disciplines = httpRequest.getAttribute("disciplines");

							var classes = [];
							$(".class-descript").each(function (index, element) {
								// element == this
								classes.push($(this).attr("class-id"));
							});

							var
								enseignementsConteneur = new tools.AppLib.Conteneur.EnseignementsConteneur(enseignements),
								disciplineConteneur = new tools.AppLib.Conteneur.DisciplineConteneur(enseignementsConteneur, disciplines),
								departementConteneur = new tools.AppLib.Conteneur.DepartementConteneur(disciplineConteneur, departements);

							var
								resumeConteneur = new tools.AppLib.Conteneur.ResumestatpedagogiksConteneur(departementConteneur, resumes, 3),
								etsResumestatpedagogikConteneur = new tools.AppLib.Conteneur.EtabllissementResumeStatPedagogiqueClasses(resumeConteneur, classes);

							// console.log(etsResumestatpedagogikConteneur);
							var
								resumeEtsClasses = etsResumestatpedagogikConteneur.resumeEtsClasses(3),
								resumeDetailsEtsClasses = etsResumestatpedagogikConteneur.resumeDetailsEtsClasses(3);

							// console.log(etsResumestatpedagogikConteneur.resumeEtsClasses(2));
							// console.log(etsResumestatpedagogikConteneur.resumeDetailsEtsClasses(2));
							// console.log(etsResumestatpedagogikConteneur.resumeDetailsEtsDepartement(2));
							// console.log(resumes);
							// console.log(departementResumestatpedagogikConteneur);
							// this.managers.getManagerOf("Note").save("/s.admin/save/ets/resumes-pedagogik", { "details": resumeDetailsEtsClasses, "resume": resumeEtsClasses });
							this.managers.getManagerOf("Note").save("save/ets/resumes-pedagogik", { "details": resumeDetailsEtsClasses, "resume": resumeEtsClasses });
							// this.managers.getManagerOf("Note").save("save/ets/resumes-pedagogik", { "details": resumeDetailsEtsDepartement, "resume": resumeEtsDepartements });
						}

						this.executeEvaluateDepartStatsPedagogikCenseur = function (httpRequest) {
							var
								resumes = httpRequest.getAttribute("resumes"),
								departements = httpRequest.getAttribute("departement"),
								enseignements = httpRequest.getAttribute("enseignemnts"),
								disciplines = httpRequest.getAttribute("disciplines");

							var classes = [];
							$(".class-descript").each(function (index, element) {
								// element == this
								classes.push($(this).attr("class-id"));
							});

							var
								enseignementsConteneur = new tools.AppLib.Conteneur.EnseignementsConteneur(enseignements),
								disciplineConteneur = new tools.AppLib.Conteneur.DisciplineConteneur(enseignementsConteneur, disciplines),
								departementConteneur = new tools.AppLib.Conteneur.DepartementConteneur(disciplineConteneur, departements),
								departementResumestatpedagogikConteneur = new tools.AppLib.Conteneur.ClasseDepartementResumestatpedagogikPeriodeConteneur(departementConteneur, resumes, "trimestre");

							var
								resumeConteneur = new tools.AppLib.Conteneur.ResumestatpedagogiksConteneur(departementConteneur, resumes, 3),
								etsResumestatpedagogikConteneur = new tools.AppLib.Conteneur.EtabllissementResumeStatPedagogique(resumeConteneur, classes);

							// console.log(etsResumestatpedagogikConteneur);
							var
								resumeEtsClasses = etsResumestatpedagogikConteneur.resumeEtsClasses(3),
								resumeEtsDepartements = etsResumestatpedagogikConteneur.resumeEtsDepartements(),
								resumeDetailsEtsClasses = etsResumestatpedagogikConteneur.resumeDetailsEtsClasses(3),
								resumeDetailsEtsDepartement = etsResumestatpedagogikConteneur.resumeDetailsEtsDepartement(3);

							// console.log(etsResumestatpedagogikConteneur.resumeEtsClasses(2));
							// console.log(etsResumestatpedagogikConteneur.resumeDetailsEtsClasses(2));
							// console.log(etsResumestatpedagogikConteneur.resumeDetailsEtsDepartement(2));
							// console.log(resumes);
							// console.log(departementResumestatpedagogikConteneur);
							// this.managers.getManagerOf("Note").save("/s.admin/save/ets/resumes-pedagogik", { "details": resumeDetailsEtsClasses, "resume": resumeEtsClasses });
							// this.managers.getManagerOf("Note").save("save/ets/resumes-pedagogik", { "details": resumeEtsClasses, "resume": resumeDetailsEtsClasses });
							this.managers.getManagerOf("Note").save("save/ets/resumes-pedagogik", { "details": resumeDetailsEtsDepartement, "resume": resumeEtsDepartements });
						}

						this.executeResumeNotesClasse = function (httpRequest) {
							var
								dataSeq1 = httpRequest.getAttribute("noteSeq1"),
								dataSeq2 = httpRequest.getAttribute("noteSeq2"),
								dataDisciplines = httpRequest.getAttribute("disciplines"),
								eleves = httpRequest.getAttribute("eleves"),
								dataEnseignements = httpRequest.getAttribute("enseignemnts");
							// console.log(dataSeq1);
							var
								enseignementsConteneur = new tools.AppLib.Conteneur.EnseignementsConteneur(dataEnseignements),
								disciplinesConteneur = new tools.AppLib.Conteneur.DisciplineConteneur(enseignementsConteneur, dataDisciplines),
								notesConteneurSeq1 = new tools.AppLib.Conteneur.NotesConteneur(dataSeq1),
								notesConteneurSeq2 = new tools.AppLib.Conteneur.NotesConteneur(dataSeq2),
								noteClasseConteneurSeq1 = new tools.AppLib.Conteneur.ClasseNoteConteneur(disciplinesConteneur, notesConteneurSeq1, eleves.map(function (eleve) { return eleve.id(); })),
								noteClasseConteneurSeq2 = new tools.AppLib.Conteneur.ClasseNoteConteneur(disciplinesConteneur, notesConteneurSeq2, eleves.map(function (eleve) { return eleve.id(); })),
								noteClasseConteneurSeqTMP = new tools.AppLib.Conteneur.ClasseNoteConteneur(disciplinesConteneur, notesConteneurSeq2, eleves.map(function (eleve) { return eleve.id(); })),
								noteClasseConteneurTrim = tools.AppLib.Stats.MatriceUtilitary.operationAddition(noteClasseConteneurSeqTMP, noteClasseConteneurSeq1, noteClasseConteneurSeq2);

							var enseignants = {};
							$("tr.enseignement-classe").each(function (index, element) {
								// element == this
								enseignants[$(this).attr("id-enseignement")] = $(this).attr("nom-enseignant");
							});

							// console.log(notesConteneurSeq1);
							// console.log(noteConteneurSeq2);
							// console.log(noteConteneurTrim);
							// console.log(noteConteneur.getElementsLigne("2986"));
							// console.log(noteClasseConteneurSeq1.resumeNotesFromAllEnseignementsForEleve("88"));
							// console.log(noteClasseConteneurSeq2.resumeNotesFromAllEnseignementsForEleve("88"));
							// console.log(noteClasseConteneurTrim.resumeNotesFromAllEnseignementsForEleve("11"));
							var resumeListe = noteClasseConteneurTrim.formatShowEnseignementsNotes(enseignants, noteClasseConteneurSeq1.resumeNotesFromAllEnseignementsForEleve("11"), noteClasseConteneurSeq2.resumeNotesFromAllEnseignementsForEleve("11"), noteClasseConteneurTrim.resumeNotesFromAllEnseignementsForEleve("11")),
								resumeGroupeSeq1 = noteClasseConteneurSeq1.synthesNotesFromAllGroupsEnseignementsForEleves("11"),
								resumeGroupeseq2 = noteClasseConteneurSeq2.synthesNotesFromAllGroupsEnseignementsForEleves("11"),
								resumeGroupeTrim = noteClasseConteneurTrim.synthesNotesFromAllGroupsEnseignementsForEleves("11"),
								resumeGroup = noteClasseConteneurTrim.formatShowEnseignementsNotesAllFormations(resumeGroupeSeq1, resumeGroupeseq2, resumeGroupeTrim);

							console.log(JSON.stringify({ "trim": 1, "idEleve": 11, "notes_enseignements": resumeListe, "formations_notes_groups": resumeGroup }));
						}

						this.executeControlNotesCurrentEval = function (httpRequest) {
							var managers = this.managers;
							var classes = [], totalNbreComplet = 0, totalEnseignement = 0;
							$(".classe-progress").each(function (index, element) {
								// element == this
								classes.unshift($(this).attr("id-classe"));
								var loader = '<img src="/Web/img/ajax-loaders/ajax-loader-6.gif" title="observatoire !">';
								$("#progress-control-notes-" + $(this).attr("id-classe")).html(loader);
							});

							var launchActive = true;
							var active = function (idClasse, managers) {
								launchActive = false;

								$.ajax({
									type: "GET",
									url: "control-classe-" + idClasse + "/notes",
									dataType: "JSON",
									success: function (content) {
										launchActive = true;
										var
											notesConteneur = new tools.AppLib.Conteneur.NotesConteneur(managers.getManagerOf("Note").formatFromData(content.notes)),
											enseignementConteneur = new tools.AppLib.Conteneur.EnseignementsConteneur(managers.getManagerOf("Enseignement").formatFromData(content.enseignements));

										var contentShow = "<h5 class=\"label label-info\">Evaluation " + content.seq + "</h5><br/>";
										var nombreComplet = 0;
										for (let i = 0; i < enseignementConteneur.getEnseignements().length; i++) {
											const enseignement = enseignementConteneur.getEnseignements()[i];
											var notes = notesConteneur.notesFromEnseignement(enseignement);

											var progressData = (notes.length / content.nbreEleves) * 100;
											var progress =
												"<a href=\"tel:+237" + enseignement.getData().telephone + "\">" + enseignement.getData().pNom + "</a>"
												+ "<a class=\"label label-success\" target=\"_blanck\" href=\"https://wa.me/+237" + enseignement.getData().telephone + "/?text=" + encodeURI("Vos notes de " + enseignement.getData().intitule + " sont remplies à un pourcentage de " + progressData + " %, \n\n*Bien Vouloir Les Completer* !") + "\">"
												+ "<i class=\"glyphicon glyphicon-share\"></i>Wha "
												+ "</a><div class=\"progress\">"
												+ "<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"" +
												progressData + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " +
												progressData + "%;\">" + enseignement.getData().intitule + "</div></div>";

											if (progressData < 100) {
												contentShow += progress;
											}

											if (progressData > 70) {
												nombreComplet++;
											}
										}

										var progressClass = '<h3>REMPLISSAGE DES BULLETINS</h3>' +
											'<div class="progress progress-striped progress-success active">' +
											'<div class="progress-bar" style="width: ' + ((nombreComplet / enseignementConteneur.getEnseignements().length) * 100) + '%;"></div>' +
											'</div>';

										totalNbreComplet += nombreComplet;
										totalEnseignement += enseignementConteneur.getEnseignements().length;

										var progressGroup = '<div class="progress progress-striped progress-danger active">' +
											'<div class="progress-bar" style="width: ' + ((totalNbreComplet / totalEnseignement) * 100) + '%;"></div>' +
											'</div>';

										$("#progress-control-notes-" + idClasse).html(progressClass + contentShow);
										$("#note-progression-note-censeur").html(progressGroup);
										// console.log(enseignementConteneur);
										// active(classes, managers);
									}
								});

							}

							setInterval(function () {

								if (classes && launchActive) {
									var idClasse = classes.pop();
									active(idClasse, managers);
								}

							}, 10000);
						}

						this.executeIndex = function (httpRequest) {
							console.log("indexs");
						}
					}
				},
				Statistique: {
					DataLoad: {
						ActionResumeNotesClasse: {
							loadSequenceFstNote: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Note").inEvaluationFromClasse(1, 1, httpResquest, "noteSeq1");
							},
							loadClasseEnseignement: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Enseignement").fromClasseInYear(1, httpResquest, "enseignemnts");
							},
							loadClasseDiscipline: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Discipline").fromClasseInYear(1, httpResquest, "disciplines");
							},
							loadClasseEleves: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Personne").fromClasseInYear(1, httpResquest, "eleves");
							}
						},
						ActionResumeNotesClasseTrim: {
							loadSequenceFstNote: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Note").inEvaluationFromClasse(1, 1, httpResquest, "noteSeq1");
							},
							loadSequenceSndNote: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Note").inEvaluationFromClasse(1, 2, httpResquest, "noteSeq2");
							},
							loadClasseEnseignement: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Enseignement").fromClasseInYear(1, httpResquest, "enseignemnts");
							},
							loadClasseDiscipline: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Discipline").fromClasseInYear(1, httpResquest, "disciplines");
							},
							loadClasseEleves: function (httpResquest) {
								var managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Personne").fromClasseInYear(1, httpResquest, "eleves");
							}
						},
						ActionEvalStats: {
							loadResumeStats: function (httpResquest) {
								var
									trim = 1,
									managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Archivebulletin").archiveForEtablissementStatTrim(trim, httpResquest, "archivebulletin");
							},
							loadClasses: function (httpResquest) {
								var
									trim = 1,
									managers = httpResquest.getApp().getCurrentController().getManagers();
								managers.getManagerOf("Classe").classeForEtablissement(httpResquest, "classes");
							}
						}
					},
					Template: {
						ShowDataSyntheClasse: function (data, resume) {
							this.data = data;
							this.resume = resume;

							this.formatData = function () {
								var results = "";

								for (let i = 0; i < this.data.length; i++) {
									const elt = this.data[i];
									results += this.ligneStatClasse(elt.shift(), elt);
								}

								return results;
							}

							this.ligneStatClasse = function (classeName, data) {
								return "<tr>"
									+ "<td>" + classeName + "</td>"
									+ "<td>" + data[0] + "</td>"
									+ "<td>" + data[1] + "</td>"
									+ "<td>" + data[2] + "</td>"
									+ "<td>" + (data[1] + data[2]) + "</td>"
									+ "<td>" + data[3] + "</td>"
									+ "<td>" + data[4] + "</td>"
									+ "<td>" + (data[4] + data[3]) + "</td>"
									+ "<td>" + data[5] + "</td>"
									+ "<td>" + data[6] + "</td>"
									+ "<td>" + (data[5] + data[6]) + "</td>"
									+ "<td>" + data[7] + "%</td>"
									+ "<td>" + data[8] + "%</td>"
									+ "<td>" + data[9] + "%</td>"
									+ "</tr>";
							}

							this.show = function () {
								var htmlString = this.formatData();

								htmlString += this.ligneStatClasse("<b>TOTAL</b>", this.resume);
								$("#stats-classes-genders").find("tbody").html(htmlString);
							}
						},
						ShowDataSyntheseEleves: function (eleves, disciplineConteneur, resumeDisciplines) {
							this._tabResume = new Map();
							this.eleves = eleves;
							this._filterUtilitary = new tools.AppLib.Conteneur.ConteneurUtilitary.FilterEntities();

							this.disciplineConteneur = disciplineConteneur;
							this.resumeDisciplines = resumeDisciplines;
							// console.log(resumeDisciplines);
							this.formatData = function () {
								var results = "";

								for (let i = 0; i < this.eleves.length; i++) {
									const eleve = this.eleves[i];
									results += this.ligneStat(eleve, this.resumeDisciplines.get(eleve.getData().idEleve));
								}

								return results;
							}

							this.showLigneEleve = function (note, discipline) {
								var result = "--";

								if (note.statut() == tools.AppLib.constantes.NOTE_EN_COMPTE) {
									result = (note.valeur() * discipline.coefficient()).toFixed(2);
								}

								return result;
							}

							this.showMention = function (valMoy) {
								if (valMoy < 10) {
									return "NON ACQUIS";
								}

								if (valMoy < 15) {
									return "EN COURS ACQUISITION";
								}

								return "ACQUIS";
							}

							this.ligneStat = function (eleve, resume) {
								var result = "<tr>", notesEleve = [];
								// console.log(resume);
								result += "<td>" + eleve.getData().nom + " " + eleve.getData().prenom + "</td>";
								result += "<td>" + (eleve.getData().sexe == "masculin" ? "M" : "F") + "</td>";
								for (let i = 0; i < this.disciplineConteneur.getDisciplines().length; i++) {
									const disc = this.disciplineConteneur.getDisciplines()[i];
									var note = resume.get(disc.id())[1];
									// console.log(note);
									notesEleve.push(note);
									result += "<td>" + this.showLigneEleve(note, disc) + "</td>";
								}

								var resume = tools.AppLib.Conteneur.ConteneurUtilitary.resumeNotes(notesEleve, this.disciplineConteneur);

								result += "<td><b>" + resume[0].toFixed(2) + "</b></td>";
								result += "<td><b>" + resume[1].toFixed(2) + "</b></td>";
								result += "<td><b>" + this.showMention(resume[0]) + "</b></td>";
								result += "</tr>";

								this._tabResume.set(eleve.getData().idEleve, resume[0]);
								return result;
							}

							this.ligneStatHead = function () {
								var result = "<tr>";
								// console.log(resume);
								result += "<td><b>DISCIPLINE</b></td>";
								result += "<td><b>SEXE</b></td>";
								for (let i = 0; i < this.disciplineConteneur.getDisciplines().length; i++) {
									const disc = this.disciplineConteneur.getDisciplines()[i];
									result += "<td><b>" + disc.code() + " (/" + disc.maxNote() * disc.coefficient() + ") </b></td>";
								}

								result += "<td><b>MOY</b></td>";
								result += "<td><b>SOMME</b></td>";
								result += "<td><b>MENTION</b></td>";
								result += "</tr>";

								return result;
							}

							this._getMoyennesEleves = function (eleves) {
								var result = [];

								for (let i = 0; i < eleves.length; i++) {
									const el = eleves[i];
									result.push(this._tabResume.get(el.getData().idEleve));
								}

								return result;
							}

							this._getMoyennesMinValues = function (moyennes, min) {
								var result = [];

								for (let i = 0; i < moyennes.length; i++) {
									const moy = moyennes[i];
									if (moy > min) {
										result.push(moy);
									}
								}

								return result;
							}

							this._getMoyennesMaxValues = function (moyennes, max) {
								var result = [];

								for (let i = 0; i < moyennes.length; i++) {
									const moy = moyennes[i];
									if (moy < max) {
										result.push(moy);
									}
								}

								return result;
							}

							this._sommeMoyennes = function (moyennes) {
								var result = 0, nbre = 0;

								for (let i = 0; i < moyennes.length; i++) {
									const moy = moyennes[i];
									if (moy > -1) {
										result += moy;
										nbre++;
									}
								}

								return (result / nbre).toFixed(2);
							}

							this._getEleve = function (idEleve) {

								for (let i = 0; i < this.eleves.length; i++) {
									const el = this.eleves[i];
									if (el.getData().idEleve == idEleve) {
										return el;
									}
								}

								return null;
							}

							this._getOrderElevesHaveMoy = function () {
								var
									resultsS = [],
									orders = new Map([...this._tabResume.entries()].sort((a, b) => { return b[1] - a[1]; }));
								// console.log(orders.keys().);
								for (let i = 0; i < 6; i++) {
									const idEleve = Array.from(orders.keys())[i];
									console.log(idEleve);
									resultsS.push(this._getEleve(idEleve));
								}

								return resultsS;
							}

							this.getformatDataResume = function () {
								var
									result = "<tr>",
									elevesM = this._filterUtilitary.filterHaveValAttrib(this.eleves, "masculin", "sexe"),
									elevesS = this._getMoyennesMinValues(this._getMoyennesEleves(this.eleves), 9.999),
									elevesMS = this._getMoyennesMinValues(this._getMoyennesEleves(elevesM), 9.999);

								result += "<td><b>TAUX DE REUSSITE: " + ((elevesS.length * 100) / this.eleves.length).toFixed(2) + " %</b></td>";
								result += "<td><b>TAUX DE REUSSITE (F): " + (((elevesS.length - elevesMS.length) * 100) / this.eleves.length).toFixed(2) + " %</b></td>";
								result += "<td><b>TAUX DE REUSSITE (M): " + ((elevesMS.length * 100) / this.eleves.length).toFixed(2) + " %</b></td>";
								result += "<td><b>MOY.GEN CLASSE: " + (this._sommeMoyennes(this._getMoyennesEleves(this.eleves))) + " </b></td>";
								result += "<td><b>NBRE MOY (>10): " + elevesS.length + "</b></td>";

								return result += "</tr>";
							}

							this.show = function () {
								var
									htmlString = this.formatData(),
									htmlRecap = this.getformatDataResume(),
									elevesS = this._getOrderElevesHaveMoy();

								htmlString = this.ligneStatHead() + htmlString;
								// htmlString += this.ligneStatClasse("<b>TOTAL</b>", this.resume);
								// console.log(elevesS);
								var showS = "";
								for (let i = 0; i < elevesS.length; i++) {
									const el = elevesS[i];
									showS += "<span style=\"font-size: 19px;\"><b>RANG " + (i + 1) + " : " + (el.getData().nom + " " + el.getData().prenom) + "</b></span><br/>";
								}

								$("#classe-eff").html(this.eleves.length);
								$("#classe-eff-filles").html(this._filterUtilitary.filterHaveValAttrib(this.eleves, "masculin", "sexe").length);
								$("#classe-eff-garcon").html(this._filterUtilitary.filterHaveValAttrib(this.eleves, "féminin", "sexe").length);

								$("#fiche-stat-table").find("tbody").html(htmlString);
								$("#fiche-stat-resume").find("tbody").html(htmlRecap);
								$("#prmiers-05").html(showS);
							}
						}
					},
					StatistiqueController: function (app, module, action) {
						tools.Library.BackController.call(this, app, module, action);

						this.executeEvalStats = function (httpRequest) {
							var trim = 1, ligneData = [], maxNote = 9.999;
							var
								archive = httpRequest.getAttribute("archivebulletin"),
								classes = httpRequest.getAttribute("classes"),
								archiveConteneur = new tools.AppLib.Conteneur.ArchivebulletinConteneur(archive);

							for (let i = 0; i < classes.length; i++) {
								const classe = classes[i];

								var
									classeArchive = archiveConteneur.archivesForClasseInTrim(classe.id(), trim),
									classeResume = archiveConteneur.resumeGenders(classeArchive, "moyenneTrim", maxNote);
								// console.log(classeArchive);
								classeResume.unshift(classe.getData().classeName);
								ligneData.push(classeResume);
							}
							var
								archiveTrim = archiveConteneur.archivesInTrim(trim),
								resume = archiveConteneur.resumeGenders(archiveTrim, "moyenneTrim", maxNote);

							var view = new this.templates.ShowDataSyntheClasse(ligneData, resume);
							view.show();
						}

						this.executeResumeNotesClasse = function (httpRequest) {
							var
								dataSeq1 = httpRequest.getAttribute("noteSeq1"),
								dataDisciplines = httpRequest.getAttribute("disciplines"),
								eleves = httpRequest.getAttribute("eleves"),
								dataEnseignements = httpRequest.getAttribute("enseignemnts");
							// console.log(dataSeq1);
							// console.log(eleves);
							var
								enseignementsConteneur = new tools.AppLib.Conteneur.EnseignementsConteneur(dataEnseignements),
								disciplinesConteneur = new tools.AppLib.Conteneur.DisciplineConteneur(enseignementsConteneur, dataDisciplines),
								notesConteneurSeq1 = new tools.AppLib.Conteneur.NotesConteneur(dataSeq1),
								noteClasseConteneurSeq1 = new tools.AppLib.Conteneur.ClasseNoteConteneur(disciplinesConteneur, notesConteneurSeq1, eleves.map(function (eleve) { return eleve.getData().idEleve; }));

							// console.log(notesConteneurSeq1);
							// console.log(noteConteneurSeq2);
							// console.log(noteConteneurTrim);
							// console.log(noteConteneur.getElementsLigne("2986"));
							// console.log(noteClasseConteneurSeq1.syntheseNotesFromAllDisciplines());
							// console.log(noteClasseConteneurSeq2.resumeNotesFromAllEnseignementsForEleve("88"));
							// var resumeGroupeSeq1 = noteClasseConteneurSeq1.synthesNotesFromAllGroupsEnseignementsForEleves("11");
							// console.log(resumeGroupeSeq1);
							// console.log(JSON.stringify({ "trim": 1, "idEleve": 11, "notes_enseignements": resumeListe, "formations_notes_groups": resumeGroup }));
							var view = new this.templates.ShowDataSyntheseEleves(eleves, disciplinesConteneur, noteClasseConteneurSeq1.syntheseNotesFromAllDisciplines());
							view.show();
						}

						this.executeResumeNotesClasseTrim = function (httpRequest) {
							var
								dataSeq1 = httpRequest.getAttribute("noteSeq1"),
								dataSeq2 = httpRequest.getAttribute("noteSeq2"),
								dataDisciplines = httpRequest.getAttribute("disciplines"),
								eleves = httpRequest.getAttribute("eleves"),
								dataEnseignements = httpRequest.getAttribute("enseignemnts");
							// console.log(dataSeq2);
							// console.log(eleves);
							var
								enseignementsConteneur = new tools.AppLib.Conteneur.EnseignementsConteneur(dataEnseignements),
								disciplinesConteneur = new tools.AppLib.Conteneur.DisciplineConteneur(enseignementsConteneur, dataDisciplines),
								notesConteneurSeq1 = new tools.AppLib.Conteneur.NotesConteneur(dataSeq1),
								notesConteneurSeq2 = new tools.AppLib.Conteneur.NotesConteneur(dataSeq2),
								noteClasseConteneurSeq1 = new tools.AppLib.Conteneur.ClasseNoteConteneur(disciplinesConteneur, notesConteneurSeq1, eleves.map(function (eleve) { return eleve.getData().idEleve; })),
								noteClasseConteneurSeq2 = new tools.AppLib.Conteneur.ClasseNoteConteneur(disciplinesConteneur, notesConteneurSeq2, eleves.map(function (eleve) { return eleve.getData().idEleve; })),
								noteClasseConteneurSeqTMP = new tools.AppLib.Conteneur.ClasseNoteConteneur(disciplinesConteneur, notesConteneurSeq2, eleves.map(function (eleve) { return eleve.getData().idEleve; })),
								noteClasseConteneurTrim = tools.AppLib.Stats.MatriceUtilitary.operationAddition(noteClasseConteneurSeqTMP, noteClasseConteneurSeq1, noteClasseConteneurSeq2);

							// console.log(notesConteneurSeq1);
							// console.log(noteConteneurSeq2);
							// console.log(noteConteneurTrim);
							// console.log(noteConteneur.getElementsLigne("2986"));
							// console.log(noteClasseConteneurSeq1.syntheseNotesFromAllDisciplines());
							// console.log(noteClasseConteneurSeq2.resumeNotesFromAllEnseignementsForEleve("88"));
							// var resumeGroupeSeq1 = noteClasseConteneurSeq1.synthesNotesFromAllGroupsEnseignementsForEleves("11");
							// console.log(resumeGroupeSeq1);
							// console.log(JSON.stringify({ "trim": 1, "idEleve": 11, "notes_enseignements": resumeListe, "formations_notes_groups": resumeGroup }));
							var view = new this.templates.ShowDataSyntheseEleves(eleves, disciplinesConteneur, noteClasseConteneurTrim.syntheseNotesFromAllDisciplines());
							view.show();
						}
					}
				},
			},
			FrontendApplication: function () {
				tools.Library.Application.call(this);
				this.name = "Frontend";

				// this.run = function () {
				//     tools.Library.Application.prototype.run.call(this);
				// }
			}
		}
	},
	AppLib: {
		constantes: {
			NOTE_EN_COMPTE: 0,
			NOTE_STATUT_NON_EN_COMPTE: 1,
			NOTE_STATUT_ANNULE: 2,
		},
		Entities: {
			Archivebulletin: function (data) {
				tools.Library.Entity.call(this, data);

				// Fait la somme de 02 notes, si elles sont dans le même enseignement, elle renvoie la moyenne
				this.add = function (archivebulletin) {

				}

				this.html = function () {
					return this._getDataValue("html");
				}

				this.idEleve = function () {
					return this._getDataValue("idEleve");
				}

				this.anneeAcad = function () {
					return this._getDataValue("anneeAcad");
				}

				this.moySeqDebut = function () {
					return this._getDataValue("moySeqDebut");
				}

				this.moySeqFin = function () {
					var val = this._getDataValue("moySeqFin");
					return parseFloat(val);
				}

				this.moyenneTrim = function () {
					var val = this._getDataValue("moyenneTrim");
					return parseFloat(val);
				}

				this.rangTrim = function () {
					var val = this._getDataValue("rangTrim");
					return parseInt(val);
				}

				this.trimestre = function () {
					var val = this._getDataValue("trimestre");
					return parseInt(val);
				}
			},

			Note: function (data) {
				tools.Library.Entity.call(this, data);

				// Fait la somme de 02 notes, si elles sont dans le même enseignement, elle renvoie la moyenne
				this.add = function (note) {
					if (note.statut() != tools.AppLib.constantes.NOTE_EN_COMPTE) {
						return new tools.AppLib.Entities.Note(this.getData());
					}

					if (this.statut() != tools.AppLib.constantes.NOTE_EN_COMPTE) {
						return new tools.AppLib.Entities.Note(note.getData());
					}
					// var
					//     disc1 = tools.AppLib.Conteneur.ConteneurServer.getServer("disciplineConteneur").disciplineFromNote(note),
					//     disc2 = tools.AppLib.Conteneur.ConteneurServer.getServer("disciplineConteneur").disciplineFromNote(this);
					var
						somme1 = note.valeur() < 0 ? 0 : note.valeur(),
						somme2 = this.valeur() < 0 ? 0 : this.valeur();
					// var total = note.valeur() < 0 ? 0 : disc1.maxNote() * disc1.coefficient();
					// total += this.valeur() < 0 ? 0 : disc2.maxNote() * disc2.coefficient();
					var somme = somme1 + somme2;
					if (note.idEnseignement() == this.idEnseignement()) {
						somme = somme / 2;
					}
					else console.log("Notes non compatibles !");

					var result = new tools.AppLib.Entities.Note(this.getData());
					result.setValeur(somme);

					return result;
				}

				this.statut = function () {
					return this._getDataValue("statut");
				}

				this.observation = function () {
					return this._getDataValue("observation");

				}

				this.competence = function () {
					return this._getDataValue("competence");

				}

				this.setValeur = function (valeur) {
					return this._setDataValue("valeur", valeur);
				}

				this.valeur = function () {
					var val = this._getDataValue("valeur");
					return parseFloat(val);
				}

				this.mention = function () {
					return this._getDataValue("mention");

				}

				this.idEnseignement = function () {
					return this._getDataValue("idEnseignement");
				}

				this.idEvalIdEnseignementIdEleve = function () {
					return this._getDataValue("idEvalIdEnseignementIdEleve");
				}

				this.anneeAcad = function () {
					return this._getDataValue("anneeAcad");

				}

				this.idEleve = function () {
					return this._getDataValue("idEleve");
				}
			},

			Discipline: function (data) {
				tools.Library.Entity.call(this, data);

				this.code = function () {
					return this._getDataValue("code");
				}

				this.cycle = function () {
					return this._getDataValue("cycle");
				}

				this.intitule = function () {
					return this._getDataValue("intitule");
				}

				this.coefficient = function () {
					return parseFloat(this._getDataValue("coefficient"));
				}

				this.maxNote = function () {
					return parseFloat(this._getDataValue("maxNote"));
				}

				this.regime = function () {
					return this._getDataValue("regime");
				}

				this.model = function () {
					return this._getDataValue("model");
				}

				this.niveau = function () {
					return this._getDataValue("niveau");
				}

				this.form = function () {
					return this._getDataValue("form");
				}

				this.nbreHeures = function () {
					return this._getDataValue("nbreHeures");
				}

				this.nbreHeuresTP = function () {
					return this._getDataValue("nbreHeuresTP");
				}

				this.idEtablissement = function () {
					return this._getDataValue("idEtablissement");
				}
			},

			Enseignement: function (data) {
				tools.Library.Entity.call(this, data);

				this.idEnseignant = function () {
					return this._getDataValue("idEnseignant");
				}

				this.idDiscipline = function () {
					return this._getDataValue("idDiscipline");
				}

				this.idClasse = function () {
					return this._getDataValue("idClasse");
				}

				this.regime = function () {
					return this._getDataValue("regime");
				}

				this.nbreHeures = function () {
					return this._getDataValue("nbreHeures");
				}

				this.nbreHeuresTP = function () {
					return this._getDataValue("nbreHeuresTP");
				}

				this.anneeAcad = function () {
					return this._getDataValue("anneeAcad");
				}

				this.portee = function () {
					return this._getDataValue("portee");
				}
			},

			Eleve: function (data) {
				tools.Library.Entity.call(this, data);

				this.idPersonne = function () {
					return this._getDataValue("idPersonne");
				}

				this.idEncadreur = function () {
					return this._getDataValue("idEncadreur");
				}

				this.matricule = function () {
					return this._getDataValue("matricule");
				}

				this.idClasse = function () {
					return this._getDataValue("idClasse");
				}

				this.situation = function () {
					return this._getDataValue("situation");
				}

				this.anneeAcad = function () {
					return this._getDataValue("anneeAcad");
				}

				this.feesValidated = function () {
					return this._getDataValue("feesValidated");
				}

				this.exclu = function () {
					return this._getDataValue("exclu");
				}
			},

			Personne: function (data) {
				tools.Library.Entity.call(this, data);

				this.nom = function () {
					return this._getDataValue("nom");
				}

				this.prenom = function () {
					return this._getDataValue("prenom");
				}

				this.nomPere = function () {
					return this._getDataValue("nomPere");
				}

				this.nomMere = function () {
					return this._getDataValue("nomMere");
				}

				this.dateNaiss = function () {
					return this._getDataValue("dateNaiss");
				}

				this.lieuNaiss = function () {
					return this._getDataValue("lieuNaiss");
				}

				this.sexe = function () {
					return this._getDataValue("sexe");
				}

				this.profileImage = function () {
					return this._getDataValue("profileImage");
				}

				this.telephone = function () {
					return this._getDataValue("telephone");
				}
			},

			Resumestatpedagogik: function (data) {
				tools.Library.Entity.call(this, data);

				this.isNotCompatibleKeysResume = function (resume, key) {
					return this.isResumeCompatible(resume) && this.isNotCompatibleKeys(key);
				}

				this.isResumeCompatible = function (resume) {
					return this.idEnseignement() == resume.idEnseignement();
				}

				this.isNotCompatibleKeys = function (key) {
					return ["idEnseignement", "effGarcon", "effFilles", "effPresentGarcon", "effPresentFille", "nbreMoyenneGarcon", "nbreMoyenneFille"].includes(key);
				}

				this.add = function (resume) {
					// console.log(this.data);
					// console.log(resume.data);
					var
						dataSomme = this.getData(),
						keys = Object.keys(dataSomme),
						idEnseignement = this.data["idEnseignement"],
						rang = this.rang();

					// console.log("start");
					if (resume.rang() > this.rang()) {
						dataSomme = resume.getData();
						rang = resume.rang();
					}
					// console.log(this.data);
					// console.log(resume.data);
					for (let i = 0; i < keys.length; i++) {
						const key = keys[i];
						if (key != "portee" && (!this.isResumeCompatible(resume) || !this.isNotCompatibleKeys(key))) {
							// console.log(key);
							dataSomme[key] = parseFloat(dataSomme[key]) + parseFloat(resume[key]());
						}
					}
					// console.log("end");
					var result = new tools.AppLib.Entities.Resumestatpedagogik(dataSomme);
					// console.log(dataSomme);
					result._setDataValue("rang", rang);
					result._setDataValue("idEnseignement", idEnseignement);
					result._setDataValue("tauxReussiteFille", result.nbreMoyenneFille() / result.effPresentFille());
					result._setDataValue("tauxReussiteGarcon", result.nbreMoyenneGarcon() / result.effPresentGarcon());
					// console.log(dataSomme);
					return result;
				}

				this.idEnseignement = function () {
					return this._getDataValue("idEnseignement");
				}

				this.setIdEnseignement = function (idEnseignement) {
					return this._setDataValue("idEnseignement", idEnseignement);
				}

				this.hrsAnnuellePrevue = function () {
					return this._getDataValue("hrsAnnuellePrevue");
				}

				this.hrsFaiteCumul = function () {
					return this._getDataValue("hrsFaiteCumul");
				}

				this.leconAnnuellePrevues = function () {
					return this._getDataValue("leconAnnuellePrevues");
				}

				this.leconAnnuelleFaite = function () {
					return this._getDataValue("leconAnnuelleFaite");
				}

				this.hrsTPPrevues = function () {
					return this._getDataValue("hrsTPPrevues");
				}

				this.HrsTPFaits = function () {
					return this._getDataValue("HrsTPFaits");
				}

				this.effGarcon = function () {
					return this._getDataValue("effGarcon");
				}

				this.effFilles = function () {
					return this._getDataValue("effFilles");
				}

				this.effPresentGarcon = function () {
					return this._getDataValue("effPresentGarcon");
				}

				this.effPresentFille = function () {
					return this._getDataValue("effPresentFille");
				}

				this.tauxReussiteFille = function () {
					return this._getDataValue("tauxReussiteFille");
				}

				this.setTauxReussiteFille = function (taux) {
					return this._setDataValue("tauxReussiteFille", taux);
				}

				this.tauxReussiteGarcon = function () {
					return this._getDataValue("tauxReussiteGarcon");
				}

				this.setTauxReussiteGarcon = function (tauxReussiteGarcon) {
					return this._setDataValue("tauxReussiteGarcon", tauxReussiteGarcon);
				}

				this.nbreMoyenneGarcon = function () {
					return this._getDataValue("nbreMoyenneGarcon");
				}

				this.nbreMoyenneFille = function () {
					return this._getDataValue("nbreMoyenneFille");
				}

				this.rang = function () {
					return parseInt(this._getDataValue("rang"));
				}

				this.periode = function () {
					return parseInt(this._getDataValue("periode"));
				}

				this.portee = function () {
					return this.data["portee"];
				}

				this.anneeAcad = function () {
					return this._getDataValue("anneeAcad");
				}

				this._getDataValue = function (name) {
					return parseFloat(this.data[name]);
				}
			},

			Departement: function (data) {
				tools.Library.Entity.call(this, data);

				this.models = function () {
					return this._getDataValue("models");
				}

				this.code = function () {
					return this._getDataValue("code");
				}

				this.cycle = function () {
					return this._getDataValue("cycle");
				}

				this.intitule = function () {
					return this._getDataValue("intitule");
				}

				this.regime = function () {
					return this._getDataValue("regime");
				}

				this.form = function () {
					return this._getDataValue("form");
				}
			},

			Classe: function (data) {
				tools.Library.Entity.call(this, data);

				this.systeme = function () {
					return this._getDataValue("systeme");
				}

				this.specialite = function () {
					return this._getDataValue("specialite");
				}

				this.idEtablissement = function () {
					return this._getDataValue("idEtablissement");
				}

				this.niveau = function () {
					return this._getDataValue("niveau");
				}

				this.groupe = function () {
					return this._getDataValue("groupe");
				}

				this.nbrPlace = function () {
					return this._getDataValue("nbrPlace");
				}

				this.fraisExamen = function () {
					return this._getDataValue("fraisExamen");
				}

				this.idPrincipal = function () {
					return this._getDataValue("idPrincipal");
				}
			},
		},
		Stats: {
			Matrice: function () {
				this.prefix = "";
				// Chaque élèment est un Library\Entity
				this.elements = new Map();
				// la clé c'est le nom de la colonne
				this.colonnes = [];
				// la clé c'est le nom de la ligne
				this.lignes = [];

				this.getColonnes = function () {
					return this.colonnes;
				}

				this.getLignes = function () {
					return this.lignes;
				}

				this.vectorColToCell = function (col) {
					var eltsLigne = this.getElementsColonne(col);
					// console.log(col);
					return this._vectorToCell(eltsLigne);
				}

				this.vectorLigneToCell = function (ligne) {
					var eltsLigne = this.getElementsLigne(ligne);
					// console.log(ligne);
					// console.log(this);
					return this._vectorToCell(eltsLigne);
				}

				this.fusionAllLignes = function () {
					var
						colsName = this.getLignes(),
						result = this.getElementsLigne(colsName.shift());

					for (let index = 0; index < colsName.length; index++) {
						const col1 = colsName[index];

						result = this._fusion(result, col1);
					}

					return result;
				}

				this.fusionAllColonnes = function () {
					var
						colsName = this.getColonnes(),
						result = this.getElementsColonne(colsName.shift());

					for (let index = 0; index < colsName.length; index++) {
						const col1 = colsName[index];

						result = this._fusion(result, col1);
					}

					return result;
				}

				this.fusionCols = function (col1, col2) {
					var
						col1Elemenst = this.getElementsColonne(col1),
						col2Elemenst = this.getElementsColonne(col2);

					return this._fusion(col1Elemenst, col2Elemenst);
				}

				this.fusionLignes = function (ligne1, ligne2) {
					var
						col1Elemenst = this.getElementsLigne(ligne1),
						col2Elemenst = this.getElementsLigne(ligne2);

					return this._fusion(col1Elemenst, col2Elemenst);
				}

				this.setElement = function (element, colName, ligneName) {
					var
						indexCol = this._getColIndex(colName),
						indexLigne = this._getLigneIndex(ligneName);
					// console.log(indexCol + " _ " + colName);
					if (!this.elements.has(indexLigne)) {
						this.elements.set(indexLigne, new Map());
					}
					// console.log(indexLigne + " index_col " + indexCol);
					// console.log(this);
					this.elements.get(indexLigne).set(indexCol, element);
					// console.log(this);
				}

				this.getElement = function (colName, ligneName) {
					var
						indexCol = this._getColIndex(colName),
						indexLigne = this._getLigneIndex(ligneName);
					// console.log(indexCol);
					// console.log(indexLigne);
					if (this.elements.has(indexLigne) && this.elements.get(indexLigne).has(indexCol)) {
						return this.elements.get(indexLigne).get(indexCol);
					}
					return null;
				}

				this.getElementsColonne = function (colName) {
					var result = [];
					// console.log(colIndex);
					for (let index = 0; index < this.lignes.length; index++) {
						const indexLigne = this._getLigneIndex(this.lignes[index]);
						result[indexLigne] = this.getElement(colName, this.lignes[index]);
					}

					return result;
				}

				this.getElementsLigne = function (ligneName) {
					var result = [];
					// console.log(ligneContentKeys);
					for (let i = 0; i < this.colonnes.length; i++) {
						const colName = this.colonnes[i];
						result.push(this.getElement(colName, ligneName));
					}
					// console.log(result);
					return result;
				}

				this._getColIndex = function (colName) {
					if (!this.colonnes.includes(colName)) {
						this.colonnes.push(colName);
					}
					// console.log(this.colonnes.includes(colName));
					// console.log("size: " + this.colonnes.length);
					var pos = this.elementKey(this.colonnes, colName);
					return this.prefix + pos;
				}

				this._getLigneIndex = function (ligneName) {
					if (!this.lignes.includes(ligneName)) {
						this.lignes.push(ligneName);
					}
					// return this.colonnes[ligneName];
					// console.log(ligneName + " <= " + this.elementKey(this.lignes, ligneName));
					return this.prefix + this.elementKey(this.lignes, ligneName);
				}

				this._fusion = function (elements1, elements2) {
					var result = [];

					for (let index = 0; index < elements1.length; index++) {
						const eltCol1 = elements2[index];
						const eltCol2 = elements1[index];
						result.push(eltCol1.add(eltCol2));
					}

					return result;
				}

				this._vectorToCell = function (vector) {
					// console.log(vector);
					var result = vector.shift();
					// console.log(vector);
					for (let index = 0; index < vector.length; index++) {
						const element = vector[index];
						result = result.add(element);
					}

					return result;
				}

				this.elementKey = function (list, element) {
					for (const key in list) {
						if (Object.hasOwnProperty.call(list, key)) {
							const elt = list[key];
							if (elt == element) {
								return key;
							}
						}
					}
					return null;
				}
			},

			MatriceUtilitary: {
				hasSameColonnes: function (mat1, mat2) {
					var col1 = mat1.getColonnes(), col2 = mat2.getColonnes();
					if (col1.length != col2.length) {
						return false;
					}

					return JSON.stringify(col1) === JSON.stringify(col2);
				},

				hasSameLignes: function (mat1, mat2) {
					var col1 = mat1.getLignes(), col2 = mat2.getLignes();
					if (col1.length != col2.length) {
						return false;
					}

					return JSON.stringify(col1) === JSON.stringify(col2);
				},

				hasSameConfig: function (mat1, mat2) {
					return tools.AppLib.Stats.MatriceUtilitary.hasSameColonnes(mat1, mat2) && tools.AppLib.Stats.MatriceUtilitary.hasSameLignes(mat1, mat2);
				},

				operationAddition: function (matR, mat1, mat2) {
					if (tools.AppLib.Stats.MatriceUtilitary.hasSameConfig(mat1, mat2)) {
						// var mat = new tools.AppLib.Stats.Matrice();
						for (let i = 0; i < mat1.getLignes().length; i++) {
							const ligneName = mat1.getLignes()[i];
							for (let j = 0; j < mat1.getColonnes().length; j++) {
								const colName = mat1.getColonnes()[j];

								matR.setElement(mat1.getElement(colName, ligneName).add(mat2.getElement(colName, ligneName)), colName, ligneName);
							}
						}
						return matR;
					}
					else {
						console.log("Les matrices n'ont pas une configuration identique !");
						return null;
					}
				}
			}
		},
		Conteneur: {
			NoteMention: function (valeur) {
				if (valeur < 11) return "Non Acquis";

				if (valeur < 15) return "En cours Acquisition";

				return "Acquis";
			},
			ConteneurServer: {
				_servers: [],

				setServer: function (name, conteneur) {
					tools.AppLib.Conteneur.ConteneurServer._servers[name] = conteneur;
				},

				getServer: function (name) {
					return tools.AppLib.Conteneur.ConteneurServer._servers[name];
				}
			},

			ConteneurUtilitary: {
				resumeNotes: function (notes, disciplinesConteneur) {
					var somme = 0, coeff = 0, total = 0, first = null, last = null;

					notes = notes.sort(function (a, b) { return a.valeur() - b.valeur() });
					// console.log(notes);
					// tp.aler();

					for (let i = 0; i < notes.length; i++) {
						const note = notes[i];
						var disc = disciplinesConteneur.disciplineFromNote(note);

						if (note.statut() == tools.AppLib.constantes.NOTE_EN_COMPTE) {
							somme += note.valeur() * disc.coefficient();
							total += disc.maxNote() * disc.coefficient();
							coeff += disc.coefficient();
						}
					}

					var moy = total > 0 ? Math.round(((somme * 20) / total) * 100) / 100 : 0;
					first = notes.shift();
					last = notes.pop();

					return [moy, somme, coeff, total, first, last];
				},
				FilterEntities: function () {
					this.filterMinValAttrib = function (entities, val, attribName) {
						var result = [];

						for (let i = 0; i < entities.length; i++) {
							const arch = entities[i];
							if (arch.getData()[attribName] < val) {
								result.push(arch);
							}
						}

						return result;
					}

					this.filterMaxValAttrib = function (entities, val, attribName) {
						var result = [];

						for (let i = 0; i < entities.length; i++) {
							const arch = entities[i];
							if (arch.getData()[attribName] > val) {
								result.push(arch);
							}
						}

						return result;
					}

					this.filterHaveValAttrib = function (entities, val, attribName) {
						var result = [];

						for (let i = 0; i < entities.length; i++) {
							const arch = entities[i];
							if (arch.getData()[attribName] == val) {
								result.push(arch);
							}
						}

						return result;
					}
				}
			},

			ArchivebulletinConteneur: function (archivebulletins) {
				this.archivebulletins = archivebulletins;

				this.archivesInTrim = function (trim) {
					var results = [];

					for (let i = 0; i < this.archivebulletins.length; i++) {
						const archive = this.archivebulletins[i];
						if (archive.trimestre() == trim) {
							results.push(archive);
						}
					}

					return results;
				}

				this.archivesForClasseInTrim = function (idClasse, trim) {
					var results = [];

					for (let i = 0; i < this.archivebulletins.length; i++) {
						const archive = this.archivebulletins[i];
						if (archive.getData()["idClasse"] == idClasse && archive.trimestre() == trim) {
							results.push(archive);
						}
					}

					return results;
				}

				this.resumeGenders = function (archives, mode, maxVal, thVal = 11.99999) {
					var
						sexeM = "masculin",
						archiveGM = this.filterGender(archives, sexeM),
						archiveGMR = this.filterMaxValAttrib(archiveGM, maxVal, mode),
						archiveR = this.filterMaxValAttrib(archives, maxVal, mode),
						archiveRTH = this.filterMaxValAttrib(archives, thVal, mode);
					// archiveGME = this.filterMinValAttrib(archiveGM, minVal, mode);

					return [
						archiveRTH.length,
						archiveGM.length,
						archives.length - archiveGM.length,
						archiveGMR.length,
						archiveR.length - archiveGMR.length,
						archiveGM.length - archiveGMR.length,
						archives.length - archiveGM.length - (archiveR.length - archiveGMR.length),
						(((archiveGMR.length / archiveGM.length)) * 100).toFixed(2),
						((((archiveR.length - archiveGMR.length) / (archives.length - archiveGM.length))) * 100).toFixed(2),
						(((archiveR.length / archives.length)) * 100).toFixed(2)
					];
				}

				this.filterGender = function (archives, gender) {
					var result = [];

					for (let i = 0; i < archives.length; i++) {
						const arch = archives[i];
						if (arch.getData().pSexe == gender) {
							result.push(arch);
						}
					}

					return result;
				}

				this.filterMinValAttrib = function (archives, val, attribName) {
					var result = [];

					for (let i = 0; i < archives.length; i++) {
						const arch = archives[i];
						if (arch.getData()[attribName] < val) {
							result.push(arch);
						}
					}

					return result;
				}

				this.filterMaxValAttrib = function (archives, val, attribName) {
					var result = [];

					for (let i = 0; i < archives.length; i++) {
						const arch = archives[i];
						if (arch.getData()[attribName] > val) {
							result.push(arch);
						}
					}

					return result;
				}

				this.filterHaveValAttrib = function (archives, val, attribName) {
					var result = [];

					for (let i = 0; i < archives.length; i++) {
						const arch = archives[i];
						if (arch.getData()[attribName] == val) {
							result.push(arch);
						}
					}

					return result;
				}
			},

			EnseignementsConteneur: function (enseignements) {
				this.enseignements = enseignements;

				this.enseignementsFromClasseID = function (idClasse) {
					var result = [];

					for (let i = 0; i < this.enseignements.length; i++) {
						const elt = this.enseignements[i];
						if (idClasse == elt.idClasse()) {
							result.push(elt);
						}
					}

					return result;
				}

				this.enseignementFromNote = function (note) {
					for (let i = 0; i < this.enseignements.length; i++) {
						const elt = this.enseignements[i];
						if (elt.id() == note.idEnseignement()) {
							return elt;
						}
					}
					return null;
				}

				this.enseignementFromDiscipline = function (disc) {
					for (let i = 0; i < this.enseignements.length; i++) {
						const elt = this.enseignements[i];
						if (elt.idDiscipline() == disc.id()) {
							return elt;
						}
					}
					return null;
				}

				this.listEnseignementsFromListDisciplines = function (disciplines) {
					var result = [];

					for (let i = 0; i < disciplines.length; i++) {
						const disc = disciplines[i];
						result.push(this.enseignementFromDiscipline(disc));
					}

					return result;
				}

				this.getEnseignements = function () {
					return this.enseignements;
				}

				this.getUniqueEnseignement = function (idEnseignement) {
					for (let i = 0; i < this.enseignements.length; i++) {
						const ens = this.enseignements[i];
						if (ens.id() == idEnseignement) {
							return ens;
						}
					}
					return null;
				}
			},

			DisciplineConteneur: function (enseignementsConteneur, disciplines) {
				this.enseignementsConteneur = enseignementsConteneur;
				this.disciplines = disciplines;

				this.groupsFormations = function () {
					var result = [];

					for (let i = 0; i < this.disciplines.length; i++) {
						const disc = this.disciplines[i];
						if (result[disc.form()] === undefined) {
							result[disc.form()] = [];
						}
						result[disc.form()].push(disc);
					}

					return result;
				}

				this.enseignementsGroupsFormations = function () {
					var result = {}, groupDisciplines = this.groupsFormations();

					for (const form in groupDisciplines) {
						if (Object.hasOwnProperty.call(groupDisciplines, form)) {
							const grpDisciplines = groupDisciplines[form];
							var enseignements = this.enseignementsConteneur.listEnseignementsFromListDisciplines(grpDisciplines);
							// console.log(form);
							result[form] = enseignements;
						}
					}

					return result;
				}

				this.disciplineFromNote = function (note) {
					var enseignement = this.enseignementsConteneur.enseignementFromNote(note);
					return this.disciplineFromEnseignement(enseignement);
				}

				this.disciplineFromEnseignement = function (enseignement) {
					for (let i = 0; i < this.disciplines.length; i++) {
						const disc = this.disciplines[i];
						if (disc.id() == enseignement.idDiscipline()) {
							return disc;
						}
					}
					return null;
				}

				this.disciplineFromIDEnseignement = function (idEnseignement) {
					var enseignement = this.enseignementsConteneur.getUniqueEnseignement(idEnseignement);
					return this.disciplineFromEnseignement(enseignement);
				}

				this.getEnseignementsConteneur = function () {
					return this.enseignementsConteneur;
				}

				this.getDisciplines = function () {
					return this.disciplines;
				}
			},

			NotesConteneur: function (notes) {
				this.notes = notes;

				this.notesFromEnseignement = function (enseignement) {
					var result = [];
					for (let i = 0; i < this.notes.length; i++) {
						const note = this.notes[i];
						if (note.idEnseignement() == enseignement.id()) {
							result.push(note);
						}
					}

					return result;
				}

				this.notesFromEleve = function (idEleve) {
					var result = [];
					for (let i = 0; i < this.notes.length; i++) {
						const note = this.notes[i];
						if (note.idEleve() == idEleve) {
							result.push(note);
						}
					}

					return result;
				}

				this.noteFromEleveInEnseignement = function (idEleve, idEnseignement) {
					for (let i = 0; i < this.notes.length; i++) {
						const note = this.notes[i];
						// console.log(note.idEnseignement() + " f " + idEnseignement + " " + (note.idEnseignement() == idEnseignement));
						// console.log(note.idEleve() + " g " + idEleve + " " + (note.idEleve() == idEleve));
						if (note.idEleve() == idEleve && note.idEnseignement() == idEnseignement) {
							return note;
						}
					}

					return new tools.AppLib.Entities.Note({
						"statut": tools.AppLib.constantes.NOTE_STATUT_NON_EN_COMPTE,
						"valeur": 0,
						"idEnseignement": idEnseignement,
						"idEleve": idEleve,
					});
				}
			},

			ClasseNoteConteneur: function (disciplinesConteneur, notesConteneur, elevesListID) {
				tools.AppLib.Stats.Matrice.call(this);
				tools.AppLib.Conteneur.ConteneurServer.setServer("disciplineConteneur", disciplinesConteneur);

				this.disciplinesConteneur = disciplinesConteneur;
				this.notesConteneur = notesConteneur;
				this.elevesListID = elevesListID;

				// Liste des fonctions
				this._init = function (elevesListID) {
					var enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();
					for (let index = 0; index < enseignements.length; index++) {
						const enseignement = enseignements[index];
						// console.log(enseignement);
						for (let j = 0; j < elevesListID.length; j++) {
							const idEleve = elevesListID[j];
							this.setElement(this.notesConteneur.noteFromEleveInEnseignement(idEleve, enseignement.id()), idEleve, enseignement.id());
						}
					}
				}

				this.synthesNotesFromAllEnseignementsByEleves = function () {
					var enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();
					return this.synthesNotesFromListEnseignementsByEleves(enseignements);
				}

				this.synthesNotesFromAllGroupsEnseignementsByEleves = function () {
					var
						results = {},
						// groupDisciplines = this.disciplinesConteneur.groupsFormations(),
						enseignementsGroups = this.disciplinesConteneur.enseignementsGroupsFormations();

					for (const formation in enseignementsGroups) {
						if (Object.hasOwnProperty.call(enseignementsGroups, formation)) {
							const enseignements = enseignementsGroups[formation];
							// console.log(groupDisciplines[formation]);
							results[formation] = this.synthesNotesFromListEnseignementsByEleves(enseignements);
						}
					}

					return results;
				}

				this.synthesNotesFromAllGroupsEnseignementsForEleves = function (idEleve) {
					var
						results = {},
						// groupDisciplines = this.disciplinesConteneur.groupsFormations(),
						enseignementsGroups = this.disciplinesConteneur.enseignementsGroupsFormations();
					// console.log(groupDisciplines);
					for (const formation in enseignementsGroups) {
						if (Object.hasOwnProperty.call(enseignementsGroups, formation)) {
							const enseignements = enseignementsGroups[formation];
							// console.log(formation);
							results[formation] = this.synthesNotesFromListEnseignementsForEleve(enseignements, idEleve);
						}
					}

					return results;
				}

				this.synthesNotesFromListEnseignementsByEleves = function (enseignements) {
					var result = [];

					for (let j = 0; j < this.elevesListID.length; j++) {
						const idEleve = this.elevesListID[j];

						result[idEleve] = this.synthesNotesFromListEnseignementsForEleve(enseignements, idEleve);

					}

					return result;
				}

				this.synthesNotesFromListEnseignementsForEleve = function (enseignements, idEleve) {
					var notesEleves = [];

					for (let i = 0; i < enseignements.length; i++) {
						const ensgn = enseignements[i];
						// console.log(this.noteFromEleveInEnseignement(idEleve, ensgn.id()));
						notesEleves.push(this.noteFromEleveInEnseignement(idEleve, ensgn.id()));
					}
					resume = this.resumeNotes(notesEleves);
					// console.log(resume);
					// console.log(resume());
					return new tools.AppLib.Entities.Note({
						"statut": tools.AppLib.constantes.NOTE_EN_COMPTE,
						"valeur": resume[0],
						"idEleve": idEleve,
						"sommme": resume[1],
						"coeff": resume[2],
						"total": resume[3],
					});
				}

				this.resumeNotesFromAllEnseignementsForEleve = function (idEleve) {
					var result = [], enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();

					for (let i = 0; i < enseignements.length; i++) {
						const ensgn = enseignements[i];
						result.push(this.resumeNotesFromEnseignementForEleve(ensgn.id(), idEleve));
					}

					return result;
				}

				this.syntheseNotesFromAllDisciplineForEleve = function (idEleve) {
					var result = new Map(), enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();

					for (let i = 0; i < enseignements.length; i++) {
						const ensgn = enseignements[i];
						result.set(ensgn.idDiscipline(), this.resumeNotesFromEnseignementForEleve(ensgn.id(), idEleve));
					}

					return result;
				}

				this.syntheseNotesFromAllDisciplines = function () {
					var result = new Map(), enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();

					for (let i = 0; i < this.elevesListID.length; i++) {
						const idEleve = this.elevesListID[i];
						var content = new Map();

						for (let j = 0; j < enseignements.length; j++) {
							const ensgn = enseignements[j];
							content.set(ensgn.idDiscipline(), this.resumeNotesFromEnseignementForEleve(ensgn.id(), idEleve));
						}

						result.set(idEleve, content);
					}

					return result;
				}

				this.resumeNotesFromEnseignementForEleve = function (idEnseignement, idEleve) {
					var notes = this.notesFromEnseignement(idEnseignement);
					// console.log(notes);
					return this.resumeNotesForEleve(notes, idEleve);
				}

				this.resumeNotesForEleve = function (notes, idEleve) {
					var rang = 0, note;

					notes.sort(function (a, b) { return a.valeur() - b.valeur() });
					for (let i = 0; i < notes.length; i++) {
						note = notes[i];

						if (note.statut() == tools.AppLib.constantes.NOTE_EN_COMPTE) {
							if (note.idEleve() != idEleve) {
								rang++;
							} else break;
						}
					}

					var result = this.resumeNotes(notes);

					result.unshift(note);
					result.unshift(rang);
					// console.log(result);
					// tp.aler();
					return result;
				}

				this.resumeNotes = function (notes) {
					return tools.AppLib.Conteneur.ConteneurUtilitary.resumeNotes(notes, this.disciplinesConteneur);
				}

				this.formatShowEnseignementsNotes = function (enseignants, resumeSeqDeb, resumeSeqFin, resumeTrim) {
					var result = [];
					// enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();
					for (let i = 0; i < resumeTrim.length; i++) {
						const resumeT = resumeTrim[i];
						var discicipline = this.disciplinesConteneur.disciplineFromIDEnseignement(resumeT[1].idEnseignement());

						result.push([discicipline.form(), discicipline.intitule(), enseignants[resumeT[1].idEnseignement()], resumeSeqDeb[i][1].valeur(), resumeSeqFin[i][1].valeur(), resumeT[1].valeur(), discicipline.coefficient(), resumeT[0], resumeT[6].valeur(), resumeT[7].valeur(), tools.AppLib.Conteneur.NoteMention(resumeT[7].valeur())])
					}

					return result;
				}

				this.formatShowEnseignementsNotesAllFormations = function (notesSeqDeb, notesSeqFin, notesTrim) {
					var result = [];
					// enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();
					console.log(notesTrim);
					for (const formation in notesTrim) {
						if (Object.hasOwnProperty.call(notesTrim, formation)) {
							const noteT = notesTrim[formation];
							// console.log(notesSeqDeb[formation]);
							result.push([formation, notesSeqDeb[formation].valeur(), notesSeqFin[formation].valeur(), notesTrim[formation].valeur(), notesSeqDeb[formation].getData().coeff, notesSeqFin[formation].getData().coeff, notesTrim[formation].getData().coeff])

						}
					}

					return result;
				}

				this.formatShowEnseignementsNotesFormation = function (formation, noteSeqDeb, noteSeqFin, noteTrim) {
					var result = [];
					// enseignements = this.disciplinesConteneur.getEnseignementsConteneur().getEnseignements();
					for (let i = 0; i < resumeTrim.length; i++) {
						const resumeT = resumeTrim[i];
						// var discicipline = this.disciplinesConteneur.disciplineFromIDEnseignement(resumeT[1].idEnseignement());
						result.push([formation, noteSeqDeb.valeur(), noteSeqFin.valeur(), noteTrim.valeur(), noteSeqDeb.coeff(), noteSeqFin.coeff(), noteTrim.coeff()])
					}

					return result;
				}

				this.noteFirst = function (notes) {
					var note = notes.shift();
					for (let index = 0; index < notes.length; index++) {
						const noteTMP = notes[index];
						if (note.valeur() < noteTMP.valeur()) {
							note = noteTMP;
						}
					}
					return note;
				}

				this.noteLast = function (notes) {
					var note = notes.shift();
					for (let index = 0; index < notes.length; index++) {
						const noteTMP = notes[index];
						if (note.valeur() > noteTMP.valeur()) {
							note = noteTMP;
						}
					}
					return note;
				}

				this.notesFromEnseignement = function (idEnseignement) {
					return this.getElementsLigne(idEnseignement);
				}

				this.notesFromEleve = function (idEleve) {
					return this.getElementsColonne(idEleve);
				}

				this.noteFromEleveInEnseignement = function (idEleve, idEnseignement) {
					return this.getElement(idEleve, idEnseignement);
				}

				this._init(elevesListID);
			},

			DepartementConteneur: function (disciplineConteneur, departements) {
				this.disciplineConteneur = disciplineConteneur;
				this.departements = departements;
				this.departementsUsed = new Map();
				// console.log(departements);
				this.departementFromID = function (idDepartement) {
					for (let i = 0; i < this.departements.length; i++) {
						const dep = this.departements[i];
						if (dep.id() == idDepartement) {
							return dep;
						}
					}

					return null;
				}

				this.departementFromIDEnseignement = function (idEnseignement) {
					var discipline = this.disciplineConteneur.disciplineFromIDEnseignement(idEnseignement);

					for (let i = 0; i < this.departements.length; i++) {
						const dep = this.departements[i];
						if (dep.models().includes(discipline.id())) {
							if (!this.departementsUsed.has(dep.id())) {
								this.departementsUsed.set(dep.id(), dep);
							}
							return dep;
						}
					}
					// console.log(discipline);
					return null;
				}

				this.getDisciplineConteneur = function () {
					return this.disciplineConteneur;
				}

				this.getDepartementsUsed = function () {
					return Array.from(this.departementsUsed, ([name, value]) => ({ name: value }));
					// return this.departementsUsed.entries();
				}
			},

			ResumestatpedagogiksConteneur: function (departementsConteneur, resumestatpedagogik, rang = 1, periode = "trimestre") {
				this.departementConteneur = departementsConteneur;
				this.resumestatpedagogik = resumestatpedagogik;

				this.rang = rang;
				this.periode = periode;

				this.resumestatpedagogikFromClasse = function (idClasse, portee = "ENSEIGNEMENT") {
					var
						result = [],
						enseignements = this.departementConteneur.getDisciplineConteneur().getEnseignementsConteneur().enseignementsFromClasseID(idClasse);
					// console.log("cl " + idClasse);
					// console.log(enseignements);
					for (let i = 0; i < enseignements.length; i++) {
						const ens = enseignements[i];
						for (let j = 0; j < this.resumestatpedagogik.length; j++) {
							const res = this.resumestatpedagogik[j];
							if (res.idEnseignement() == ens.id()) {
								result.push(res);
							} else {
								result.push(new tools.AppLib.Entities.Resumestatpedagogik({
									"idEnseignement": ens.id(),
									"portee": portee,
									"hrsAnnuellePrevue": 0,
									"hrsFaiteCumul": 0,
									"leconAnnuellePrevues": 0,
									"leconAnnuelleFaite": 0,
									"hrsTPPrevues": 0,
									"HrsTPFaits": 0,
									"effGarcon": 0,
									"effFilles": 0,
									"effPresentGarcon": 0,
									"effPresentFille": 0,
									"tauxReussiteFille": 0,
									"tauxReussiteGarcon": 0,
									"nbreMoyenneGarcon": 0,
									"nbreMoyenneFille": 0,
									"periode": this.periode,
									"rang": this.rang
								}))
							}
						}
					}

					return result;
				}

				this.resumestatpedagogikFromClasseID = function (idClasse) {
					var result = [];
					// console.log("cl " + idClasse);
					// console.log(enseignements);
					for (let j = 0; j < this.resumestatpedagogik.length; j++) {
						const res = this.resumestatpedagogik[j];
						// console.log(res.portee());
						if (res.portee() == "CLASSE" && res.idEnseignement() == idClasse) {
							result.push(res);
						}
					}

					if (result.length) {
						return result;
					} else {
						return [new tools.AppLib.Entities.Resumestatpedagogik({
							"idEnseignement": idClasse,
							"hrsAnnuellePrevue": 0,
							"hrsFaiteCumul": 0,
							"leconAnnuellePrevues": 0,
							"leconAnnuelleFaite": 0,
							"hrsTPPrevues": 0,
							"HrsTPFaits": 0,
							"effGarcon": 0,
							"effFilles": 0,
							"effPresentGarcon": 0,
							"effPresentFille": 0,
							"tauxReussiteFille": 0,
							"tauxReussiteGarcon": 0,
							"nbreMoyenneGarcon": 0,
							"nbreMoyenneFille": 0,
							"periode": this.periode,
							"rang": this.rang
						})];
					}
				}

				this.getDepartementConteneur = function () {
					return this.departementConteneur;
				}
			},

			ClasseDepartementResumestatpedagogikPeriodeConteneur: function (departementConteneur, resumestatpedagogiks, periode, rang = 1) {
				tools.AppLib.Stats.Matrice.call(this);

				this.departementConteneur = departementConteneur;
				this.resumestatpedagogiks = resumestatpedagogiks;
				this.periode = periode;
				this.rang = rang;
				this.departements = new Map();

				// Liste des fonctions
				this._init = function () {
					// var enseignements = this.departementConteneur.getDisciplineConteneur().getEnseignementsConteneur().getEnseignements();
					for (let i = 0; i < this.resumestatpedagogiks.length; i++) {
						const resume = this.resumestatpedagogiks[i];
						var departement = null, cell = null;

						if (resume.portee() == "ENSEIGNEMENT") {
							departement = this.departementConteneur.departementFromIDEnseignement(resume.idEnseignement());
							// console.log(departement);
						} else {
							// console.log(resume);
							departement = this.departementConteneur.departementFromID(resume.idEnseignement());
						}
						cell = this.getElement(resume.rang(), departement.id());
						// this.getElement()
						this.departements.set(departement.id(), departement);
						if (cell == null) {
							cell = resume;
						} else {
							cell = cell.add(resume);
						}
						this.setElement(cell, resume.rang(), departement.id());
						// console.log(this.getElement(resume.rang(), departement.id()));
					}
					// console.log(this.resumestatpedagogiks.length);
					this._validate();
				}

				this._validate = function () {
					// var enseignements = this.departementConteneur.getDisciplineConteneur().getEnseignementsConteneur().getEnseignements();
					for (const colName of this.getColonnes()) {
						for (const ligneName of this.getLignes()) {
							// console.log(ligneName);
							this.getElement(colName, ligneName).setIdEnseignement("dep" + ligneName);
						}
					}
					// console.log(this.resumestatpedagogiks.length);
				}

				this.hasContentDepartement = function (idDepartement) {
					return this.departements.has(idDepartement);
				}

				this.resumePeriodeDepartement = function (idDepartement) {
					// console.log(this);
					// console.log(idDepartement);
					if (this.hasContentDepartement(idDepartement)) {
						var resume = this.vectorLigneToCell(idDepartement);
						return resume;
					}
					return new tools.AppLib.Entities.Resumestatpedagogik({
						"idEnseignement": "dep" + idDepartement,
						"hrsAnnuellePrevue": 0,
						"hrsFaiteCumul": 0,
						"leconAnnuellePrevues": 0,
						"leconAnnuelleFaite": 0,
						"hrsTPPrevues": 0,
						"HrsTPFaits": 0,
						"effGarcon": 0,
						"effFilles": 0,
						"effPresentGarcon": 0,
						"effPresentFille": 0,
						"tauxReussiteFille": 0,
						"tauxReussiteGarcon": 0,
						"nbreMoyenneGarcon": 0,
						"nbreMoyenneFille": 0,
						"periode": this.periode,
						"rang": this.rang
					})
				}

				this.resumePeriodeRang = function (rang) {
					// console.log(this);
					// console.log(rang);
					var resume = this.vectorColToCell(rang);
					return resume;
				}

				this.sequences = function () {
					return this.getColonnes();
				}

				this.getDepartementsID = function () {
					return this.getLignes();
				}

				this._init();
			},

			EtabllissementResumeStatPedagogiqueClasses: function (resumestatpedagogiksConteneur, classesID) {
				tools.AppLib.Stats.Matrice.call(this);
				this.resumestatpedagogiksConteneur = resumestatpedagogiksConteneur;
				this.classesID = classesID;

				this._init = function () {
					for (let i = 0; i < this.classesID.length; i++) {
						const idClasse = this.classesID[i];
						// console.log(this.resumestatpedagogiksConteneur.getDepartementConteneur());
						var cells = this.resumestatpedagogiksConteneur.resumestatpedagogikFromClasseID(idClasse);
						for (let j = 0; j < cells.length; j++) {
							const cell = cells[j];
							this.setElement(cell, cell.rang(), idClasse);
						}
					}
					// console.log(this.classesID);
				}

				this.resumeDetailsEtsClasses = function (trim) {
					var results = [];

					for (let i = 0; i < this.classesID.length; i++) {
						const idClasse = this.classesID[i];
						// console.log(idClasse);
						results.push({ "idClasse": idClasse, "resume": this.getElement(trim, idClasse) });
					}

					return results;
				}

				this.resumeEtsClasses = function (trim) {
					// console.log(this.classesID[0]);
					// console.log(this.elements.get("_0").get("_0"));
					// console.log(this);
					var resume = this.getElement(trim, this.classesID[0]);
					for (let i = 1; i < this.classesID.length; i++) {
						const idClasse = this.classesID[i];
						resume = resume.add(this.getElement(trim, idClasse));
					}

					return resume;
				}

				this._init();
			},

			EtabllissementResumeStatPedagogique: function (resumestatpedagogiksConteneur, classesID) {
				tools.AppLib.Stats.Matrice.call(this);
				this.resumestatpedagogiksConteneur = resumestatpedagogiksConteneur;
				this.classesID = classesID;

				this._init = function () {
					for (let i = 0; i < this.classesID.length; i++) {
						const idClasse = this.classesID[i];
						// console.log(this.resumestatpedagogiksConteneur.getDepartementConteneur());
						var cell = new tools.AppLib.Conteneur.ClasseDepartementResumestatpedagogikPeriodeConteneur(this.resumestatpedagogiksConteneur.getDepartementConteneur(), this.resumestatpedagogiksConteneur.resumestatpedagogikFromClasse(idClasse), "trimestre");
						this.setElement(cell, 0, idClasse);
					}
				}

				this.resumeDetailsEtsClasses = function (trim) {
					var results = [];

					for (let i = 0; i < this.classesID.length; i++) {
						const idClasse = this.classesID[i];
						// console.log(idClasse);
						results.push({ "idClasse": idClasse, "resume": this.getElement(0, idClasse).resumePeriodeRang(trim) });
					}

					return results;
				}

				this.resumeDetailsEtsDepartement = function (trim) {
					var results = [],
						departements = this.resumestatpedagogiksConteneur.getDepartementConteneur().getDepartementsUsed();

					for (const departementName of departements) {
						const departL = departementName;
						// console.log(this.resumeEtsDepartement(departL.name.id()));
						results.push({ "idDepartement": departL.name.id(), "departement": departL.name.intitule(), "resume": this.resumeEtsDepartement(departL.name.id()) });
					}

					return results;
				}

				this.resumeEtsClasses = function (trim) {
					// console.log(this.classesID[0]);
					// console.log(this.elements.get("_0").get("_0"));
					// console.log(this);
					var resume = this.getElement(0, this.classesID[0]).resumePeriodeRang(trim);
					for (let i = 1; i < this.classesID.length; i++) {
						const idClasse = this.classesID[i];
						resume = resume.add(this.getElement(0, idClasse).resumePeriodeRang(trim));
					}

					return resume;
				}

				this.resumeEtsDepartement = function (idDepartement) {
					// console.log(idDepartement);
					var resume = this.getElement(0, this.classesID[0]).resumePeriodeDepartement(idDepartement);
					for (let i = 1; i < this.classesID.length; i++) {
						const idClasse = this.classesID[i];
						// console.log(resume);
						resume = resume.add(this.getElement(0, idClasse).resumePeriodeDepartement(idDepartement));
						// console.log(resume);
					}
					// console.log(resume);
					return resume;
				}

				this.resumeEtsDepartements = function () {
					// console.log(this);
					var
						resume = null,
						departements = this.resumestatpedagogiksConteneur.getDepartementConteneur().getDepartementsUsed();
					// console.log(departements);
					for (const departementName of departements) {
						const departement = departementName.name;
						// console.log(departement);
						if (resume == null) {
							resume = this.resumeEtsDepartement(departement.id());
						} else {
							// console.log("resume");
							// console.log(this.resumeEtsDepartement(departement.id()));
							resume = resume.add(this.resumeEtsDepartement(departement.id()));
							// console.log(resume);
						}
						// console.log(resume);
					}

					return resume;
				}

				this._init();
			}
		},
		Models: {
			ClasseManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Archivebulletin");

				this.classeForEtablissement = function (httpRequest, attribHTTP) {
					this._requestFetchAll("/s.admin/js/classes/", httpRequest, attribHTTP, null);
				}

			},

			ArchivebulletinManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Archivebulletin");

				this.archiveForEtablissementStatTrim = function (trim, httpRequest, attribHTTP) {
					this._requestFetchAll("/s.admin/js/stats/trim" + trim, httpRequest, attribHTTP, null);
				}

			},
			ResumestatpedagogikManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Resumestatpedagogik");

				this.inEvaluationFromClasse = function (idClasse, httpRequest, attribHTTP) {
					this._requestFetchAll("/json/resumepedagogik-trim.json", httpRequest, attribHTTP, null);
				}

				this.inEvaluationFromContext = function (httpRequest, attribHTTP) {
					this._requestFetchAll("json/resumes", httpRequest, attribHTTP, null);
				}
			},
			NoteManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Note");

				this.inEvaluationFromClasse = function (idClasse, sequence, httpRequest, attribHTTP) {
					this._requestFetchAll("notes-seq-" + sequence + ".json", httpRequest, attribHTTP, null);
				}

				this.formatFromData = function (data) {
					var results = [];

					for (let i = 0; i < data.length; i++) {
						const lData = data[i];
						results.push(new tools.AppLib.Entities.Note(lData));
					}

					return results;
				}
			},
			DepartementManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Departement");

				this.fromEtablissement = function (idClasse, httpRequest, attribHTTP) {
					this._requestFetchAll("/json/disciplines_models_fr_gen_departement.json", httpRequest, attribHTTP, null);
				}

				this.inEvaluationFromContext = function (httpRequest, attribHTTP) {
					this._requestFetchAll("json/departements", httpRequest, attribHTTP, null);
				}
			},
			DisciplineManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Discipline");

				this.fromClasseInYear = function (idClasse, httpRequest, attribHTTP) {
					this._requestFetchAll("disciplines.json", httpRequest, attribHTTP, null);
				}

				this.inEvaluationFromContext = function (httpRequest, attribHTTP) {
					this._requestFetchAll("json/disciplines", httpRequest, attribHTTP, null);
				}
			},
			EnseignementManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Enseignement");

				this.fromClasseInYear = function (idClasse, httpRequest, attribHTTP) {
					this._requestFetchAll("enseignements.json", httpRequest, attribHTTP, null);
				}

				this.inEvaluationFromContext = function (httpRequest, attribHTTP) {
					this._requestFetchAll("json/enseignements", httpRequest, attribHTTP, null);
				}

				this.formatFromData = function (data) {
					var results = [];

					for (let i = 0; i < data.length; i++) {
						const lData = data[i];
						results.push(new tools.AppLib.Entities.Enseignement(lData));
					}

					return results;
				}
			},
			EleveManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Eleve");

				this.fromClasseInYear = function (idClasse, httpRequest, attribHTTP) {
					this._requestFetchAll("eleves.json", httpRequest, attribHTTP, null);
				}
			},
			PersonneManagers_AJAX: function () {
				tools.Library.Managers_api.call(this, "Personne");

				this.fromClasseInYear = function (idClasse, httpRequest, attribHTTP) {
					this._requestFetchAll("eleves.json", httpRequest, attribHTTP, null);
				}
			}
		}
	},
	Library: {
		Entity: function (data) {
			this.data = data;

			this.getData = function () {
				return this.data;
			}

			this.add = function (entity) {
				return new tools.Library.Entity;
			}

			this.id = function () {
				return this._getDataValue("id");
			}

			this.dateModif = function () {
				return this._getDataValue("dateModif");
			}

			this.dateInsert = function () {
				return this._getDataValue("dateInsert");
			}

			this._getDataValue = function (attrib) {
				return this.data[attrib];
			}

			this._setDataValue = function (attrib, valeur) {
				return this.data[attrib] = valeur;
			}

			this.getData = function () {
				return JSON.parse(JSON.stringify(this.data));
			}
		},
		Managers: function (api, dao) {
			this.api = api;
			this.dao = dao;

			this.getManagerOf = function (model) {
				var namespace = tools.AppLib.Models;
				return new namespace[model + "Managers_AJAX"];
			}
		},
		Managers_api: function (table) {
			this.table = table;
			this.listenerHttpRequest = [];

			this._requestFetchAll = function (request, httpRequest, attribRequest, dataFilter) {
				this.listenerHttpRequest[attribRequest] = httpRequest;
				// console.log(this.table);
				var table = this.table;
				$.ajax({
					type: "POST",
					url: request,
					data: dataFilter,
					dataType: "JSON",
					// success: this._loadData
					success: function (reponse) {
						var result = [];
						// console.log(table);
						for (const pos in reponse) {
							if (Object.hasOwnProperty.call(reponse, pos)) {
								const element = reponse[pos];
								var entityNP = new tools.AppLib.Entities[table](element);
								result.push(entityNP);
							}
						}
						httpRequest.setAttribute(attribRequest, result);
						httpRequest.chainActivate();
					}
				});
			}

			this.save = function (uri, data, httpRequest) {
				console.log(JSON.stringify(data));
				$.ajax({
					type: "POST",
					url: uri,
					data: { "dataJSON": JSON.stringify(data) },
					success: function (reponse) {
						console.log(reponse);
						// httpRequest.chainActivate();
					}
				});
			}

			this._loadData = function (data) {
				for (const attribRequest in this.listenerHttpRequest) {
					if (Object.hasOwnProperty.call(this.listenerHttpRequest, attribRequest)) {
						const httpRequest = this.listenerHttpRequest[attribRequest];

						httpRequest.chainActivate();
					}
				}
			}

			this.addListenerRequest = function (httpRequest) {
				this.listenerHttpRequest.push(httpRequest);
			}

			this.getTable = function () {
				return this.table;
			}
		},
		AppComponent: function (app) {
			this.app = app;

			this.getApp = function () {
				return this.app;
			}
		},
		HTTPRequest: function (app) {
			tools.Library.AppComponent.call(this, app);
			this.dataActivate = [];
			this.attributes = [];

			this.chainActivate = function () {
				// console.log(this.dataActivate);
				if (this.dataActivate != null) {
					// console.log(this.dataActivate);
					var dataActivateTMP = [], element = null, add = false;
					for (const key in this.dataActivate) {
						const elementTMP = this.dataActivate[key];
						if (Object.hasOwnProperty.call(this.dataActivate, key)) {
							// console.log("inside");
							if (add) {
								dataActivateTMP.push(elementTMP);
							} else {
								element = elementTMP;
								add = true;
							}
						}
					}
					// console.log(add);
					if (add) {
						this.dataActivate = dataActivateTMP;
					} else {
						this.dataActivate = null;
						this.chainActivate();
					}
					if (element != null) {
						element(this);
					}
					// var action = this.dataActivate.shift();
					// console.log(this.dataActivate.keys());
					// action(this);
				} else {
					var controller = this.app.getCurrentController();
					// console.log(controller);
					controller.execute();
				}
			}

			this.requestURI = function () {
				return window.location.pathname;
			}

			this.setDataActivate = function (dataActivate) {
				this.dataActivate = dataActivate;
			}

			this.setAttribute = function (name, value) {
				this.attributes[name] = value;
			}

			this.getAttribute = function (name) {
				return this.attributes[name];
			}

			this.getAttributes = function () {
				return this.attributes
			}
		},
		Application: function () {
			this.httpRequest = new tools.Library.HTTPRequest(this);
			this.name = "";
			this.currentController = null;
			this.currentRoute = null;

			this.getCurrentController = function () {
				return this.currentController;
			}

			this.moduleActionLoadData = function () {
				var
					namespace = tools.Applications.Frontend.Modules[this.currentRoute.getModule()].DataLoad,
					y = Object.assign([], namespace["Action" + this.currentRoute.getAction().charAt(0).toUpperCase() + this.currentRoute.getAction().slice(1)]);
				// alert();
				return y;
			}

			this.getInitRouter = function (contextURI = "") {
				var router = new tools.Library.Router();
				var routes = tools.Applications[this.name].Config.routes;

				for (let i = 0; i < routes.length; i++) {
					const route = routes[i];
					var vars = [];
					if (route["vars"] !== undefined) {

					}

					router.addRoute(new tools.Library.Route(
						route["url"],
						route["module"],
						route["action"],
						vars
					));
				}

				return router;
			}

			this.getMatchRouteController = function (router, url) {
				var matchedRoute = router.getRoute(url);
				// console.log(matchedRoute);
				this.currentRoute = matchedRoute;
				// console.log(tools.Applications[this.name].Modules[matchedRoute.getModule()]);
				var classController = tools.Applications[this.name].Modules[matchedRoute.getModule()][matchedRoute.getModule() + "Controller"];
				// console.log(classController);
				return new classController(this, matchedRoute.getModule(), matchedRoute.getAction());
			}

			this.getController = function () {
				var router = this.getInitRouter();
				// console.log(this.httpRequest.requestURI());
				this.currentController = this.getMatchRouteController(router, this.httpRequest.requestURI());

				return this.currentController;
			}

			this.run = function () {
				// console.log("run");
				var controller = this.getController();
				this.httpRequest.setDataActivate(this.moduleActionLoadData());
				// var controller = new tools.Applications.Frontend.Modules.Bulletins.BulletinsController(this, "Bulletin", "index");
				// controller.execute();
				// this.currentController = controller;
				this.httpRequest.chainActivate();
			}
			// this.run();
		},
		BackController: function (app, module, action) {
			tools.Library.AppComponent.call(this, app);
			this.managers = new tools.Library.Managers("AJAX", null);

			this.module = module;
			this.action = action;
			console.log(app.name);
			this.templates = tools.Applications[app.name].Modules[module].Template;

			this.execute = function () {
				// this.executeIndex(this.app.httpRequest);
				// console.log(this.action.slice(1));
				this["execute" + this.action.charAt(0).toUpperCase() + this.action.slice(1)](this.app.httpRequest);
			}

			this.getManagers = function () {
				return this.managers;
			}
		},
		Route: function (url, module, action, varsNames, vars = []) {
			this.url = url;
			this.module = module;
			this.action = action;
			this.varsNames = varsNames;
			this.vars = vars;

			this.match = function (url) {
				var regex = new RegExp("^" + this.url + "$");
				if (regex.test(url)) {
					// console.log(regex.exec(url));
					return regex.exec(url);
				}
				return false;
			}

			this.hasVars = function () {
				return this.varsNames.length > 0;
			}

			this.getUrl = function () {
				return this.url;
			}

			this.getModule = function () {
				return this.module;
			}

			this.getAction = function () {
				return this.action;
			}

			this.getVars = function () {
				return this.vars;
			}

			this.getVarsNames = function () {
				return this.varsNames;
			}
		},
		Router: function () {
			this.routes = new Map();

			this.addRoute = function (route) {
				if (!this.routes.has(route.getUrl())) {
					this.routes.set(route.getUrl(), route);
				}
			}

			this.getRoute = function (url) {
				for (const route of this.routes.values()) {
					// console.log(route);
					var varsValues = true;
					if ((varsValues = route.match(url)) !== false) {
						// console.log(varsValues);
						return route;
					}
				}
			}
		}
	}
}

// es_template.templates.formInscriptions("Personne");
$(window).load(function () {
	var app = new tools.Applications.Frontend.FrontendApplication();
	app.run();
});