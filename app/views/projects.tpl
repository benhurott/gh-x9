<tpl:layout>layouts/_logged-user-master</tpl:layout>

<div class="row">
    <div class="col-lg-6 col-lg-offset-3 col-md-8 col-sm-12 col-xs-12">
        <table class="table table-striped table-hover">
            <thead>
                <th>Name</th>
                <th>Repositories</th>
            </thead>
            <tbody>
                <% projects.forEach(function(proj){ %>
                <tr>
                    <td>
                        <a href="/project/detail/<%= proj.id %>"><%= proj.name %></a>
                    </td>
                    <td><%= proj.repositories.length %></td>
                </tr>
                <% }) %>
            </tbody>
        </table>
    </div>
</div>
