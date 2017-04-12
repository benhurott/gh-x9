var $pins = new Vue({
    el: '#pins',
    data: {
        pins: pins //injected
    },
    methods: {
        toggle: function(pin) {
            var self = this;

            loader.show();

            pinCommitService.togglePin(pin.commit)
                .then(function (res) {
                    pin.deleted = !pin.deleted;
                    self.$forceUpdate();
                    loader.hide();
                })
                .catch(function (err) {
                    console.error(err);
                    loader.hide();
                });
        }
    }
});
