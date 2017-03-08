var loggedBar = new Vue({
	el: '#loggedBar',
	methods: {
		signout: function() {
			loader.show();

			axios.post('/signout')
				.then(function() {
					goToPage('/');
				})
				.catch(function(err) {
					console.error(err);
				});
		}
	}
});
