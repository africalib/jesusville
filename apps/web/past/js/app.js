var app = new Vue({
    el: '#app',
    data: {
        documents: {
            sermons: [{
                videoId: 399866362,
                imageSrc: null
            }, {
                videoId: 399864820,
                imageSrc: null
            }, {
                videoId: 399563952,
                imageSrc: null
            }, {
                videoId: 399865984,
                imageSrc: null
            }, {
                videoId: 399563252,
                imageSrc: null
            }],
            worships: [{
                videoId: 399867147,
                imageSrc: null
            }, {
                    videoId: 399865392,
                imageSrc: null
            }, {
                    videoId: 399865622,
                imageSrc: null
            }, {
                    videoId: 399866903,
                imageSrc: null
            }, {
                    videoId: 399563658,
                imageSrc: null
            }]
        }
    },
    methods: {
        set: function () {
            var t = this;
            for (let i1 in t.documents.sermons) {
                let each1 = t.documents.sermons[i1];

                $.get('http://vimeo.com/api/v2/video/' + each1.videoId + '.json').then(function (res) {
                    if (Array.isArray(res)) {
                        for (var j1 in t.documents.sermons) {
                            var each2 = t.documents.sermons[j1];

                            if (each2.videoId === res[0].id) {
                                each2.imageSrc = res[0].thumbnail_large;
                                break;
                            }
                        }
                    }
                });
            }

            for (let i1 in t.documents.worships) {
                let each1 = t.documents.worships[i1];

                $.get('http://vimeo.com/api/v2/video/' + each1.videoId + '.json').then(function (res) {
                    if (Array.isArray(res)) {
                        for (var j1 in t.documents.worships) {
                            var each2 = t.documents.worships[j1];

                            if (each2.videoId === res[0].id) {
                                each2.imageSrc = res[0].thumbnail_large;
                                break;
                            }
                        }
                    }
                });
            }
        },
        watch: function () {
            var hashArr = location.hash.split('/');
            var val1 = '';
            var val2 = '';
            var val3 = '';

            if (hashArr.length > 1)
                val1 = hashArr[1];

            if (hashArr.length > 2)
                val2 = hashArr[2];

            if (hashArr.length > 3)
                val3 = hashArr[3];
        }
    },
    created: function () {
        var t = this;
        t.watch();
        window.onhashchange = function () {
            t.watch();
        };

        t.set();
    }
});