Vue.component('page-intro-church', function (resolve, reject) {
  $.get('./assets/pages/intro/church/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});