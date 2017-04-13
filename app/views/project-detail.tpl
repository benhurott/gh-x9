<tpl:layout>layouts/_logged-user-master</tpl:layout>
<tpl:header>
	<title>Project
		<%= project.name %>
	</title>
	<link rel="stylesheet" href="/stylesheets/project-detail.css">
</tpl:header>

<div class="row">
	<div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
		<h1 class="title">
			Project:
			<%= project.name %>
		</h1>
		<div id="repList">
			<div v-for="rep in project.repositories">
				<h2 class="title">{{ rep.name.split('/')[1] }}</h2>
				<div v-if="rep.commits.length === 0 && !rep.loading">
					Nenhum commit nos últimos {{ commitDays }} dias.
				</div>
				<div v-if="rep.loading">
					Carregando...
				</div>
				<div v-if="rep.commits.length">
					<table class="table table-striped table-hover table-commits">
						<thead>
							<th class="cell-avatar">Avatar</th>
							<th class="cell-name">Author</th>
							<th class="cell-date">Date</th>
							<th>Message</th>
							<th>Comments</th>
							<th>Actions</th>
						</thead>
						<tbody>
							<tr v-for="commit in rep.commits" v-bind:class="{ 'is-warning': commit.detail.timeAgo.days > 0 }">
								<td>
									<img v-bind:src="commit.author.avatar" class="img-responsive img-rounded">
								</td>
								<td>
									{{ commit.author.name }}
								</td>
								<td>
									{{ commit.detail.timeAgo.description }} <br />
									<!--<span class="commit-date">
										<i class="fa fa-clock-o"></i> {{ commit.detail.date }}
									</span>-->
								</td>
								<td>
									<a v-bind:href="commit.detail.url" target="_blank">
										{{ commit.detail.message }}
									</a>
								</td>
								<td>
									{{ commit.detail.commentCount }}
								</td>
								<td>
									<i v-bind:class="{'fa fa-thumb-tack commit-action': true, 'pinned': commit.pinned }"
										v-on:click="pinCommit(rep, commit)"></i>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<tpl:scripts>
	<script>
		var project = <%- JSON.stringify(project) %>
	</script>
	<script src="/javascripts/pin-commit-service.js"></script>
	<script src="/javascripts/project-detail.js"></script>
</tpl:scripts>
