<tpl:layout>layouts/_master</tpl:layout>
<tpl:header>
    <link rel="stylesheet" href="/stylesheets/project-detail.css">
</tpl:header>

<h1 class="title">
    <%= title %>
</h1>

<div class="columns">
    <div class="column">
        <div id="repList">
            <div class="box" v-for="rep in repositories">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <h2 class="title">{{ rep.title }}</h2>
                            <div v-if="rep.commits.length == 0 && !rep.loading">
                                Nenhum commit nos últimos {{ commitDays }} dias.
                            </div>
                            <div v-if="rep.loading">
                                Carregando...
                            </div>
                            <div v-if="rep.commits.length">
                                <table class="table table-commits">
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
                                                <figure class="image is-32x32">
                                                    <img v-bind:src="commit.author.avatar">
                                                </figure>
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
                </article>
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