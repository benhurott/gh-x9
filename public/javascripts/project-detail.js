var $repositoryList = new Vue({
    el: '#repList',
    data: {
        repositories: {},
        commitDays: config.COMMIT_SINCE_DAYS
    },
    methods: {
        loadRepositories: function () {
            var self = this;
            self.repositories = [];

            project.repositories.forEach(function (rep) {
                var repDetail = {
                    title: rep,
                    commits: [],
                    loading: true,
                    error: false
                };

                self.repositories.push(repDetail);

                axios.get('/project/repository/commits?repo=' + rep)
                    .then(function (response) {
                        var repo = self.repositories.find(function(r) {
                            return r.title == rep;
                        });

                        repo.commits = response.data;
                        repo.loading = false;
                        repo.error = false;

                        self.reorderRepositories();
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            });
        },

        reorderRepositories: function() {
            this.repositories.sort(function(a, b) {
                var lastCommitA = a.commits[0];
                var lastCommitB = b.commits[0];

                if(!lastCommitB) return false;
                if(!lastCommitA) return true;

                return lastCommitA.commit.timeAgo.miliseconds > lastCommitB.commit.timeAgo.miliseconds;
            });
        }
    },
    mounted: function() {
        this.loadRepositories();

        setInterval(function () {
            this.loadRepositories();
        }.bind(this), minutesToMiliseconds(config.MINUTES_RELOAD_COMMITS))
    }
});