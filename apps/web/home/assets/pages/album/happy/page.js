Vue.component('page-album-happy', function (resolve, reject) {
  $.get('./assets/pages/album/happy/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});