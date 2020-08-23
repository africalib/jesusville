<?php
$cacheNum = 5;
if($_SERVER['REMOTE_ADDR'] !== '121.162.57.217') {
	//echo '준비 중입니다.';
	//die();
}
?>

<!DOCTYPE html>
<html lang="ko">
<head>
  <title>예수촌교회</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="./assets/css/app.css?<?php echo $cacheNum ?>" />
</head>
<body>
	<div id="app" class="app" v-cloak>
		<header class="border-bottom shadow-sm bg-white px-md-4">
			<div class="container">
				<div class="d-flex flex-column flex-md-row align-items-center">
				  <h5 class="logo my-0 mr-md-auto font-weight-normal">
					<a href="/">
						<span>예수촌교회</span>
					</a>
				  </h5>
				  <nav class="my-md-0 mr-md-3">
					    <a class="p-2 text-dark" v-bind:class="{ active: g.name1 === page.name1 }" v-for="g in gnb" v-on:click="global.window.go(g.name1, g.name2)">{{ g.title }}</a>
				  </nav>
				  <a class="play-btn" href="https://www.youtube.com/channel/UCpy9P3whXtC480qDu-IP93Q" target="_blank">
						<i class="fa fa-youtube-play"></i>
				  </a>
				</div>
			</div>
		</header>
		<article>
			<div class="container">
				<div class="alert alert-warning alert-dismissible fade show" role="alert">
				  <span>이 사이트 제작 중입니다.</span>
				  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				  </button>
				</div>
			</div>
			<div class="page">
				<component v-bind:is="page.tag"></component>
			</div>
		</article>
		<footer>
			<div class="container">
				<span>&copy; 예수촌교회 <?php echo date('Y') ?></span>
				<span class="d-none d-sm-inline">&nbsp; | &nbsp;</span>
				<br class="d-inline-block d-sm-none" />
				<span>서울 은평구 은평로10길 17</span>
				<span>&nbsp; | &nbsp;</span>
				<a href="tel:023071340">02-307-1340</a>
			</div>
		</footer>
		<modal-write></modal-write>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
	<script src="./assets/js/lib.js"></script>
	<script src="./assets/js/global.js"></script>
	
	<link href="./assets/components/board/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/components/board/component.js?<?php echo $cacheNum ?>"></script>
	
	<link href="./assets/components/loading/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/components/loading/component.js?<?php echo $cacheNum ?>"></script>
	
	<link href="./assets/modals/write/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/modals/write/modal.js?<?php echo $cacheNum ?>"></script>
	
	<link href="./assets/components/lnb/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/components/lnb/component.js?<?php echo $cacheNum ?>"></script>

	<link href="./assets/pages/default/ready/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/pages/default/ready/page.js?<?php echo $cacheNum ?>"></script>

	<link href="./assets/pages/home/index/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/pages/home/index/page.js?<?php echo $cacheNum ?>"></script>
	
	<link href="./assets/pages/intro/church/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/pages/intro/church/page.js?<?php echo $cacheNum ?>"></script>

	<link href="./assets/pages/intro/map/style.css?<?php echo $cacheNum ?>" rel="stylesheet" />
	<script src="./assets/pages/intro/map/page.js?<?php echo $cacheNum ?>"></script>
	
	<script src="./assets/pages/sermon/sunday/page.js?<?php echo $cacheNum ?>"></script>
	<script src="./assets/pages/sermon/sunday3/page.js?<?php echo $cacheNum ?>"></script>
	<script src="./assets/pages/sermon/wednesday/page.js?<?php echo $cacheNum ?>"></script>
	
	<script src="./assets/pages/worship/sunday/page.js?<?php echo $cacheNum ?>"></script>
	<script src="./assets/pages/worship/newwave/page.js?<?php echo $cacheNum ?>"></script>
	
	<script src="./assets/pages/album/happy/page.js?<?php echo $cacheNum ?>"></script>
	<script src="./assets/pages/album/joshua/page.js?<?php echo $cacheNum ?>"></script>
	
	<script src="./assets/js/app.js?<?php echo $cacheNum ?>"></script>
</body>
</html>
