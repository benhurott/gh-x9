var pinCommitService = {
    togglePin: function (repositoryName, sha) {
        return axios.post('/project/repository/commit/pin', { repository: repositoryName, sha: sha })
            .then(function() {
                return true
            });
    }
}