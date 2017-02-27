<tpl:layout>layouts/_logged-user-master</tpl:layout>
<tpl:header>
	<title>Project
		<%= title %>
	</title>
	<link rel="stylesheet" href="/stylesheets/project-detail.css">
</tpl:header>



<div class="row">
	<div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
		<h1 class="title">
			Project:
			<%= title %>
		</h1>
		<div id="repList">
			<div v-for="rep in repositories">
				<h2 class="title">{{ rep.title }}</h2>
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
						</thead>
						<tbody>
							<tr v-for="commit in rep.commits" v-bind:class="{ 'is-warning': commit.commit.timeAgo.days > 0 }">
								<td>
									<img v-bind:src="commit.author.avatar" class="img-responsive img-rounded">
								</td>
								<td>
									{{ commit.author.name }}
								</td>
								<td>
									{{ commit.commit.timeAgo.description }} <br />
									<span class="commit-date">
                                                    <i class="fa fa-clock-o"></i> {{ commit.commit.date }}
                                                </span>
								</td>
								<td>
									<a v-bind:href="commit.commit.url" target="_blank">
                                                    {{ commit.commit.message }}
                                                </a>
								</td>
								<td>
									{{ commit.commit.commentCount }}
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
	<script src="/javascripts/project-detail.js"></script>
</tpl:scripts>
