var app = new Vue({
    el: '#app',
    data: {
        page: 'home',
        timer: {},
        enable: false,
        window: null,
        default: {},
        common: {
            chars: [
                'boy', 'senior', 'villain', 'people', 'worship', 'sheep', 'dove1', 'dove2', 'rice', 'apple', 'snake',
                'rock', 'tree1', 'tree2', 'castle1', 'castle2', 'fish', 'grape', 'ship', 'home', 'mountain', 'cross', 'church', 'gift',
                'text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8'
            ],
            characters: [],
            controls: ['go-straight', 'turn-left', 'turn-right', 'loop-start', 'loop-end']
        },
        make: {
            step: null,
            changed: false,
            temp: {
                character: null
            },
            scenario: {
                id: null,
                title: null,
                mainCount: 1,
                characters: [],
                controls: []
            }
        },
        play: {
            cells: [],
            runnable: true,
            running: false,
            scene: {
                title: null,
                num: null,
                list: [
                    {
                        title: '가인과 아벨 1',
                        characters: [{
                            idx: 17,
                            name: 'worship',
                            direction: 12,
                            main: false
                        }, {
                            idx: 18,
                            name: 'sheep',
                            direction: 12,
                            main: false
                        }, {
                            idx: 23,
                            name: 'boy',
                            direction: 12,
                            main: true
                        }]
                    },
                    {
                        title: '가인과 아벨 2',
                        characters: [{
                            idx: 3,
                            name: 'sheep',
                            direction: 12,
                            main: false
                        }, {
                            idx: 5,
                            name: 'villain',
                            direction: 12,
                            main: false
                        }, {
                            idx: 6,
                            name: 'rice',
                            direction: 12,
                            main: false
                        }, {
                            idx: 14,
                            name: 'worship',
                            direction: 12,
                            main: false
                        }, {
                            idx: 23,
                            name: 'boy',
                            direction: 12,
                            main: true
                        }]
                    }
                ]
            },
            tracks: [],
            tracksTemp: []
        }
    },
    methods: {
        go: function (kind, init) {
            var hash = '';

            switch (kind) {
                case 'make':
                    hash = '/make/1';
                    if (init)
                        this.make = lib.renew(this.default.make);
                    break;

                case 'edit':
                    hash = '/edit';
                    break;

                case 'play':
                    hash = '/play';
                    break;
            }

            location.hash = hash;
        },
        prev: function () {
            switch (this.page) {
                case 'make':
                    location.hash = '/make/' + (this.make.step - 1);
                    break;
            }
        },
        check: function () {
            if (this.make.step >= 1 && !this.make.scenario.title) {
                alert('제목을 입력해주세요.');
                return;
            }
            else if (this.make.step >= 2 && !this.make.scenario.characters.length) {
                alert('캐릭터를 선택해주세요.');
                return;
            }
            else if (this.make.step >= 4 && !this.make.scenario.controls.length) {
                alert('컨트롤을 배치해주세요.');
                return;
            }

            return true;
        },
        next: function () {
            switch (this.page) {
                case 'make':
                    if (!this.check())
                        return false;

                    if (this.make.step < 4)
                        location.hash = '/make/' + (this.make.step + 1);
                    break;

                case 'play':
                    if (this.play.running)
                        return;

                    if (this.play.scene.num < this.play.scene.list.length)
                        location.hash = '/play/' + (this.play.scene.num + 1);
                    break;
            }
        },
        save: function () {
            if (this.check() && confirm('저장하시겠습니까?')) {
                var args = {
                    act: 'save',
                    data: JSON.stringify(this.make.scenario)
                };

                $.post('https://jesusvillech.cafe24.com/API/scenario/', args, function (res) {
                    if (res === 'success') {
                        alert('저장하였습니다.');
                        location.href = './';
                    }
                });
            }
        },
        insert: function (c) {
            var t = this;
            var len;

            switch (this.page) {
                case 'make':
                    t.make.scenario.controls.push(c);

                    if (t.make.scenario.controls.length > 4) {
                        len = t.make.scenario.controls.length - 4;

                        t.$nextTick(function () {
                            $(t.$refs.track).find('>.wrapper').stop().animate({
                                scrollLeft: $(t.$refs.track).find('.each').eq(0).width() * len
                            });
                        });
                    }
                    break;

                case 'play':
                    if (t.play.running)
                        return;

                    if (t.play.runnable) {
                        t.play.tracks.push({
                            name: c,
                            enable: true
                        });

                        if (t.play.tracks.length > 4) {
                            len = t.play.tracks.length - 4;

                            t.$nextTick(function () {
                                $(t.$refs.track).find('.wrapper').stop().animate({
                                    scrollLeft: $(t.$refs.track).find('.each').eq(0).width() * len
                                });
                            });
                        }
                    }
                    break;
            }
        },
        edit: function (scenario) {
            this.page = 'make';
            this.make.scenario = lib.renew(scenario);
            this.make.scenario.characters = [];

            for (var i in this.common.characters) {
                for (var j in scenario.characters) {
                    var each = scenario.characters;
                    if (this.common.characters[i].name === each[j].name) {
                        var character = this.common.characters[i];
                        character.idx = each[j].idx;
                        character.main = each[j].main;
                        this.make.scenario.characters.push(character);
                    }
                }
            }

            this.go('make');
        },
        remove: function (id) {
            if (confirm('삭제하시겠습니까?')) {
                var args = {
                    act: 'remove',
                    id: id
                };

                $.post('https://jesusvillech.cafe24.com/API/scenario/', args, function (res) {
                    if (res === 'success') {
                        alert('삭제하였습니다.');
                        location.href = './';
                    }
                });
            }
        },
        splice: function (idx) {
            switch (this.page) {
                case 'make':
                    this.make.scenario.controls.splice(idx, 1);
                    break;

                case 'play':
                    if (this.play.running || !this.play.runnable)
                        return;

                    this.play.tracks.splice(idx, 1);
                    break;
            }
        },
        character: function (idx) {
            for (var i in this.make.scenario.characters) {
                if (Number(this.make.scenario.characters[i].idx) === idx) {
                    return this.make.scenario.characters[i];
                }
            }
        },
        setMain: function (character) {
            for (var i in this.make.scenario.characters)
                this.make.scenario.characters[i].main = false;

            character.main = true;
        },
        setDrag: function () {
            var t = this;
            $('.position .board > .each .draggable').draggable({
                start: function () {
                    var name = $(this).attr('name');
                    for (var i in t.make.scenario.characters) {
                        if (name === t.make.scenario.characters[i].name) {
                            t.make.temp.character = t.make.scenario.characters[i];
                            break;
                        }
                    }
                }
            });
        },
        set: function () {
            var t = this;

            switch (this.page) {
                case 'make':
                    switch (t.make.step) {
                        case 3:
                            if (t.make.changed) {
                                for (var i in t.make.scenario.characters) {
                                    var idxNum = Number(i);
                                    t.make.scenario.characters[i].idx = idxNum;
                                    t.make.scenario.characters[i].main = idxNum === 0;
                                }

                                t.make.changed = false;
                            }

                            t.$nextTick(function () {
                                var $each = $('.position .board > .each');
                                $each.droppable({
                                    drop: function (e, ui) {
                                        var idx = $(this).index('.board > .each');
                                        var character = t.make.temp.character;
                                        var beforeIdx = character.idx;

                                        if ($(this).find('.draggable').length) {
                                            var name = $(this).find('.draggable').attr('name');
                                            for (var i in t.make.scenario.characters) {
                                                if (t.make.scenario.characters[i].name === name) {
                                                    t.make.scenario.characters[i].idx = beforeIdx;
                                                    break;
                                                }
                                            }
                                        }

                                        character.idx = idx;
                                        $each.find('.draggable').css({ left: 0, top: 0 });

                                        t.$nextTick(function () {
                                            t.setDrag();
                                        });
                                        return;
                                    }
                                });

                                t.setDrag();
                            });
                            break;
                    }
                    break;

                case 'play':
                    var scene = t.play.scene.list[t.play.scene.num - 1];

                    if (t.play.tracksTemp.length) {
                        t.play.tracks = lib.renew(t.play.tracksTemp);
                        t.play.tracksTemp = [];
                    }

                    $(t.$refs.track).find('.each').removeAttr('style');

                    t.play.scene.title = '';
                    t.play.cells = [];
                    t.play.runned = false;
                    t.play.running = false;
                    t.play.runnable = true;

                    for (var idx = 0; idx < 24; idx += 1) {
                        t.play.cells.push({
                            idx: idx,
                            characters: []
                        });
                    }

                    if (scene) {
                        t.play.scene.title = scene.title;

                        t.timer.title = setTimeout(function () {
                            t.play.scene.title = null;
                        }, 2500);

                        for (var j in scene.characters) {
                            var each = scene.characters[j];
                            t.play.cells[each.idx].characters.push(lib.renew(each));
                        }
                    }
                    break;
            }
        },
        run: function () {
            var t = this;
            var length = 0;
            var main = null;
            var idx = 0;
            var tracks = [];
            var loopArr = [];
            var loopStart = false;
            var loopStartIdx = 0;
            var loopList = [];
            var end = function () {
                clearInterval(t.timer.track);
                t.play.running = false;
                t.play.runnable = false;
            };

            if (!t.play.tracks.length)
                return;

            $(t.$refs.track).find('.wrapper').stop().animate({
                scrollLeft: 0
            });

            for (var i in t.play.cells) {
                for (var j in t.play.cells[i].characters) {
                    if (t.play.cells[i].characters[j].main) {
                        main = t.play.cells[i].characters[j];
                        break;
                    }
                }
            }

            if (!main) {
                alert('메인 캐릭터가 없습니다.');
                return;
            }

            t.play.tracksTemp = lib.renew(t.play.tracks);

            for (var k in t.play.tracks) {
                if (t.play.tracks[k].name === 'loop-start') {
                    loopStart = true;
                    loopStartIdx = Number(k);
                    t.play.tracks[k].enable = false;
                }
                else if (t.play.tracks[k].name === 'loop-end') {
                    loopStart = false;
                    t.play.tracks[k].enable = false;

                    for (var n = 0; n < 4; n += 1) {
                        for (var l in loopArr) {
                            var obj = lib.renew(loopArr[l]);
                            obj.enable = true;
                            loopList.push(obj);
                        }
                    }
                    break;
                }
                else if (loopStart) {
                    t.play.tracks[k].enable = false;
                    loopArr.push(t.play.tracks[k]);
                }
            }

            if (loopList.length) {
                loopList.reverse();

                for (var m in loopList)
                    t.play.tracks.splice(loopStartIdx, 0, loopList[m]);
            }

            if (loopStart) {
                alert('no loop end');
                t.set();
                return;
            }

            for (var x in t.play.tracks) {
                if (t.play.tracks[x].enable) {
                    tracks.push(t.play.tracks[x]);
                    length += 1;
                }
            }

            t.play.tracks = tracks;

            if (!t.play.tracks.length) {
                t.set();
                return;
            }


            t.play.scene.title = null;
            t.play.runnable = true;
            t.play.running = true;

            t.timer.track = setInterval(function () {
                var act = t.play.tracks[idx].name;

                switch (act) {
                    case 'go-straight':
                        var srcIdx = main.idx;
                        var endIdx = 0;

                        if (!t.play.cells[srcIdx]) {
                            end();
                            return;
                        }

                        switch (main.direction) {
                            case 12:
                                main.idx -= 4;
                                break;

                            case 9:
                                main.idx -= 1;
                                break;

                            case 6:
                                main.idx += 4;
                                break;

                            case 3:
                                main.idx += 1;
                                break;
                        }

                        endIdx = main.idx;

                        if (!t.play.cells[endIdx]) {
                            end();
                            return;
                        }

                        if ((srcIdx + 1) % 4 === 0 && srcIdx + 1 === endIdx) {
                            end();
                            return;
                        }
                        else if (srcIdx % 4 === 0 && srcIdx - 1 === endIdx) {
                            end();
                            return;
                        }

                        t.play.cells[srcIdx].characters = [];
                        t.play.cells[endIdx].characters = [];
                        t.play.cells[endIdx].characters.push(main);
                        break;

                    case 'turn-left':
                        if (main.direction === 3)
                            main.direction = 12;
                        else
                            main.direction -= 3;
                        break;

                    case 'turn-right':
                        if (main.direction === 12)
                            main.direction = 3;
                        else
                            main.direction += 3;
                        break;
                }

                $(t.$refs.track).find('.each:eq(' + idx + ')').stop().animate({
                    opacity: 0,
                    marginLeft: -25 + '%'
                });

                idx += 1;

                if (length <= idx) {
                    end();
                }
            }, 1000);
        },
        watch: function () {
            var t = this;

            for (i in t.timer) {
                if (t.timer[i]) {
                    clearTimeout(t.timer[i]);
                    clearInterval(t.timer[i]);
                }
            }

            if (location.hash) {
                var hashArr = location.hash.split('/');
                t.page = hashArr[1];

                switch (t.page) {
                    case 'make':
                        t.make.step = Number(hashArr[2]);
                        break;

                    case 'play':
                        t.play.scene.num = null;
                        t.play.tracks = [];

                        if (hashArr.length > 2) {
                            t.play.scene.num = Number(hashArr[2]);

                            for (var i in t.play.scene.list) {
                                if (Number(i) === t.play.scene.num - 1) {
                                    var each = t.play.scene.list[i];

                                    for (var j in each.controls) {
                                        t.play.tracks.push({
                                            name: each.controls[j],
                                            enable: true
                                        });
                                    }
                                    break;
                                }
                            }
                        }
                        break;
                }

                t.set();
            }
            else {
                t.page = 'home';
            }
        }
    },
    created: function () {
        var t = this;
        var args = {
            act: 'list'
        };

        for (var i in t.common.chars) {
            t.common.characters.push({
                idx: null,
                name: t.common.chars[i],
                direction: 12,
                main: false
            });
        }

        t.default.make = lib.renew(t.make);

        window.onhashchange = function () {
            t.watch();
        };

        $.get('https://jesusvillech.cafe24.com/API/scenario/', args, function (res) {
            if (res) {
                try {
                    var arr = JSON.parse(res);

                    if (Array.isArray(arr)) {
                        t.enable = true;
                        t.play.scene.list = arr;
                        t.watch();
                        return;
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }

            alert('오류가 있습니다.');
        });

        t.window = window;
    }
});