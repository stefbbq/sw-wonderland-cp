<!DOCTYPE html>
<html>
  <head>
    <title>WPL Client Portal Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="../styles/main.30ac1ef3.css">
	<link rel="stylesheet" href="../styles/stylesheets/resetPassword.css">
  </head>
  <body ng-app="LoginApp" class="spa">
    <h1>Client Portal Login</h1>
	<div ng-controller="LoginFormCtrl">
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
		
    <h3>Result</h3>
		<pre>
			{{webService.result}}
		</pre>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular-cookies.min.js"></script>
	<script src="js/lib/md5.js"></script>
	<script src="js/app/LoginApp.js"></script>
	
  </body>
</html>
  
