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
			<div class="section-wrapper login-section">
				<div class="spa clearfix" ng-controller="loginController">
					<div class="section-title">Admin</div>
					<div class="label intro-copy">The Client Center helps you manage your projects and request new print jobs. Send us an email if you would like to use this service.</div>
					<form id="login_form" novalidate name="form">
						<div class="field-group col-1"> <div class="input-label label" for="username">User Name</div> <input id="username" type="text" ng-model="user.username" required ng-minlength="2" ng-maxlength="45"> </div>
						<div class="field-group col-1"> <div class="input-label label" for="password">Password</div> <input id="password" type="password" ng-model="user.password" required ng-minlength="2" ng-maxlength="45"> </div>
						<div class="buttons"> <button ng-click="login()" ng-disabled="form.$invalid">Login</button> </div>
					</form><!-- end form -->
					<div class="label forgot-link"><a href="forgotPassword.php">Forgot Password?</a></div>
					<div class="label forgot-link"><a href="../client/login.php">I am a client</a></div>
				</div>
			</div><!-- end.login-section -->

      
			<!--[if lt IE 9]>
			<script src="bower_components/es5-shim/es5-shim.js"></script>
			<script src="bower_components/json3/lib/json3.min.js"></script>
			<![endif]--> <script src="scripts/vendor.4a84e97c.js"></script>
			<script src="scripts/loginApp.js"></script>  
			<script src="scripts/lib/md5.js"></script>
		</div><!-- end .page-wrapper -->
