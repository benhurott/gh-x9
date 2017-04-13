var Promise = require("bluebird");

module.exports = function(app) {
    var GithubApiService = app.services.GithubApiService;

	var ProjectModel = app.models.ProjectModel;
	var CommitPinModel = app.models.CommitPinModel;
	var ReqAdminMiddleware = app.middlewares.ReqAdminMiddleware;

    app.get('/projects', ReqAdminMiddleware, function(req, res, next) {
        var projects = [];

		ProjectModel.find({}).exec()
			.then(function(projects) {
				res.render('projects', {
                    title: 'Your Projects',
                    projects: projects
                });
			})
			.catch(function(err) {
				next(err);
			});
    });

    app.get('/project/detail/:id', ReqAdminMiddleware, function(req, res, next) {

		function loadPin(commits) {
			return new Promise(function(resolve, reject) {
				var toLoad = commits.length;
				var loaded = 0;

				for(var i = 0; i < toLoad; i++) {
					var commit = commits[i];

					CommitPinModel.count({sha: commit.detail.sha}, function(err, count) {
						commit.pinned = count > 0;
						loaded++;

						if (loaded == toLoad) {
							resolve(commits);
						}
					});
				}
			});
		}

		function fetchCommit(repo) {
			return GithubApiService.getCommits(repo)
				.then(function (commits) {
					return loadPin(commits);
				})
				.then(function(commits) {
					return commits
				});
		}

        ProjectModel.findOne({ _id: req.params.id }).exec()
			.then(function (project) {
				if(!project) {
					var error = new Error("Project not found =(");
					error.status = 404;
					return next(error);
				}

				var result = {
					name: project.name,
					repositories: []
				};

				var commitsToFetch = project.repositories.length || 0;
				var commitsFetched = 0

				function checkAndCommitResponse() {
					if (++commitsFetched == commitsToFetch) {
						res.render('project-detail', {
							project: result
						});
					}
				}

				project.repositories.forEach(function(r) {
					var formattedRep = {
						name: r
					};

					fetchCommit(r)
						.then(function(commits) {
							formattedRep.commits = commits;
							result.repositories.push(formattedRep);

							checkAndCommitResponse();
						})
						.catch(function(err) {
							formattedRep.error = true;
							result.repositories.push(formattedRep);

							checkAndCommitResponse();
						});
				});
            })
			.catch(function (err) {
				next(err);
            });
    });

	app.post('/project/repository/commit/pin', ReqAdminMiddleware, function(req, res, next) {
		var commit = req.body.commit
		var sha = commit.detail.sha

		var query = { sha: sha };

		CommitPinModel.findOne(query).exec()
			.then(function (pin) {
				if(!pin) {
					return CommitPinModel.create({ sha: sha, commit: commit });
				}

				return pin.remove();
            })
			.then(function () {
				res.status(200).end();
            })
			.catch(function (err) {
				next(err);
            });
	});

	app.post('/project/create', ReqAdminMiddleware, function(req, res, next) {
		function createProj() {
			ProjectModel.create(req.body)
				.then(function(project) {
					res.status(200).json(project);
				})
				.catch(function(err) {
					next(err);
				});
		}

		if(req.body.force) {
			createProj();
		}
		else {
			ProjectModel.findOne({ name: req.body.name })
				.then(function(projectWithSameName) {
					if(!projectWithSameName) {
						return createProj();
					}

					res.status(403).json({
						message: 'Já existe um projeto com o mesmo nome. Utilize a flag `force:true` para criar mesmo assim.'
					});
				})
				.catch(function(err) {
					next(err);
				});
		}
	});
};
