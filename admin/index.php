<!doctype html> 
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<title>Wonderland Printing Limited : Admin</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<!-- <link rel="stylesheet" href="styles/main.30ac1ef3.css"> -->
		<?php include '../webservice/assets.php'; ?>
		<script src="scripts/utilities.js"></script>

	<body ng-app="wplAdmin">
		
		<!--  Main Menu -->
		<?php include "../webservice/top_menu.php"; ?>

		<!-- Begin SPA - Copy between SPA comments and add to template --> 
		<div class="page-wrapper">

			<div class="spa clearfix section-wrapper">
				<div class="left menu col-1-3 col" ng-controller="MenuController">
					<ul class="nav slider-menu" id="admin-menu">
						<li ng-class="getClass('/listClients')" class="menu-item current">
							<a ng-href="#/listClients">
								Client List
								<span class="filled-link"></span>
							</a>
						</li>
						<li ng-class="getClass('/addClient')" class="menu-item ">
							<a ng-href="#/addClient">
								Add New Client
								<span class="filled-link"></span>
							</a>
						</li>
						<li ng-class="getClass('/listAdminUsers')" class="menu-item ">
							<a ng-href="#/listAdminUsers">
								User Admin
								<span class="filled-link"></span>
							</a>
						</li>
						<li ng-class="getClass('/addCollateral')" class="menu-item ">
							<a ng-href="#/addCollateral">
								Add New Collateral
								<span class="filled-link"></span>
							</a>
						</li>
						<li ng-class="getClass('/listCollateral')" class="menu-item ">
							<a ng-href="#/listCollateral">
								View All Collateral
								<span class="filled-link"></span>
							</a>
						</li>
					</ul>
				</div><!-- end .left.menu -->

				<div ng-view="" class="right content col col-2-3"></div>
				<div class="clear"></div>
			</div>
			<!-- End SPA --> 

			<!--[if lt IE 9]>
				<script src="bower_components/es5-shim/es5-shim.js"></script>
				<script src="bower_components/json3/lib/json3.min.js"></script>
			<![endif]--> 
			<script src="scripts/vendor.js"></script>
			<script src="scripts/scripts.js"></script>

			<div id="modal" class="hidden"></div>

		</div><!-- end .page-wrapper -->

		<script>
			$(document).ready(function() {

	      $("#admin-menu .menu-item").click(function() {
	      	if(!$(this).hasClass('current')) {
	      		$("#admin-menu .menu-item").removeClass('current');
	      		$(this).addClass('current');
	      	}
	      });

    		$("#admin-menu .menu-item").removeClass('current');
    		$('#admin-menu .menu-item a[ng-href="'+location.hash+'"]').closest('.menu-item').addClass('current');
			});
		</script>