<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/vendor/bulma/bulma.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />

    <tpl:render-header></tpl:render-header>
  </head>
  <body>
    <div class="columns">
      <div class="column is-12">
        <tpl:body></tpl:body>
      </div>
    </div>
    
    <script src="/vendor/moment/moment.min.js"></script>
    <script src="/vendor/axios/axios.min.js"></script>
    <script src="/vendor/vue/vue.js"></script>
    <script src="/vendor/jscookie/js.cookie.js"></script>
    <script src="/javascripts/config.js"></script>
    <script src="/javascripts/global.js"></script>

    <tpl:render-scripts></tpl:render-scripts>
  </body>
</html>
