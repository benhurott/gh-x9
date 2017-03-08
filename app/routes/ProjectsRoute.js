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

        ProjectModel.findOne({ _id: req.params.id }).exec()
			.then(function (project) {
				if(!project) {
					var error = new Error("Project not found =(");
					error.status = 404;
					return next(error);
				}

                res.render('project-detail', {
                    project: project
                });
            })
			.catch(function (err) {
				next(err);
            });
    });

    // ?repo=user/repo
    app.get('/project/repository/commits', ReqAdminMiddleware, function(req, res, next) {
        var repo = req.query.repo;

        var resultCommits = [];

        GithubApiService.getCommits(repo)
			.then(function (commits) {
				resultCommits = commits;

				var shas = commits.map(function (c) {
					return c.detail.sha;
                });

				return CommitPinModel.find({
					sha: {
						$in: shas
					}
				}).exec()
            })
			.then(function (pins) {
				resultCommits.forEach(function (c) {
					c.pinned = !!pins.find(function (p) {
						return p.sha === c.detail.sha
                    });
                });

				return resultCommits;
            })
            .then(function(commits) {
                res.status(200).json(commits);
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                });
            });
    });

	app.post('/project/repository/commit/pin', ReqAdminMiddleware, function(req, res, next) {
		var sha = req.body.sha;
		var repository = req.body.repository;

		var query = { sha: sha };

		CommitPinModel.findOne(query).exec()
			.then(function (pin) {
				if(!pin) {
					return CommitPinModel.create({ sha: sha, repository: repository });
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
