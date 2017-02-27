<!DOCTYPE html>
<html>
  <head>
		<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="/vendor/bootstrap/css/flatly-theme.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />

    <tpl:render-header></tpl:render-header>
  </head>
  <body>
		<div id="loader" v-show="isVisible">
			<img src="/images/loader.gif" alt="">
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<tpl:body></tpl:body>
				</div>
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
