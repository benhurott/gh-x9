var $repositoryList = new Vue({
    el: '#repList',
    data: {
        project: project,
        commitDays: config.COMMIT_SINCE_DAYS
    },
    methods: {
		pinCommit: function(repo, commit) {
			var self = this;

            loader.show();

            pinCommitService.togglePin(commit)
                .then(function (res) {
                    commit.pinned = !commit.pinned;
                    self.$forceUpdate();
                    loader.hide();
                })
                .catch(function (err) {
                    console.error(err);
                    loader.hide();
                });
		},
		hightlight: function(repo) {
			var key = 'highlighted';
			var value = repo.name;

			var highlighteds = localStorageService.getObject(key, []);

			if (highlighteds.indexOf(value) >= 0) {
				highlighteds = highlighteds.filter(function(h) {
					return h !== value;
				});

				repo.highlighted = false;
			}
			else {
				highlighteds.push(value);
				repo.highlighted = true;
			}

			localStorageService.setObject(key, highlighteds);
			this.$forceUpdate();
		}
    },
    mounted: function() {
		var highlighteds = localStorageService.getObject('highlighted', null);

		if (!!highlighteds) {
			for (var i = 0; i < this.project.repositories.length; i++) {
				var element = this.project.repositories[i];
				element.highlighted = !!highlighteds.filter(function(h) {
					return h === element.name;
				})[0];
			}

			this.$forceUpdate();
		}
    }
});

setTimeout(function() {
	location.reload();
}, config.MINUTES_RELOAD_COMMITS * 1000 * 60)
