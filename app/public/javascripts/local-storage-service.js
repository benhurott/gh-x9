var localStorageService = {
	set: function(key, value) {
		localStorage.setItem(key, value);
	},
	get: function(key, defaultValue) {
		var value = localStorage.getItem(key);

		return this._getDefValue(value, defaultValue);
	},

	setObject: function(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	getObject: function(key, defaultValue) {
		var stored = localStorage.getItem(key);

		if (!stored) {
			return defaultValue;
		}

		var value = JSON.parse(stored);
		return this._getDefValue(value, defaultValue);
	},

	_getDefValue(value, defValue) {
		if (value === undefined) {
			return defValue;
		}

		return value;
	}
}
