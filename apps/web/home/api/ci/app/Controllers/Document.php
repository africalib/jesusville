<?php namespace App\Controllers;

class Document extends BaseController
{
	private function tempRun1($name1, $name2)
	{
		$db = \Config\Database::connect();
		$builder = $db->table('documents');
		$builder->where(['name1' => $name1, 'name2' => $name2]);
		$res = $builder->get()->getResult();

		foreach($res as $r) {
			$content = trim(preg_replace('/\s\s+/', '', preg_replace('#(\s*<br\s*/?>)*\s*$#i', '', str_replace('aaaaa', '<br />', str_replace('</p>', '<br />', preg_replace("/<p[^>]*?>/", '', str_replace('<p></p>', '', preg_replace('#(<br */?>\s*)+#i', '<br />', (trim(str_replace('&nbsp;', '', str_replace('스마트폰 MP3듣기 터치ㅡ열기', '', strip_tags(str_replace('<br>.', 'aaaaa', str_replace('<br />.', 'aaaaa', str_replace('<strong>.<br />', 'aaaaa', str_replace('.<br />', 'aaaaa', $r->content)))), '<p>,<br>')))))))))))));
			//echo $content . '<hr />';
			//continue;

			$data = [
				'content'  => $content
			];

			$builder->where('id', $r->id);
			$builder->update($data);
		}

		echo 'success';
	}
	
	private function tempRun2()
	{
		$db = \Config\Database::connect();
		$builder = $db->table('documents');
		$res = $builder->get()->getResult();
		$files = array('038f0ff7efaa066447a3e28a012164c7.jpg', '06ebeda9d45b32013113a56ad1ad2323.jpg', '07c61ead794f74cae8bf1c5f275bea0e.jpg', '0a6c120e7122948829560fe2cf78996a.jpg', '0a8d5846bd4734ffdae94ba82b85305a.jpg', '0bbd24972c09dfded2ad77b45a4e7284.jpg', '0bfe2e2610a551b05a2c2161340fff0c.jpg', '11a839c18b2752723f47b9e76aee4514.jpg', '12b23f7447b90557cb96e0b1df8ab8e0.jpg', '134ef7be4a78b73e22640e4e39c6f4c7.jpg', '13d858a1da41b50a129990ae4ef7f89e.jpg', '14ff66a66464af03d89be7bc6765e4f0.jpg', '179142ac84c25dad1866a9dde3fc5c66.jpg', '19d24d6ff4f6d524898e98ca1f702a2b.jpg', '1b7b0329430e6cc0420fbf784a20755c.jpg', '1b7ec409119e02ca4bdd4e0dc1273865.jpg', '1daaaa9af6385a3944e0fb9a24a28d4c.jpg', '1e68aff5ba53bc413720af6c25a0a15d.jpg', '1e6c044c20175b941c8ca2210c28a592.jpg', '21e3185b70a5e68f456e37555054b764.jpg', '24eb4334041f9eaa146a86d5540158d4.jpg', '256acc80d800f046cc20467a1de9b7df.jpg', '272ab72e2d4f970e0a23dd1187b94bef.jpg', '2799d689d817514c257cbb42d677d863.jpg', '2b8a8d29bc31bef96f6fb629a622b97e.jpg', '2c028df852e0c872bbf74e39160e9f09.jpg', '2c0be2c1a66ef22b7c6a64a219761da9.jpg', '2f2b8f4c278f9dab9a786c3e89e350e7.jpg', '3017a54acebb36500b7f3520543cebdf.jpg', '30f5b726db791ba3a274bf4ed49a16ef.jpg', '35399e8018ccfa8e7c97a08cf1920717.jpg', '36624ebbc604103df4bd17e2cb0ac01e.jpg', '3be1dd9907f2f4d8cf8660d103549eca.jpg', '3c6d45a3a8afd571faa0839376d4720f.jpg', '3cb2801690dcca49266a28f85ebf2ed0.jpg', '3cf129f085998f12aed10f7bf2286833.jpg', '3d8f0918487c27d4d66bc86ab787a7b5.jpg', '3db5d8ec7bf677106c20cafd2809d50b.jpg', '3e8eff23838a8b24f584db4df30d5f86.jpg', '40dc3750e026192dc607d494624e2d12.jpg', '40e5fc96c54da176e4fa1694d707d9c0.jpg', '41b4525b4ad81987d266f3d015be64d7.jpg', '42a47451684faf614fccdb573c8c32e8.jpg', '45bb24b2e66a9f31497743f0c9435f38.jpg', '45efa20fe52555ea2efd5dcc63f85ef4.jpg', '4715a7586933469b8ce9eb06d06e402f.jpg', '47cbd39b5b5320e82937c049a5f7055a.jpg', '4886ebda26fb3edfa788b6eb1dd7da2f.jpg', '48bef37b33bbb6ea594040d1af46bb1b.jpg', '4934cf224cda2c598484a364ffbd2a88.jpg', '4a052e848fceabc398ca4827b2788112.jpg', '4a1fff765627cc96e6d8febcb50e5675.jpg', '4c9b8294d33b1e63af20186295e9b24b.jpg', '4d36f8433141ceefedfbe29549a055ff.jpg', '4d6e67c72b02d803d12c426045a95243.jpg', '4edf85903fbab05f2588e47bf5b8eb7a.jpg', '50c44c0b101e569dfedc887d4b7fbc22.jpg', '52ae3ef856455d01616e8ea0a7e7f158.jpg', '559a3d8d54474c9af045c4777535f977.jpg', '55e4a20b84a5e7cd6eae48d93c7e6112.jpg', '57c026f5d1de9143955592986d82646a.jpg', '5864488e65c344789fcc01caaef0bb95.jpg', '58daa9e977fc6247fde003f205de923a.jpg', '59856522e98f07563ee8fde7f6841ad0.jpg', '5d1923e6e5676be05e277190548bdc3c.jpg', '5ecbdafef555866f5107e4d1f0fcd8e4.jpg', '5f570c1ba1ce38979145ddfceabd5d0f.jpg', '5ff158ae1c920c8174ce2c5bea169a85.jpg', '60231e42b766f2bde0faacc985755ee6.jpg', '64c5415e3021cc4ddac970141b68d7ac.jpg', '66852f4f8167ad4bd64920c3fe989e0d.jpg', '66c463db73b38d73faa56e5453da702a.jpg', '6b043fa87860031113c7e3264c5ebcb6.jpg', '6bda6a722c8460b51cc922af8cb4a000.jpg', '6c7dd7ce7ac78f0788c90f0fe1f63884.jpg', '6e6337412eb4eca64f24af46887155ed.jpg', '7166355489d9514317714d8d09af0b4d.jpg', '740df4d9c63a14c7ec5b4bdeffb5d780.jpg', '74175d30421c80b9ddf226ff4eea314b.jpg', '7b7b8af3cb31f5a121360e0bf1a912ac.jpg', '7baee12724b6e74a638971ea64ecccef.jpg', '7bf19e25eeae360fbdd0509c57b69945.jpg', '7dfa326d0bb7456f6e7c710ac8b76df5.jpg', '80c15b0ebff73a45109cddeeba36f5d7.jpg', '81b9451405e845f87149eb6cc7e5594e.jpg', '8629eac3f0f620807c25f2aeb51c13b8.jpg', '867e03617d62630e8757e6c3a9ae8ccb.jpg', '87583a2e0308d6d638fef65a552ace68.jpg', '886cfb3cee7ea082c3e7d8b351ce29e8.jpg', '894048c8237edd438dd972edf5c58c08.jpg', '8b8128081bbe0f6a3c2c398a60c9592a.jpg', '8b88175e28a583bd1825ac209b226897.jpg', '8f832880e6f324f264e811ac1620bd3e.jpg', '906f8b861954238caf6588d722ed54b0.jpg', '91921a202876b8387793d4f7165dbb74.jpg', '939555abbbb7df331491744563ed2ff3.jpg', '94b1221625597afd18115c4e3ec30eb5.jpg', '94e96090ca8762e56eafa00d4913ccd2.jpg', '986719c05893057265c55e6fa50f66b7.jpg', '9e02c5b3f7333076faf8a4c8e96839df.jpg', '9f23f63e1253995e91e1011046c1fe1e.jpg', 'a28c2a3e56411c9f7b359b31146ebb6f.jpg', 'a88624575e093e395ecd70ed145df536.jpg', 'ab072342eb47d2536fde4eb7d58cf5bc.jpg', 'abc4b7fd8d79c8c4ef8e3bf6688316b5.jpg', 'ad7fbc6aad15743df80651715ce2e6aa.jpg', 'af5cc29aee6361bd201fbae6c08bc269.jpg', 'b06f3d83e833648218861b8168bb828c.jpg', 'b0c83d2d37ca92e2c45ea1adb234a956.jpg', 'b2206958888609b12c6ac19156ec59b4.jpg', 'b23f34e79f66031e9342dd1d54bd739b.jpg', 'b40bec4c04dfa25f226703318ef3b88a.jpg', 'b410aff061822c2a3a102cfc6cbc6466.jpg', 'b546744a1f02c5b4b5029dc3248e91e6.jpg', 'b55798dc740861119a92be755560e866.jpg', 'b72002d6469e4f6a9244f4e253bfef95.jpg', 'b8fccdaced2deec088eec9cb81ffb9ad.jpg', 'b90593208f840452106242e7ed4a609c.jpg', 'b9292a4805f6d5b97327d9475788a01f.jpg', 'b9403ca3a71b90695620a12db57709ef.jpg', 'ba077480501288a32eb5a33ddc0bc3d7.jpg', 'bae5e3a9bf0ebc285b7ba6f7181ae269.jpg', 'bcca23fc29deadaced8debf86eadc92d.jpg', 'c0d8f61a2c52040e9d0d3974a4daf2a7.jpg', 'c142cff466e7da098b22e52cd26549f8.jpg', 'c3b7f7b52891b6917bc3ceb11a577dcb.jpg', 'c832d638aee626c38c56907f744b8cd0.jpg', 'c91867d55efa1ef148d464a9d60717b5.jpg', 'c9aa43b01d8d577407fc8595757cc0c4.jpg', 'caa6732eea6c8b1fb7b195076c7518eb.jpg', 'cafb9b82b5a789ed4248aa0990080209.jpg', 'cbcaae26bc94b432041eeacba00a030c.jpg', 'cd0d5760eecc5d5b491cff5a5c0321a9.jpg', 'cd2c00be765f0281235fb91916edd0a4.jpg', 'cf311c613787c95716de48730c3d74cf.jpg', 'cfcb42d2619656fa67dbf5e8c4a56b19.jpg', 'd09c73271dd7b25f4ab1432eb2387bf2.jpg', 'd19201d01fff496e28c4667792f29096.jpg', 'd22640b25d60ed61b48f91a51e86b3fc.jpg', 'd46a61bdd0aec14c96a8a59cba67cc91.jpg', 'd4bd01319630a8bf57316b4499bdc0c9.jpg', 'd51251ba0af49d652fd53513ebb608d3.jpg', 'd55614755f223caa862fcebc701e7e38.jpg', 'd572ef9d67532c246d0342622ca0af3d.jpg', 'd5ae83880e8dc87cac6109344b3eadeb.jpg', 'd61a56a819644141cddfc2af07d3ee31.jpg', 'd648d7e5aec61fa8c0c4c74d5b40d46b.jpg', 'd69fdb8d0dae1da54b09acc23f65a9cb.jpg', 'd6afd006c3461045314b7e2f7a8bdc96.jpg', 'd962f48116e580e6f5ea22446dabb074.jpg', 'd99fdaeb5800c2dd985d07ca94b9eba2.jpg', 'dc2683e391a8fc31c8dd088ef5c4ca5c.jpg', 'e0d6bdf64a878519c2ff2e918f060e4f.jpg', 'e370eb186ee761d3f0cb5fdccbc0a41e.jpg', 'e6bb6500e1942f2d540e7530dfb4a0b5.jpg', 'e797d45281b6ba5f42169d366f1ba648.jpg', 'e84d8e6edf4959cfb4d5274903372ae5.jpg', 'e98c1f79cae8fe94dcceea3c7f65c539.jpg', 'e9abb17c976b08ab063089befd23d8fa.jpg', 'ec148e881f06d19ae4218218c0c057b3.jpg', 'f13d08bacf134c188928972b4ca51554.jpg', 'f43f195f0064e069913b47a65e0b4861.jpg', 'f46e45e1a296ff763205cf944fdcc77b.jpg', 'f5b1f9a9a32c3c25cce19deb54db5317.jpg', 'f9110b9209233555de4dbe48eca87f3b.jpg', 'fb0e5744f99f28404b73d95020ae7ba1.jpg', 'fb5425c346083c499bb1f03fea80de5e.jpg', 'fc66e3aa9d16d60615b6c3e18e190e3c.jpg', 'fdfbf1d2db784c5d7f615080ed105060.jpg');
		$arr = array();

		foreach($res as $r) {
			if(!empty($r->filePaths)) {
				$filePaths = json_decode($r->filePaths);
				
				foreach($filePaths as $f)
					$arr[] = str_replace('/assets/files/', '', $f);
			}
		}
		
		foreach($files as $f) {
			if(in_array($f, $arr)){
				
			}
			else{
				unlink('/jesusvillech/www/assets/files/' . $f);
			}
		}
	}
	
	private function uploadFiles($files) {
		$returnValue = array();
		$uploadDir = '/jesusvillech/www';
		$allowedExts = "jpg,jpeg,gif,png";
		$allowedExtArr = explode(',', $allowedExts);
		$maxFileSize = 5242880;
		
		for($i = 0; $i < count($files['name']); $i += 1) {
			$fileName = $files['name'][$i];
			$fileTmpName = $files['tmp_name'][$i];
			$fileSize = $files['size'][$i];
			$filePath = '';
			$ext = strtolower(substr($fileName, strrpos($fileName, '.') + 1));
			
			if(!in_array($ext, $allowedExtArr)) {
				echo 'ext';
				return;
			}
				
			if($fileSize >= $maxFileSize) {
				echo 'size';
				return;
			}
			
			$filePath = '/assets/files/' . md5(date('YmdHis') . $i) . '.' . $ext;

			if(move_uploaded_file($fileTmpName, $uploadDir . $filePath)) {
				$returnValue[] = $filePath;
			}
		}
		
		return $returnValue;
	}

	public function list()
	{
		$result = array();
		$db = \Config\Database::connect();
		$builder = $db->table('documents');
		
		$key = '';
		$keyword = '';
		$name1 = $_GET['name1'];
		$name2 = $_GET['name2'];
		$order = $_GET['order'];
		$orderType = $_GET['orderType'];
		
		if(isset($_GET['key']))
			$key = $_GET['key'];
		
		if(isset($_GET['keyword']))
			$keyword = $_GET['keyword'];
		
		$builder->select('id, title, extend1, extend2, extend3, extend4, extend5, regDate, videoUrls, filePaths');
		$builder->where(['name1' => $name1, 'name2' => $name2]);
		
		if(!empty($keyword)) {
			switch($key) {
				case 'title':
					$builder->like(['title' => $keyword]);
				break;
				
				case 'content':
					$builder->like(['content' => $keyword]);
				break;
				
				default:
					$builder->where("(title LIKE '%$keyword%' OR content LIKE '%$keyword%' OR extend1 LIKE '%$keyword%' OR extend2 LIKE '%$keyword%' OR extend3 LIKE '%$keyword%' OR extend4 LIKE '%$keyword%' OR extend5 LIKE '%$keyword%')");
				break;
			}
		}
		
		$builder->orderBy("$order $orderType, id desc");
		
		$res = $builder->get()->getResult();
		$result['count'] = count($res);
		$result['data'] = $res;

		//$this->tempRun1($name1, $name2);
		//return;
		
		print json_encode($result);
	}
	
	public function add() {
		$result = '';
		$db = \Config\Database::connect();
		$builder = $db->table('documents');
		
		$title = isset($_POST['title']) ? $_POST['title'] : '';
		$name1 = isset($_POST['name1']) ? $_POST['name1'] : '';
		$name2 = isset($_POST['name2']) ? $_POST['name2'] : '';
		$content = isset($_POST['content']) ? $_POST['content'] : '';
		$extend1 = isset($_POST['extend1']) ? $_POST['extend1'] : '';
		$extend2 = isset($_POST['extend2']) ? $_POST['extend2'] : '';
		$extend3 = isset($_POST['extend3']) ? $_POST['extend3'] : '';
		$extend4 = isset($_POST['extend4']) ? $_POST['extend4'] : '';
		$extend5 = isset($_POST['extend5']) ? $_POST['extend5'] : '';
		$videoUrls = isset($_POST['videoUrls']) ? $_POST['videoUrls'] : '';
		$regDate = isset($_POST['regDate']) ? $_POST['regDate'] : '';
				
		$data = [
			'title' => $title,
			'content'  => $content,
			'extend1'  => $extend1,
			'extend2'  => $extend2,
			'extend3'  => $extend3,
			'extend4'  => $extend4,
			'extend5'  => $extend5,
			'videoUrls'  => $videoUrls,
			'name1'  => $name1,
			'name2'  => $name2,
			'readCnt'  => 0,
			'regDate'  => $regDate,
			'insDate' => date("Y-m-d h:i:s")
		];

		$builder->insert($data);
		$result = 'success';
		
		print $result;
	}
	
	public function edit() {
		$result = '';
		$db = \Config\Database::connect();
		$builder = $db->table('documents');
		
		$id = isset($_POST['id']) ? $_POST['id'] : '';
		$title = isset($_POST['title']) ? $_POST['title'] : '';
		$name1 = isset($_POST['name1']) ? $_POST['name1'] : '';
		$name2 = isset($_POST['name2']) ? $_POST['name2'] : '';
		$content = isset($_POST['content']) ? $_POST['content'] : '';
		$extend1 = isset($_POST['extend1']) ? $_POST['extend1'] : '';
		$extend2 = isset($_POST['extend2']) ? $_POST['extend2'] : '';
		$extend3 = isset($_POST['extend3']) ? $_POST['extend3'] : '';
		$extend4 = isset($_POST['extend4']) ? $_POST['extend4'] : '';
		$extend5 = isset($_POST['extend5']) ? $_POST['extend5'] : '';
		$videoUrls = isset($_POST['videoUrls']) ? $_POST['videoUrls'] : '';
		$regDate = isset($_POST['regDate']) ? $_POST['regDate'] : '';
		$filePaths = array();
				
		$data = [
			'title' => $title,
			'content'  => $content,
			'extend1'  => $extend1,
			'extend2'  => $extend2,
			'extend3'  => $extend3,
			'extend4'  => $extend4,
			'extend5'  => $extend5,
			'videoUrls'  => $videoUrls,
			'regDate'  => $regDate
		];
		
		if(isset($_FILES['files']) && is_array($_FILES['files']['name'])) {
			$filePaths = $this->uploadFiles($_FILES['files']);
		
			if(count($filePaths) > 0)
				$data['filePaths'] = json_encode($filePaths, JSON_UNESCAPED_SLASHES);
			else
				return $filePaths;
		}

		$builder->where('id', $id);
		$builder->update($data);
		$result = 'success';
		
		print $result;
	}
	
	public function info($value) {
		$result = array();
		$db = \Config\Database::connect();
		$builder = $db->table('documents');
		
		$query = $builder->getWhere(['id' => $value], 1);
		$result = $query->getResult();
		
		if(count($result) === 1) {
			$result = $result[0];
			
			$builder->where('id', $value);
			$builder->update(['readCnt' => $result->readCnt + 1]);
		}
		
		print json_encode($result);
	}
} 