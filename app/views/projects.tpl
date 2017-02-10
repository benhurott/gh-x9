<tpl:layout>layouts/_master</tpl:layout>

<div class="columns">
    <div class="column is-half">
        <table class="table">
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