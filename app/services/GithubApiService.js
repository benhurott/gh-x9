var axios = require('axios');
var moment = require('moment');

var GITHUB_API_URL = 'https://api.github.com';
var ACCEPT_HEADER = 'application/vnd.github.v3+json';

module.exports = function(app) {

    function buildUrl(path) {
        return GITHUB_API_URL
            + path
            + '?client_id='
            + process.env.GITHUB_CLIENT_ID
            + '&client_secret='
            + process.env.GITHUB_CLIENT_SECRET;
    }

    function getTimeAgo(then) {
        var now = moment.utc();
        var ms = moment(now).diff(moment(then));
		ms = Math.abs(ms);
        var d = moment.duration(ms);

        var days = Math.floor(d.asDays());
        var hours = Math.floor(d.asHours());
        var minutes = Math.floor(d.asMinutes());
        var seconds = Math.floor(d.asSeconds());
        var miliseconds = d.asMilliseconds();

        var description = '';

        if(days > 0) {
            description = days + ' day(s) ago.';
        }
        else if(hours > 0) {
            description = hours + ' hour(s) ago.';
        }
        else if(minutes > 0) {
            description = minutes + ' minute(s) ago.';
        }
        else {
            description = seconds + ' second(s) ago.'
        }

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            miliseconds: miliseconds,
            description: description
        };
    }

    function formatCommit(commit, repoName) {
        return {
            author: {
                name: commit.commit.author.name,
				ghLogin: commit.committer ? commit.committer.login : 'not informed',
                avatar: commit.committer ? commit.committer.avatar_url : '/images/no-thumb.png'
            },
            detail: {
				url: commit.html_url,
                commentCount: commit.commit.comment_count,
                sha: commit.sha,
                date: moment(commit.commit.author.date).format('YYYY-MM-DD HH:mm:ss'),
                message: commit.commit.message,
                timeAgo: getTimeAgo(commit.commit.author.date)
            },
			repository: {
				name: repoName,
				url: 'https://github.com/' + repoName
			}
        };
    }

    function applyDisplayCommitsLimit(c, index) {
        return index < Number(process.env.NUMBER_DISPLAY_COMMITS);
    }

    function getCommits(repo) {
        var url = buildUrl('/repos/' + repo + '/commits')
        return axios.get(url)
            .then(function(response) {
                return response
                    .data
                    .filter(applyDisplayCommitsLimit)
                    .map(function(commit) {
						return formatCommit(commit, repo);
					})
					.sort(function(a, b) {
						try {
							return a.detail.timeAgo.miliseconds - b.detail.timeAgo.miliseconds;
						} catch (error) {
							return -1
						}
					});
            })
			.catch(function(err) {
				console.error(err);
				throw err;
			});
    }

    return {
        getCommits: getCommits
    }
};
