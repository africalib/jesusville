Vue.component('page-sermon-sunday3', function (resolve, reject) {
  $.get('./assets/pages/sermon/sunday3/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});