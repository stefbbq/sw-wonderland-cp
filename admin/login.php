<!DOCTYPE html><!--
	To change this license header, choose License Headers in Project Properties.
	To change this template file, choose Tools | Templates
	and open the template in the editor.
	--> 
<html class="no-js">
	<head>
		<title>WPL Login</title>
		<meta charset="UTF-8">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<!-- <link rel="stylesheet" href="styles/main.30ac1ef3.css"> -->
		<?php include '../webservice/assets.php'; ?>
	<body ng-app="wplLogin">
		<?php include "../webservice/top_menu.php"; ?>
		<div class="page-wrapper">
			<div class="spa clearfix" ng-controller="loginController">
				<h1>Login</h1>
				<form id="login_form" novalidate name="form">
					<div class="field-group col-1"> <label for="username">User Name</label> <input id="username" type="text" ng-model="user.username" required ng-minlength="2" ng-maxlength="45"> </div>
					<div class="field-group col-1"> <label for="password">Password</label> <input id="password" type="password" ng-model="user.password" required ng-minlength="2" ng-maxlength="45"> </div>
					<div class="buttons"> <button ng-click="login()" ng-disabled="form.$invalid">Login</button> </div>
				</form><!-- end form -->
			</div>
			<!--[if lt IE 9]>
			<script src="bower_components/es5-shim/es5-shim.js"></script>
			<script src="bower_components/json3/lib/json3.min.js"></script>
			<![endif]--> <script src="scripts/vendor.js"></script>
			<script src="scripts/loginApp.js"></script>  
			<script src="scripts/lib/md5.js"></script>
		</div><!-- end .page-wrapper -->
