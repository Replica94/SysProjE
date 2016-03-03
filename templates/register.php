<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Register</title>
	</head>

	<body>
		<form method="post" action="register.php">
			<input type="text" name="username" placeholder="Type a username">
			<input type="password" name="passwd" placeholder="Type a password">
			<input type="password" name="passwd2" placeholder="Retype password">
			<input type="submit" name="submit" value="Register">
		</form>
		<?php foreach ($warnings as $warning): ?>
			<div class="warning"><?php echo $warning ?></div>
		<?php endforeach; ?>
	</body>
</html>
