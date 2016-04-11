<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Login</title>
		<link rel="stylesheet" type="text/css" href="css/styles.css">
			
    </head>
    <body>
        <section>
            <?php foreach ($messages as $message): ?>
                <div class="message"><?php echo $message ?></div>
            <?php endforeach; ?>
            <form method="post" action="login.php">
                    <label class="w3-label" for="username">Username</label>
                    <input class="w3-input" type="text" id="username" name="username" placeholder="Type a username"><p>
                    <label class="w3-label" for="passwd">Password</label>
                    <input class="w3-input" type="password" id="passwd" name="passwd" placeholder="Type a password"><p>
                    <input class="w3-check" type="checkbox" id="remember_me" name="remember_me" value="true">
                    <label for="remember_me">Remember me</label><p>
                    <a href="register.php">New user</a>
                    <input class="w3-input" type="submit" name="submit" value="Login"><p>
                    <input class="w3-input" type="submit" name="submit" value="Login as guest">
            </form>
            <?php foreach ($warnings as $warning): ?>
                <div class="warning"><?php echo $warning ?></div>
            <?php endforeach; ?>
        </section>
        <script type="text/javascript">
            window.doorbellOptions = {
                appKey: 'Lk9qZQ2nhfU228PzX36FIRAblIEJfVhwWRkjYsb9s7g0KpzLAn7ozTrdOt3iea6X'
            };
            (function(d, t) {
                var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/3234?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g);
            }(document, 'script'));
        </script>
    </body>
</html>
