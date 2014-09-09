<!doctype html> 
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<title>Wonderland Printing Limited : Admin</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<!-- <link rel="stylesheet" href="styles/main.30ac1ef3.css"> -->
		<?php include '../webservice/assets.php'; ?>
    <link rel="stylesheet" href="../styles/stylesheets/client_portal_override.css">
		    

	<body ng-app="ClientPortalApp">
		
		<!--  Main Menu -->
		<?php include "../webservice/top_menu.php"; ?>

		<!-- Begin SPA - Copy between SPA comments and add to template --> 
		<div class="page-wrapper">

			<div class="spa clearfix section-wrapper">
				<div class="left menu col-1-3 col" ng-controller="MenuController">
					<ul class="nav slider-menu" id="admin-menu">
						<li ng-class="getClass('/home')" class="menu-item current">
							<a ng-href="#/home">
								Home
								<span class="filled-link"></span>
							</a>
						</li>
						<li ng-class="getClass('/collateral')" class="menu-item ">
							<a ng-href="#/collateral">
								Collateral
								<span class="filled-link"></span>
							</a>
						</li>
						<li ng-class="getClass('/requestQuote')" class="menu-item ">
							<a ng-href="#/requestQuote">
								Request Quote
								<span class="filled-link"></span>
							</a>
						</li>
					</ul>
				</div><!-- end .left.menu -->

				<div ng-view="" class="right content col col-2-3"></div>
				<div class="clear"></div>
			</div>
			<!-- End SPA --> 


		</div><!-- end .page-wrapper -->

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular-cookies.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular-route.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>    
    
    <script src="js/app/ClientPortalApp.js"></script>

    <script src="js/app/controllers/HomeCtrl.js"></script>
    <script src="js/app/controllers/CollateralCtrl.js"></script>
    <script src="js/app/controllers/RequestQuoteCtrl.js"></script>
    <script src="js/app/controllers/OrderHistorySearchCtrl.js"></script>
    
    <script src="js/app/factories/ClientService.js"></script>
    
    <script src="js/app/filters/phoneNumbers.js"></script>


    
    
		<script>
      var $ = $ || jQuery;
    
			$(document).ready(function() {
	      $(".nav-top .hamburger").click(function() {
	          $('.nav-top ul').toggleClass('expand');
	      });

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