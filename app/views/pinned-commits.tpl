<tpl:layout>layouts/_logged-user-master</tpl:layout>
<tpl:header>
    <title>Pinned Commits</title>
    <link rel="stylesheet" href="/stylesheets/pinned-commits.css">
</tpl:header>

<div class="row">
    <div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12" id="pins">
        <h1>Pinned Commits</h1>

        <div v-if="pins.length < 1">
            No pinned commits found.
        </div>
        <table class="table table-striped" v-else>
            <thead>
                <tr>
                    <th></th>
                    <th>Repository</th>
                    <th>SHA</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pin in pins" :class="{'row-deleted': pin.deleted}">
                    <td>
                        <i class="fa cursor-pointer" :class="{'fa-trash': !pin.deleted, 'fa-thumb-tack': pin.deleted}" title="Delete Pin"
                            v-on:click="toggle(pin)"></i>
                    </td>
                    <td>{{pin.repository}}</td>
                    <td>
                        <a :href="'https://github.com/' + pin.repository + '/commit/'+ pin.sha" target="_blank">
                            {{pin.sha}}
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<tpl:scripts>
    <script>
        var pins = <%- JSON.stringify(pins) %>
    </script>
    <script src="/javascripts/pin-commit-service.js"></script>
    <script src="/javascripts/pinned-commits.js"></script>
</tpl:scripts>