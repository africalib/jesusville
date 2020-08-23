Vue.component('page-sermon-wednesday', function (resolve, reject) {
  $.get('./assets/pages/sermon/wednesday/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});