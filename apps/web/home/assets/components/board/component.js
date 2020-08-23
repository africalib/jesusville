Vue.component('component-board', function (resolve, reject) {
  $.get('./assets/components/board/view.html').done(function (template) {
    resolve({
      template: template,
	  data: function(){
		  return {
			  global: window.global,
			  items: {
				  data: {
					  key: null,
					  keyword: null
				  }
			  },
			  info: {
				  data: {},
				  loaded: false
			  },
			  list: {
				  args: {},
				  count: null,
				  data: [],
				  loaded: false
			  }
		  }
	  },
	  props:['name1', 'name2', 'order', 'orderType', 'opened'],
	  methods: {
		go: function(name1, name2, val) {
			if(this.list.args.keyword) {
				var param = '?key=' + (this.list.args.key ? this.list.args.key : '') + '&keyword=' + encodeURIComponent(this.list.args.keyword);
				val += param;
			}
			
			global.window.go(name1, name2, val);
		},
		search: function() {
			var param = '?key=' + (this.items.data.key ? this.items.data.key : '') + '&keyword=' + encodeURIComponent(this.items.data.keyword);
			this.global.window.go(this.name1, this.name2, param);
			
			//this.list.args = lib.renew(this.items.data);
			//this.setList();
			
			this.$nextTick(function(){
				this.$refs.input.blur();
			});
		},
		add: function() {
		   var modal = this.global.modal.write;
		   modal.info.act = 'add';
		   modal.info.data = {};
		   modal.info.data.name1 = this.name1,
		   modal.info.data.name2 = this.name2,
		   modal.info.data.regDate = this.global.cast.date(new Date());
		   modal.open();
		},
		edit: function() {
		   var modal = this.global.modal.write;
		   modal.info.act = 'edit';
		   modal.info.data = lib.renew(this.info.data);
		   modal.info.data.name1 = this.name1;
		   modal.info.data.name2 = this.name2;

		   if(modal.info.data.content)
			  modal.info.data.content = lib.getBrToNewline(modal.info.data.content);

		   if(Array.isArray(modal.info.data.videoUrls))
			  modal.info.data.videoUrls = JSON.stringify(modal.info.data.videoUrls);
			
		   modal.open();
		},
		open: function(id) {
			var t = this;
			t.info.loaded = false;
			$.getJSON('/api/document/info/' + id, function(res){
				t.info.data = res;
				t.info.data.imageUrls = [];
				t.info.data.regDate = t.global.cast.date(t.info.data.regDate);
				
				if(lib.isJson(t.info.data.filePaths)) {
					var filePaths = JSON.parse(t.info.data.filePaths);
					var imgExts = ['png', 'jpg', 'jpeg', 'gif'];
					for(var i in filePaths) {
						for(var j in imgExts) {
							if(filePaths[i].indexOf('.' + imgExts[j]) >= 0) {
								t.info.data.imageUrls.push(filePaths[i]);
								break;
							}
						}
					}
				}
				else {
					t.info.data.imageUrls = [];
				}
				
				if(lib.isJson(t.info.data.videoUrls))
					t.info.data.videoUrls = JSON.parse(t.info.data.videoUrls);
				else
					t.info.data.videoUrls = [];
				
				t.info.loaded = true;
			});
			
			$('html, body').scrollTop(0);
		},
		setList: function(func) {
		  var t = this;
		  
		  if(t.name1 && t.name2) {
			t.list.args.name1 = t.name1;
			t.list.args.name2 = t.name2;
			t.list.args.order = t.order ? t.order : 'regDate';
			t.list.args.orderType = t.orderType ? t.orderType : 'desc';
			t.list.loaded = false;
			
			$.getJSON('/api/document/list', t.list.args, function(res){
				t.list.count = res.count;
				t.list.data = res.data;
			    t.list.loaded = true;
				
				if(typeof func === 'function')
					func();
			});
		  }
		}
	  },
	  created: function() {
		  var t = this;
		  var key = lib.getPameters('key');
		  var keyword = lib.getPameters('keyword');
		  
		  if(key)
			  t.items.data.key = key;
		  
		  if(keyword)
			  t.items.data.keyword = decodeURIComponent(keyword);
		  
		  t.list.args = lib.renew(t.items.data);
		  
		  t.setList(function(){
			  var val = lib.getHash(3);  
			  
			  if(val)
			  	  t.open(val);
			  else if(!t.items.data.keyword && t.opened && t.list.data.length)
			  	  t.open(t.list.data[0].id);
		  });;
	  },
	  mounted: function() {
		  var t = this;
		  t.global.component.board = t;
		  
		  $(document).off('keyup').on('keyup', function(e){
			  
			  if(e.keyCode === 37 || e.keyCode === 39) {
				  if(t.info && Object.keys(t.info.data).length && t.list && Array.isArray(t.list.data) && t.list.data.length) {
					  var idx;
					  
					  if(['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) >= 0)
						  return;
					  
					  for(var i in t.list.data) {
						  if(t.info.data.id === t.list.data[i].id) {
							  idx = Number(i);
							  break;
						  }
					  }
					  
					  if(idx !== undefined) {
						  idx = idx + (e.keyCode === 37 ? 1 : -1);
						  
						  if(idx >= 0 && t.list.data.length - 1 >= idx)
							  t.global.window.go(t.name1, t.name2, t.list.data[idx].id);
					  }
				  }
			  }
		  });
	  }
    })
  });
});