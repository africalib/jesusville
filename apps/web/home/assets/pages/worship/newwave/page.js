Vue.component('page-worship-newwave', function (resolve, reject) {
  $.get('./assets/pages/worship/newwave/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});