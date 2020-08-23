window.global.app = new Vue({
	el: '#app',
	data: {
		global: window.global,
		gnb: [],
		page: {}
	},
	methods: {
		watch: function() {
			var name1 = lib.getHash(1);
			var name2 = lib.getHash(2);
			var tag;
			
			$('html, body').scrollTop(0);

			if(!name1)
				name1 = 'home';
			
			if(!name2)
				name2 = 'index';
			
			tag = 'page-' + name1 + '-' + name2;
			
			if(!Vue.options.components[tag]) {
				name1 = 'default';
				name2 = 'ready';
				tag = 'page-default-ready';
			}

			this.page = {};

			this.$nextTick(function(){
				this.page = {
					name1 : name1,
					name2 : name2,
					tag : tag
				};
			});
		}
	},
	created: function(){
		var t = this;
		t.gnb = [
			{ name1: 'intro', name2: 'church', title: '소개' },
			{ name1: 'sermon', name2: 'sunday', title: '설교' },
			{ name1: 'worship', name2: 'sunday', title: '찬양' },
			{ name1: 'album', name2: 'happy', title: '앨범' }
		]
		
		t.watch();
		t.global.user.admin = localStorage.getItem('admin');
		
		window.onhashchange = function() {
			t.watch();
		}
	}
});