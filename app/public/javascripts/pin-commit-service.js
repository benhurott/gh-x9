var pinCommitService = {
    togglePin: function (commit) {
        return axios.post('/project/repository/commit/pin', { commit: commit })
            .then(function() {
                return true
            });
    }
}
