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
			<div v-for="rep in project.repositories" class="repository row" :class="{'highlighted': rep.highlighted}">
				<div class="col-lg-12 col-md-12">
					<div v-if="rep.commits.length === 0 && !rep.loading">
						Nenhum commit nos últimos {{ commitDays }} dias.
					</div>
					<div v-if="rep.loading">
						Carregando...
					</div>
					<div v-if="rep.commits.length">
						<div class="row">
							<div class="col-lg-2 col-md-3 repository__avatar text-center">
								<div class="repository__avatar__image">
									<img :src="'/images/repositories/' + rep.name + '.jpg'" class="img-rounded" alt="">
									<!--<div class="repository__avatar__image__actions">
										<i :class="{'fa fa-lightbulb-o repo-action': true, 'active': rep.highlighted}" v-on:click="hightlight(rep)"></i>
									</div>-->
								</div>
								<div>
									<a :href="'https://github.com/' + rep.name" target="_blank">
										{{ rep.name.split('/')[1] }} <br />
										({{ rep.commits[0].author.ghLogin }})
									</a>
								</div>
							</div>
							<div class="col-lg-10 col-md-9">
								<div class="row repository__commit" v-for="(commit, index) in rep.commits" :class="{ 'is-warning': commit.detail.timeAgo.days > 0 }">
									<div class="col-lg-12 col-md-12">
										<div class="row">
											<div class="col-lg-10 col-md-10">
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
														<i class="fa fa-user"></i> {{ commit.author.ghLogin }}
													</div>
													<div class="pull-left repository__commit__info">
														<i class="fa fa-comment-o"></i> {{ commit.detail.commentCount }}
													</div>
												</div>
											</div>
											<div class="col-lg-2 col-md-2">
												<i v-bind:class="{'fa fa-thumb-tack commit-action': true, 'pinned': commit.pinned }" v-on:click="pinCommit(rep, commit)"></i>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row repository__repository_actions">
							<div class="col-lg-12 col-md-12">
								<div class="pull-right" style="margin-left: 15px;">
									<i :class="{'fa fa-lightbulb-o repo-action': true, 'active': rep.highlighted}" v-on:click="hightlight(rep)"></i>
								</div>
								<div class="pull-right" v-if="project.useTravisCI">
									<img :src="'https://api.travis-ci.org/'+ rep.name +'.svg?branch=master'" alt="">
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
	<script src="/javascripts/local-storage-service.js"></script>
	<script src="/javascripts/pin-commit-service.js"></script>
	<script src="/javascripts/project-detail.js"></script>
</tpl:scripts>
