var form = new Vue({
	el: '#login',
	data: {
		code: '',
		errorMessage: ''
	},
	methods: {
		onSubmit: function() {
			var self = this;
			self.errorMessage = '';

			if(!self.code) {
				self.errorMessage = 'Type the f#cking code asshole!';
				return;
			}

			loader.show();

			axios.post('/login', { code: self.code })
				.then(function() {
					location.href = '/';
				})
				.catch(function(err) {
					self.errorMessage = err.response.data.message;
					loader.hide();
				});
		}
	}
});
