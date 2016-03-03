<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Login</title>
	</head>

	<body>
		<?php foreach ($messages as $message): ?>
			<div class="message"><?php echo $message ?></div>
		<?php endforeach; ?>
		<form method="post" action="login.php">
			<input type="text" name="username" placeholder="Type a username">
			<input type="password" name="passwd" placeholder="Type a password">
			<input type="submit" name="submit" value="Register">
		</form>
		<?php foreach ($warnings as $warning): ?>
			<div class="warning"><?php echo $warning ?></div>
		<?php endforeach; ?>
	</body>
</html>
