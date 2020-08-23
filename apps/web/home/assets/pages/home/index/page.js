Vue.component('page-home-index', function (resolve, reject) {
  $.get('./assets/pages/home/index/view.html').done(function (template) {
    resolve({
      template: template,
	  data: function() {
		  return {
			global: window.global
		  }
	  },
	  created: function() {
	  }
    })
  });
});