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
				<div v-if="rep.commits.length === 0 && !rep.loading">
					Nenhum commit nos últimos {{ commitDays }} dias.
				</div>
				<div v-if="rep.loading">
					Carregando...
				</div>
				<div v-if="rep.commits.length">
					<div>
						<div class="row repository" >
							<div class="col-lg-2 col-md-3 repository__avatar text-center" >
								<img :src="'/images/repositories/' + rep.name + '.jpg'" class="img-rounded" alt="">
								<div>
									<a :href="'https://github.com/' + rep.name" target="_blank">{{ rep.name.split('/')[1] }}</a>
								</div>
							</div>
							<div class="col-lg-10 col-md-9">
								<div class="row repository__commit" v-for="(commit, index) in rep.commits">
									<div class="col-lg-12 col-md-12">
										<div class="row">
											<div class="col-lg-11 col-md-11">
												<div>
													<a v-bind:href="commit.detail.url" target="_blank">
														{{ commit.detail.message }}
													</a>
												</div>
												<div>
													<div class="pull-left repository__commit__info">
														<i class="fa fa-clock-o"></i> {{ commit.detail.timeAgo.description }}
													</div>
													<div class="pull-left repository__commit__info">
														<i class="fa fa-user"></i> {{ commit.author.name }} ({{ commit.author.ghLogin }})
													</div>
													<div class="pull-left repository__commit__info">
														<i class="fa fa-comment-o"></i> {{ commit.detail.commentCount }}
													</div>
												</div>
											</div>
											<div class="col-lg-1 col-md-1">
												<i v-bind:class="{'fa fa-thumb-tack commit-action': true, 'pinned': commit.pinned }"
										v-on:click="pinCommit(rep, commit)"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

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
