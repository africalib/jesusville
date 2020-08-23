Vue.component('component-loading', function (resolve, reject) {
  $.get('./assets/components/loading/view.html').done(function (template) {
    resolve({
      template: template,
	  data: function(){
		  return {
		  }
	  }
    })
  });
});