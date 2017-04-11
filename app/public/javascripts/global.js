function minutesToMiliseconds(minutes) {
    return minutes * 60 * 1000;
}

function goToPage(path) {
	location.href = path;
}

var loader = new Vue({
	el: '#loader',
	data: {
		isVisible: false,
		timer: null
	},
	methods: {
		show: function() {
			var self = this;

			if (self.timer) {
				clearTimeout(self.timer);
			}

			this.timer = setTimeout(function () {
				self.isVisible = true
				self.timer = null
            }, 400);
		},
		hide: function() {
			if(this.timer) {
				clearTimeout(this.timer);
			}

			this.isVisible = false
		}
	}
});
