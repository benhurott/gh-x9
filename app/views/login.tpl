<tpl:layout>layouts/_master</tpl:layout>
<tpl:header>
	<title>GH-X9</title>
	<link rel="stylesheet" href="/stylesheets/login.css">
</tpl:header>

<div class="row">
    <div class="col-lg-4 col-lg-offset-4 col-md-6 col-sm-8 col-xs-12" id="login">
		<div class="text-center">
			<img src="/images/logo.jpg" alt="" class="logo imf-responsive">
		</div>
		<form class="form" v-on:submit.prevent="onSubmit">
			<div class="form-group">
				<label for="code">Secret Code</label>
    			<input type="text" class="form-control" id="code" placeholder="the top secret code" v-model="code">
			</div>
			<p class="text-danger" v-if="!!errorMessage">{{errorMessage}}</p>
			<div class="form-group text-right">
				<button class="btn btn-primary">Entrar</button>
			</div>
		</form>
    </div>
</div>

<tpl:scripts>
    <script src="/javascripts/login.js"></script>
</tpl:scripts>
