window.lib = {
	getHash: function(num) {
		var hash = window.location.hash;
		var hashArr = [];
		
		if(hash.indexOf('?') >= 0)
			hash = hash.split('?')[0];
		
		hashArr = hash.split('/');;
		
		if(hashArr.length > num)
			return hashArr[num];
	},
	getPameters: function(name) {
		var hash = window.location.hash;
		
		if(hash.indexOf('?') >= 0) {
			var parasmArr = hash.split('?')[1].split('&');
			
			for(var i in parasmArr) {
				var eqArr = parasmArr[i].split('=');
				
				if(eqArr[0] === name && eqArr.length === 2)
					return eqArr[1];
			}
		}
	},
	getBrToNewline:function(str) {
		return str.replace(/<br\s*\/?>/mg,"\n");
	},
	renew: function(val) {
		return JSON.parse(JSON.stringify(val));
	},
	isJson: function(item) {
		item = typeof item !== "string"
			? JSON.stringify(item)
			: item;

		try {
			item = JSON.parse(item);
		} catch (e) {
			return false;
		}

		if (typeof item === "object" && item !== null) {
			return true;
		}

		return false;
	}
}