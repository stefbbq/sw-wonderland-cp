<!doctype html> 
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<title>Wonderland Printing Limited : Admin</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="stylesheet" href="styles/main.30ac1ef3.css">
	<body ng-app="wplAdmin">
		<!-- Begin SPA - Copy between SPA comments and add to template --> 
		<?php 
			include_once $_SERVER['DOCUMENT_ROOT'].'/wonderland-cp/webservice/database/Database.php';
			// $dat = new Database();
			echo "hello";
		?>

		<div class="spa clearfix">
			<div class="left menu" ng-controller="MenuController">
				<ul class="nav">
					<li ng-class="getClass('/listClients')"><a ng-href="#/listClients">Client List</a></li>
					<li ng-class="getClass('/addClient')"><a ng-href="#/addClient">Add New Client</a></li>
					<li ng-class="getClass('/listAdminUsers')"><a ng-href="#/listAdminUsers">User Admin</a></li>
					<li ng-class="getClass('/addCollateral')"><a ng-href="#/addCollateral">Add New Collateral</a></li>
					<li ng-class="getClass('/listCollateral')"><a ng-href="#/listCollateral">View All Collateral</a></li>
				</ul>
			</div><!-- end .left.menu -->
			<div ng-view="" class="right content"></div>
		</div>
		<!-- End SPA --> 

		<!--[if lt IE 9]>
			<script src="bower_components/es5-shim/es5-shim.js"></script>
			<script src="bower_components/json3/lib/json3.min.js"></script>
		<![endif]--> 
		<script src="scripts/vendor.4a84e97c.js"></script> <script src="scripts/scripts.e6315ab1.js"></script>