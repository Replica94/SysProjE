<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Register</title>
        <link rel="stylesheet" type="text/css" href="css/styles.css">
        <!-- reCAPTCHA: -->
        <script src='https://www.google.com/recaptcha/api.js'></script>
    </head>

    <body>
	<section>
        <form method="post" action="register.php">
			<label class="w3-label" for="username">Username</label>
            <input class="w3-input" type="text" name="username" placeholder="Type a username"><p>
			<label class="w3-label" for="passwd">Password</label>
            <input class="w3-input" type="password" name="passwd" placeholder="Type a password"><p>
			<label class="w3-label" for="passwd2">Retype password</label>
            <input class="w3-input" type="password" name="passwd2" placeholder="Retype password"><p>
            	
           <!-- reCAPTCHA: -->
            <div class="g-recaptcha" data-sitekey="6Lf48xkTAAAAAGjaAyRttKbbbc5vD3X4i3iUEwg9"></div><p>
            	
            <input class="w3-input" type="submit" name="submit" value="Register"><p>

        </form>
        <?php foreach ($warnings as $warning): ?>
            <div class="warning"><?php echo $warning ?></div>
        <?php endforeach; ?>
    </section>
	</body>
</html>
