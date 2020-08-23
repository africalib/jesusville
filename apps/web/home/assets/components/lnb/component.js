Vue.component('component-lnb', function (resolve, reject) {
  $.get('./assets/components/lnb/view.html').done(function (template) {
    resolve({
      template: template,
	  data: function(){
		  return {
			  list: {
				  data: []
			  }
		  }
	  },
	  props:['name1'],
	  methods: {
	  },
	  created: function() {
		var arr = [];
		var name2 = lib.getHash(2);

		switch(this.name1) { 
		    case 'intro':
				arr = [
						{ name2:'church', title:'교회 소개' },
						{ name2:'map', title:'오시는 길' }
					  ];
				break;
				
		    case 'sermon':
				arr = [
						{ name2:'sunday', title:'주일 오전 설교' },
						{ name2:'sunday3', title:'주일 오후 설교' },
						{ name2:'wednesday', title:'수요 설교' }
					  ];
				break;
			
			case 'worship':
				arr = [
						{ name2:'sunday', title:'주일 찬양' },
						{ name2:'newwave', title:'새물결찬양' }
					  ];
				break;
				
			case 'album':
				arr = [
						{ name2:'happy', title:'행복이 가득한 날들' },
						{ name2:'joshua', title:'여호수아 세대' }
					  ];
				break;
		}

		for(var i in arr) {
			var each = arr[i];
			
			if(name2 === each.name2)
				each.active = true;
			
			this.list.data.push(each);
		}
	  }
    })
  });
});