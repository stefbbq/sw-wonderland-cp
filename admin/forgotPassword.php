<!DOCTYPE html><!--
	To change this license header, choose License Headers in Project Properties.
	To change this template file, choose Tools | Templates
	and open the template in the editor.
	--> 
<html class="no-js">
	<head>
		<title>WPL Password Reset</title>
		<meta charset="UTF-8">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<!-- <link rel="stylesheet" href="styles/main.30ac1ef3.css"> -->
		<?php include '../webservice/assets.php'; ?>
	<body ng-app="wplForgotPassword">
		<?php include "../webservice/top_menu.php"; ?>
		<div class="page-wrapper">
			<div class="spa clearfix" ng-controller="forgotPasswordController">
				<h1>Request Password Reset</h1>
				<form id="reset_form" novalidate name="form">
					<div class="field-group col-1"> <label for="email">Email Address</label> <input id="email" type="text" ng-model="user.email" required ng-minlength="2" ng-maxlength="45"> </div>
					<div class="buttons"> <button ng-click="requestReset()" ng-disabled="form.$invalid">Reset Password</button> </div>
				</form><!-- end form -->
        
        <p><a href="login.php">Remembered Password?</a></p>
        
        <div class='result-message'>
          <p>{{resultMessage.message}}</p>
        </div>
			</div>
      
			<!--[if lt IE 9]>
			<script src="bower_components/es5-shim/es5-shim.js"></script>
			<script src="bower_components/json3/lib/json3.min.js"></script>
			<![endif]--> <script src="scripts/vendor.js"></script>
			<script src="scripts/ForgotPasswordApp.js"></script>  
			<script src="scripts/lib/md5.js"></script>
		</div><!-- end .page-wrapper -->
