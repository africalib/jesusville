Vue.component('page-sermon-sunday', function (resolve, reject) {
  $.get('./assets/pages/sermon/sunday/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});