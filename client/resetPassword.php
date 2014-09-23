<!DOCTYPE html>
<html>
  <head>
    <title>Change Password</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include '../webservice/assets.php'; ?>
<!-- 	<link rel="stylesheet" href="../styles/main.30ac1ef3.css">
	<link rel="stylesheet" href="../styles/stylesheets/resetPassword.css"> -->
  </head>
  <body ng-app="ChangePasswordApp" class="spa">

  	<?php include "../webservice/top_menu.php"; ?>

  	<div class="page-wrapper">
  		<div class="section-wrapper login-section">
  			<div class="section-title">Set Password</div>
  			<div class="label">Your password has been reset</div>
  			<div class="intro-copy label">Please enter your old password, and choose a new one.</div>

				<div ng-controller="PasswordFormCtrl">
					<form name='form' novalidate>
						<input type="hidden" name='guid' ng-model="user.guid">
						<span class='fieldGroup'>
							<div class="input-label label" for="temp_password">Temporary Password</div>
							<input id="temp_password" type='password' required ng-model="user.oldPassword" name='old_password'>
						</span>
						<span class='fieldGroup'>
							<div class="input-label label" for="password">New Password</div>
							<input id="password" type='password' required ng-model="user.password" name='password'>
						</span>
						<span class='fieldGroup'>
							<div class="input-label label" for="password2">Confirm Password</div>
							<input id="password2" type='password' required ng-model="user.password2" match="user.password" name='password2'>
						</span>
					   <div ng-show="form.password2.$error.match">Passwords do not match!</div>
						
						<div class="buttons">
							<button ng-click="save()" ng-disabled="form.$invalid" >Change</button>
							<!--button ng-click="autofill()">Auto Fill</button-->
						</div>			
					</form>
					
			    <h3>Result</h3>
					<pre>
						{{webService.result}}
					</pre>
				</div>


  		</div><!-- end .login-section -->
  	</div><!-- end .page-wrapper -->


	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>
	<script src="js/lib/md5.js"></script>
	<script src="js/app/ResetPasswordApp.js"></script>
	
  </body>
</html>
  
