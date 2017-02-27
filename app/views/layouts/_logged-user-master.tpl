<tpl:layout>layouts/_master</tpl:layout>

<tpl:header>
	<title>GH-X9</title>
	<link rel="stylesheet" href="/stylesheets/_logged-user-master.css">
</tpl:header>

<tpl:scripts>
    <script src="/javascripts/_logged-user-master.js"></script>
</tpl:scripts>

<div class="row" id="loggedBar">
	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 logged-bar bg-primary">
		<div class="logged-bar__action pull-right" v-on:click="signout">
			<i class="fa fa-sign-out"></i> Sair
		</div>
	</div>
</div>
<div class="row">
	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<tpl:body></tpl:body>
	</div>
</div>

<img src="/images/logo.jpg" alt="" class="bg-logo">
