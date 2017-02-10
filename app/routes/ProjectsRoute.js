module.exports = function(app) {
    var FileService = app.services.FileService;
    var GithubApiService = app.services.GithubApiService;

    var projectsPath = './app/data/projects/';

    app.get('/projects', function(req, res, next) {
        var projects = [];

        FileService.readAllFiles(projectsPath, {
            onFileReaded: function(filename, content) {
                projects.push(JSON.parse(content));
            },
            onError: function(err) {
                console.error(err);
            },
            onEnd: function() {
                res.render('projects', {
                    title: 'Your Projects',
                    projects: projects
                });
            }
        });
    });

    app.get('/project/detail/:id', function(req, res, next) {
        var filename = projectsPath + req.params.id + '.json';

        FileService.readFile(filename, function(err, content) {
            if(err) {
                return next(err);
            }

            var project = JSON.parse(content);

            res.render('project-detail', {
                title: project.name,
                project: project
            });
        });
    });

    // ?repo=user/repo
    app.get('/project/repository/commits', function(req, res, next) {
        var repo = req.query.repo;

        GithubApiService.getCommits(repo)
            .then(function(commits) {
                res.status(200).json(commits);
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                });
            });
    });
}