Vue.component('page-worship-sunday', function (resolve, reject) {
  $.get('./assets/pages/worship/sunday/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});