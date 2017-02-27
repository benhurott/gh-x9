var loggedBar = new Vue({
	el: '#loggedBar',
	methods: {
		signout: function() {
			loader.show();

			axios.post('/signout')
				.then(function() {
					window.location = '/';
				})
				.catch(function(err) {
					console.error(err);
				});
		}
	}
});
