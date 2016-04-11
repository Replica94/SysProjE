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
            <input class="w3-input" type="text" id="username" name="username" placeholder="Type a username"><p>
			<label class="w3-label" for="passwd">Password</label>
            <input class="w3-input" type="password" id="passwd" name="passwd" placeholder="Type a password"><p>
			<label class="w3-label" for="passwd2">Retype password</label>
            <input class="w3-input" type="password" id="passwd2" name="passwd2" placeholder="Retype password"><p>
            	
           <!-- reCAPTCHA: -->
            <div class="g-recaptcha" data-sitekey="6Lf48xkTAAAAAGjaAyRttKbbbc5vD3X4i3iUEwg9"></div><p>
            	
            <input class="w3-input" type="submit" name="submit" value="Register"><p>

        </form>
        <?php foreach ($warnings as $warning): ?>
            <div class="warning"><?php echo $warning ?></div>
        <?php endforeach; ?>
        <script type="text/javascript">
            window.doorbellOptions = {
                appKey: 'Lk9qZQ2nhfU228PzX36FIRAblIEJfVhwWRkjYsb9s7g0KpzLAn7ozTrdOt3iea6X'
            };
            (function(d, t) {
                var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/3234?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g);
            }(document, 'script'));
        </script>
    </section>
	</body>
</html>
