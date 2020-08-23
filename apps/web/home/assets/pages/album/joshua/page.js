Vue.component('page-album-joshua', function (resolve, reject) {
  $.get('./assets/pages/album/joshua/view.html').done(function (template) {
    resolve({
      template: template
    })
  });
});