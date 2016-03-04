<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Register</title>
        
        <!-- reCAPTCHA: -->
        <script src='https://www.google.com/recaptcha/api.js'></script>
    </head>

    <body>
        <form method="post" action="register.php">
            <input type="text" name="username" placeholder="Type a username">
            <input type="password" name="passwd" placeholder="Type a password">
            <input type="password" name="passwd2" placeholder="Retype password">
            <input type="submit" name="submit" value="Register">
            
            <!-- reCAPTCHA: -->
            <div class="g-recaptcha" data-sitekey="6Lf48xkTAAAAAGjaAyRttKbbbc5vD3X4i3iUEwg9"></div>
        </form>
        <?php foreach ($warnings as $warning): ?>
            <div class="warning"><?php echo $warning ?></div>
        <?php endforeach; ?>
    </body>
</html>
