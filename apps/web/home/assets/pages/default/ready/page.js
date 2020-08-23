Vue.component('page-default-ready', function (resolve, reject) {
  $.get('./assets/pages/default/ready/view.html').done(function (template) {
    resolve({
      template: template,
	  created: function() {
	  }
    })
  });
});