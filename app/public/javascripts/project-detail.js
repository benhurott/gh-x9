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
		}
    },
    mounted: function() {
    }
});

setTimeout(function() {
	location.reload();
}, config.MINUTES_RELOAD_COMMITS * 1000 * 60)
