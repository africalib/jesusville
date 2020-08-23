Vue.component('page-intro-map', function (resolve, reject) {
  $.get('./assets/pages/intro/map/view.html').done(function (template) {
    resolve({
      template: template,
	  methods: {
		  copy: function() {
			  var copyText = this.$refs.input;
			  copyText.select();
			  copyText.setSelectionRange(0, 99999); // For mobile devices
			  document.execCommand("copy");
		  }
	  }
    })
  });
});