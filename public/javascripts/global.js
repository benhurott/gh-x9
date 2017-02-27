function minutesToMiliseconds(minutes) {
    return minutes * 60 * 1000;
}

var loader = new Vue({
	el: '#loader',
	data: {
		isVisible: false
	},
	methods: {
		show: function() {
			this.isVisible = true;
		},
		hide: function() {
			this.isVisible = false
		}
	}
});
