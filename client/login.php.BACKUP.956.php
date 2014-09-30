<!DOCTYPE html>
<html>
  <head>
    <title>WPL Client Portal Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include '../webservice/assets.php'; ?>

<!-- 	<link rel="stylesheet" href="../styles/main.30ac1ef3.css">
	<link rel="stylesheet" href="../styles/stylesheets/resetPassword.css"> -->
  </head>
  <body ng-app="LoginApp" class="spa">
    <!-- <h1>Client Portal Login</h1> -->
	<div ng-controller="LoginFormCtrl">
<<<<<<< HEAD
		<?php include "../webservice/top_menu.php"; ?>
		<div class="page-wrapper">
			<div class="section-wrapper login-section">
				
				<div class="section-title">Client Center</div>
				<div class="label intro-copy">The Client Center helps you manage your projects and request new print jobs. Send us an email if you would like to use this service.</div>

				<form name='form' novalidate>
					<span class='fieldGroup'>
						<div class="input-label label" for="email">Email Address</div>
						<input id="email" type='email' required ng-model="user.email" name='email'>
					</span>
					<span class='fieldGroup'>
						<div class="input-label label" for="password">Password</div>
						<input id="password" type='password' required ng-model="user.password" name='password'>
					</span>
		      

					<div class="buttons">
						<button ng-click="login()" ng-disabled="form.$invalid" >Login</button>
						<!--button ng-click="autofill()">Auto Fill</button-->
					</div>
					<div class="label forgot-link"><a href="forgotPassword.php">Forgot Password?</a></div>
					<div class="label forgot-link"><a href="../admin/login.php">I am an admin (WPL employee only)</a></div>
				</form>

			</div><!-- end .login-section -->
		</div><!-- end .page-wrapper -->

		
<!--     <h3>Result</h3>
		<pre>
			{{webService.result}}
		</pre>
 -->	</div>
=======
		<form name='form' novalidate>
			<span class='fieldGroup'>
				<label for="email">Email Address</label>
				<input id="email" type='email' required ng-model="user.email" name='email'>
			</span>
			<span class='fieldGroup'>
				<label for="password">Password</label>
				<input id="password" type='password' required ng-model="user.password" name='password'>
			</span>
      <a href="forgotPassword.php">Forgot Password?</a>
			<div class="buttons">
				<button ng-click="login()" ng-disabled="form.$invalid" >Login</button>
				<!--button ng-click="autofill()">Auto Fill</button-->
			</div>			
		</form>
	</div>
>>>>>>> 5ea566352a7241b92b8ee6fa04b666f595f656f6

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular-cookies.min.js"></script>
	<script src="js/lib/md5.js"></script>
	<script src="js/app/LoginApp.js"></script>
	
  </body>
</html>
  
