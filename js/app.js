var app = new Vue({
    el: '#app',
    data: {

    },
    methods: {
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

            console.log(val1);
            console.log(val2);
            console.log(val3);
        }
    },
    created: function () {
        var t = this;
        t.watch();
        window.onhashchange = function () {
            t.watch();
        }
    }
});