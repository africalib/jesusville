var app = new Vue({
    el: '#app',
    data: {
        data: data,
        public: {
            members: [],
            oikoses: []
        },
        temp: {
            page: 'home',
            value: null,
            oikos: {},
            member: {},
            mode: null,
            manage: false,
            ready: false,
            pwd: null,
            inputPwd: null,
            timer: null
        },
        lib: {
            renew: function (val) {
                return JSON.parse(JSON.stringify(val));
            },
            randNum: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            },
            randText: function () {
                var inits = 'abcdefghijklnmopqrstuvwxyz'.split('');
                var randIdx1 = this.randNum(0, inits.length - 1);
                var randIdx2 = this.randNum(0, inits.length - 1);
                var randIdx3 = this.randNum(0, inits.length - 1);
                var randNum = this.randNum(1000, 9999);

                return inits[randIdx1] + inits[randIdx2] + inits[randIdx3] + randNum;
            }
        }
    },
    methods: {
        save: function (category) {
            var args = {};

            switch (category) {
                case 'oikoses':
                    args = {
                        act: 'save',
                        target: 'oikoses',
                        oikoses: JSON.stringify(this.public.oikoses)
                    };
                    break;

                case 'members':
                    args = {
                        act: 'save',
                        target: 'members',
                        members: JSON.stringify(this.public.members)
                    };
                    break;

                case 'reads':
                    args = {
                        act: 'save',
                        target: 'reads',
                        id: this.temp.member.id,
                        read: this.temp.member.read,
                        reads: JSON.stringify(this.temp.member.reads)
                    };
                    break;

                default:
                    args = {
                        act: 'add',
                        data: JSON.stringify(this.public)
                    };
                    break;
            }

            args.pwd = this.temp.pwd;

            $.post('http://jesusville.or.kr/API/read/', args, function (res) {
                if (res !== 'success')
                    alert('오류가 있습니다.');
            });
        },
        login: function () {
            var t = this;
            var $btn = $(t.$refs.btn);
            var $pwd = $(t.$refs.pwd);
            $btn.attr('disabled', true);

            if (!t.temp.inputPwd) {
                alert('암호를 입력해주세요.');
                $pwd.focus();
                $btn.removeAttr('disabled');
            }
            else {
                $.post('http://jesusville.or.kr/API/read/?act=login', { pwd: t.temp.inputPwd }, function (res) {
                    if (res === 'success') {
                        localStorage.setItem('pwd', t.temp.inputPwd);
                        location.reload();
                    }
                    else {
                        t.temp.inputPwd = '';
                        alert('암호가 올바르지 않습니다.');
                        $btn.removeAttr('disabled');
                    }
                });
            }
        },
        addOikos: function () {
            this.load();
            this.temp.oikos = {};
            this.temp.mode = 'add';
            this.openOikosModal();
        },
        addMember: function () {
            this.load();
            this.temp.member = {};
            this.temp.mode = 'add';
            this.temp.member.oikos = this.temp.oikos.id;
            this.openMemberModal();
        },
        openOikosModal: function () {
            $(this.$refs.oikosModal).modal('show').off('shown.bs.modal').on('shown.bs.modal', function () {
                $t = $(this);
                setTimeout(function () {
                    $t.find('input[type=text]:first()').focus().select();
                });
            });
        },
        openMemberModal: function () {
            $(this.$refs.memberModal).modal('show').off('shown.bs.modal').on('shown.bs.modal', function () {
                $t = $(this);
                setTimeout(function () {
                    $t.find('input[type=text]:first()').focus().select();
                });
            });
        },
        saveOikos: function () {
            if (!this.temp.oikos.name) {
                alert('오이코스명을 입력해주세요.');
                return;
            }

            if (this.temp.mode === 'add') {
                var id = this.lib.randText();

                for (var i in this.public.oikoses) {
                    if (this.public.oikoses[i].name === this.temp.oikos.name) {
                        alert('같은 이름을 가진 오이코스가 있습니다.');
                        return;
                    }

                    if (this.public.oikoses[i].id === id) {
                        alert('저장에 오류가 있습니다. 다시 저장해주세요.');
                        return;
                    }
                }

                this.public.oikoses.push({
                    id: id,
                    name: this.temp.oikos.name
                });
            }
            else if (this.temp.mode === 'edit') {
                for (var j in this.public.oikoses) {
                    if (this.public.oikoses[j].id !== this.temp.oikos.id && this.public.oikoses[j].name === this.temp.oikos.name) {
                        alert('같은 이름을 가진 오이코스가 있습니다.');
                        return;
                    }
                }

                for (var k in this.public.oikoses) {
                    if (this.public.oikoses[k].id === this.temp.oikos.id)
                        this.$set(this.public.oikoses, k, this.temp.oikos);
                }
            }

            this.save('oikoses');
            $(this.$refs.oikosModal).modal('hide');
        },
        saveMember: function () {
            var duplicated = false;

            if (!this.temp.member.name) {
                alert('교인 이름을 입력해주세요.');
                return;
            }

            if (this.temp.mode === 'add') {
                var id = this.lib.randText();

                for (var i in this.public.members) {
                    if (this.public.members[i].name === this.temp.member.name)
                        duplicated = true;

                    if (this.public.members[i].id === id) {
                        alert('저장에 오류가 있습니다. 다시 저장해주세요.');
                        return;
                    }
                }

                if (duplicated && !confirm('같은 이름을 가진 교인이 있습니다. 그래도 저장하시겠습니까?'))
                    return;

                this.public.members.push({
                    id: id,
                    name: this.temp.member.name,
                    oikos: this.temp.member.oikos,
                    read: 0,
                    reads: [],
                    cycle: 0
                });
            }
            else if (this.temp.mode === 'edit') {
                for (var j in this.public.members) {
                    if (this.public.members[j].id !== this.temp.member.id && this.public.members[j].name === this.temp.member.name) {
                        duplicated = true;
                        break;
                    }
                }

                if (duplicated && !confirm('같은 이름을 가진 교인이 있습니다. 그래도 저장하시겠습니까?'))
                    return;

                for (var k in this.public.members) {
                    if (this.public.members[k].id === this.temp.member.id)
                        this.$set(this.public.members, k, this.temp.member);
                }
            }

            this.save('members');
            $(this.$refs.memberModal).modal('hide');
        },
        percent: function (child, parent) {
            if (child && parent)
                return (child / parent * 100).toFixed(2) + '%';

            return '0%';
        },
        average: function (oikos) {
            var sum = 0;
            var total = 0;
            for (var i in this.public.members) {
                if (oikos ? this.public.members[i].oikos === oikos : true) {
                    sum += this.public.members[i].reads.length;
                    total += 1;
                }
            }

            if (total && sum)
                return sum / total;

            return 0;
        },
        reset: function () {
            if (confirm(this.temp.member.name + '님의 기록을 전부 삭제하시겠습니까?')) {
                this.temp.member.read = null;
                this.temp.member.reads = [];
                this.move();
                this.save('members');
            }
        },
        latest: function (chapter, item) {
            var sum = 0;
            for (var i in this.data.books) {
                for (var j = 1; j <= this.data.books[i].last; j += 1) {
                    sum += 1;

                    if (chapter === sum) {
                        if (item === 'title')
                            return this.data.books[i].title;
                        else
                            return this.data.books[i].title + ' ' + j + '장';
                    }
                }
            }

            return '데이터가 없습니다.';
        },
        checkAll: function (book) {
            for (var i = 0; i < book.last; i += 1) {
                var idxOf = this.temp.member.reads.indexOf(book.idx + i);

                if (idxOf >= 0)
                    this.temp.member.reads.splice(idxOf, 1);
            }

            for (var j = 0; j < book.last; j += 1)
                this.temp.member.reads.push(book.idx + j);

            this.temp.member.read = this.temp.member.reads[this.temp.member.reads.length - 1];
            this.checkCompleted();
            this.save('reads');
        },
        check: function (chapter) {
            var t = this;
            var idxOf = t.temp.member.reads.indexOf(chapter);
            t.temp.member.read = 0;

            if (idxOf >= 0) {
                t.temp.member.reads.splice(idxOf, 1);
                t.temp.member.read = t.temp.member.reads[t.temp.member.reads.length - 1];
            }
            else {
                t.temp.member.reads.push(chapter);
                t.temp.member.read = chapter;
            }

            t.checkCompleted();

            if (t.temp.timer)
                clearTimeout(t.temp.timer);

            t.temp.timer = setTimeout(function () {
                t.save('reads');
            }, 1000);
        },
        checkCompleted: function () {
            if (this.temp.member.reads.length === data.chapterCount)
                alert('축하합니다. 성경 모든 권을 읽으셨습니다. 기록을 초기화하시려면 우측 하단의 기록 삭제 버튼을 눌러주세요.');
        },
        state: function (bible) {
            var include = false;
            var exclude = false;
            var now = false;

            for (i = bible.idx; i < bible.idx + bible.last; i += 1) {
                if (this.temp.member.read + 1 !== data.chapterCount && this.temp.member.read + 1 === i)
                    now = true;

                if (this.temp.member.reads.indexOf(i) >= 0)
                    include = true;
                else
                    exclude = true;
            }

            if (include && !exclude)
                return '다 읽었습니다.';
            else if (include && exclude)
                return '일부 읽었습니다.';
            else if (now)
                return '이제 읽을 차례입니다.';
            else
                return '아직 읽지 않았습니다.';
        },
        removeOikos: function () {
            if (confirm(this.temp.oikos.name + ' 오이코스를 삭제하시겠습니까? 소속된 교인 데이터도 같이 삭제됩니다.')) {
                var members = [];

                for (var i in this.public.members) {
                    if (this.public.members[i].oikos !== this.temp.oikos.id)
                        members.push(this.public.members[i]);
                }

                this.$set(this.public, 'members', members);

                for (var j in this.public.oikoses) {
                    if (this.public.oikoses[j].id === this.temp.oikos.id) {
                        this.public.oikoses.splice(j, 1);
                        break;
                    }
                }

                this.save();
                $(this.$refs.oikosModal).modal('hide');
            }
        },
        removeMember: function () {
            if (confirm(this.temp.member.name + ' 교인 데이터를 삭제하시겠습니까?')) {
                for (var i in this.public.members) {
                    if (this.public.members[i].id === this.temp.member.id) {
                        this.public.members.splice(i, 1);
                        break;
                    }
                }

                this.save('members');
                $(this.$refs.memberModal).modal('hide');
            }
        },
        ready: function () {
            alert('준비 중입니다.');
        },
        back: function () {
            window.history.back();
        },
        go: function (page, val) {
            if (page && val)
                location.hash = '/' + page + '/' + val;
            else if (page)
                location.hash = '/' + page;
            else
                location.hash = '';
        },
        set: function () {
            var t = this;

            switch (t.temp.page) {
                case 'oikos':
                    for (var i in t.public.oikoses) {
                        if (t.public.oikoses[i].id === t.temp.value) {
                            t.temp.oikos = t.public.oikoses[i];
                            break;
                        }
                    }
                    break;

                case 'member':
                    for (var j in t.public.members) {
                        if (t.public.members[j].id === t.temp.value) {
                            t.temp.member = t.public.members[j];

                            t.$nextTick(function () {
                                t.move();
                            });
                            break;
                        }
                    }
                    break;
            }
        },
        move: function () {
            var t = this;
            var $target = null;
            var offset = null;

            $(t.$el).find('.each-book').each(function () {
                if (t.temp.member.read > Number($(this).data('idx')) - 2)
                    $target = $(this);
            });

            offset = $target.offset();

            if (offset) {
                var scrollTop = offset.top - $(this.$el).find('.header').outerHeight();
                if (scrollTop) {
                    $('html,body').stop().animate({
                        scrollTop: scrollTop
                    });
                }
            }
        },
        watch: function () {
            var t = this;
            var hash = location.hash;
            if (hash) {
                var hashArr = hash.split('/');
                t.temp.page = hashArr[1];
                t.temp.value = hashArr[2];
            }
            else {
                t.temp.page = 'home';
            }

            this.set();
            $(this.$el).find('.modal').modal('hide');
        },
        load: function (func) {
            var t = this;
            var args = { act: 'read', pwd: t.temp.pwd };

            $.get('http://jesusville.or.kr/API/read/', args, function (res) {
                if (res) {
                    if (res === 'pwd') {
                        localStorage.removeItem('pwd');
                        location.reload();
                    }
                    else {
                        var data = null;

                        try {
                            data = JSON.parse(res);
                        }
                        catch (e) {
                            alert('데이터를 가져오는 중에 오류가 발생했습니다.');
                        }

                        if (data && typeof data === 'object') {
                            t.public = data;

                            if (typeof func === 'function')
                                func();
                        }
                    }
                }
                else {
                    alert('오류가 있습니다.');
                    return;
                }

                t.temp.ready = true;
            });
        }
    },
    computed: {
        members: function () {
            var members = [];

            for (var i in this.public.members) {
                if (this.public.members[i].oikos === this.temp.oikos.id)
                    members.push(this.public.members[i]);
            }

            members.sort(function (a, b) {
                if (a.reads.length < b.reads.length)
                    return 1;
                else if (a.reads.length > b.reads.length)
                    return -1;
                return 0;
            });

            return members;
        },
        oikoses: function () {
            var t = this;
            var oikoses = [];

            for (var i in this.public.oikoses) {
                var each = this.public.oikoses[i];
                oikoses.push(each);
            }

            oikoses.sort(function (a, b) {
                var readA = t.average(a.id);
                var readB = t.average(b.id);

                if (readA < readB)
                    return 1;
                else if (readA > readB)
                    return -1;
                return 0;
            });

            return oikoses;
        }
    },
    watch: {
        'temp.inputPwd': function (val) {
            if (val.length === 4)
                this.login();
        }
    },
    created: function () {
        var t = this;
        t.temp.pwd = localStorage.getItem('pwd');

        if (t.temp.pwd) {
            t.load(function () {
                t.watch();
            });

            $(window).on({
                hashchange: function () {
                    t.watch();
                }
            });
        }

        jQuery.ajaxSetup({ cache: false });
    },
    mounted: function () {
        var t = this;
        var mc = new Hammer(document.getElementById('app'));
        mc.add(new Hammer.Press({ event: 'press', time: 500 }));

        mc.on('press', function (e) {
            var $row = $(e.target).closest('.media');

            if ($row.length) {
                var $page = $row.closest('.page');
                var id = $row.attr('data-id');

                if ($page.hasClass('home')) {
                    for (var i in t.public.oikoses) {
                        if (t.public.oikoses[i].id === id) {
                            t.temp.mode = 'edit';
                            t.temp.oikos = t.lib.renew(t.public.oikoses[i]);
                            t.openOikosModal();
                            break;
                        }
                    }
                }
                else if ($page.hasClass('oikos')) {
                    for (var j in t.public.members) {
                        if (t.public.members[j].id === id) {
                            t.temp.mode = 'edit';
                            t.temp.member = t.lib.renew(t.public.members[j]);
                            t.openMemberModal();
                            break;
                        }
                    }
                }
            }
        });
    }
});