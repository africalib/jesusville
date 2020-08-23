window.global = {
	app: null,
	cast: {
		date: function(value) {
			if(!value)
				return;
			
			if(typeof value.getDate === 'function') {
				return value.toISOString().slice(0,10);
			}
			else {
				switch(value.length) {
					case 19:
						return value.substring(0, 10);
					break;
				}
			}
			
			return value;
		}
	},
	component :{
		board: null
	},
	modal :{
		write: null
	},
	user: {
		admin: false
	},
	window: {
		go: function(name1, name2, val) {
			var hash = '';
			
			if(name1 && name2) {
				if(val) {
					if(val.indexOf('?') === 0)
						hash = '/' + name1 + '/' + name2 + val;
					else
						hash = '/' + name1 + '/' + name2 + '/' + val;
				}
				else {
					hash = '/' + name1 + '/' + name2;
				}
			}
			else {
				hash = '/';
			}
			
			location.hash = hash;
		}
	}
}