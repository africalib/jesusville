Vue.component('modal-write', function (resolve, reject) {
  $.get('./assets/modals/write/view.html').done(function (template) {
    resolve({
      template: template,
	  data: function(){
		  return {
			  global: window.global,
			  lib: window.lib,
			  info: {
				  data: {},
				  act: null
			  }
		  }
	  },
	  methods: {
		open: function() {
			$(this.$refs.modal).on('shown.bs.modal', function () {
			  $(this).find('#title').trigger('focus')
			})
			
			if(this.info.data.name1 === 'sermon')
				this.info.data.extend1 = '김경태 목사';
			
			this.$refs.files.value = '';
			$(this.$refs.modal).modal('show');
		},
		save: function() {
			var t = this;
			var args = new FormData();
			var data = lib.renew(t.info.data);

			if(data.content)
				data.content = data.content.replace(/\n/g, '<br />');

			if(data.videoUrls && !lib.isJson(data.videoUrls)) {
				if(!isNaN(data.videoUrls))
					data.videoUrls = '[' + data.videoUrls + ']';
				else
					data.videoUrls = '["' + data.videoUrls + '"]';
			}
			
			for(var i in data)
				args.append(i, data[i]);
			
			if(t.$refs.files.files && t.$refs.files.files.length) {
				for(var i in t.$refs.files.files)
					args.append('files[]', t.$refs.files.files[i]);
			}
			
			$.ajax({
				type : 'POST',
				url : '/api/document/' + t.info.act,
				data : args,
				processData: false,
				contentType: false,
				success : function(res) {
					var component = global.component.board;
					component.setList();
					
					if(t.info.act === 'edit')
						component.open(data.id);
					
					$(t.$refs.modal).modal('hide');
				},
				err : function(err) {
					alert('오류가 있습니다.');
				}
			});
		}
	  },
	  mounted: function(){
		  this.global.modal.write = this;
	  }
    })
  });
});