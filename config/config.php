<?php
/**
 * Global configuration parameters.
 */
 
define('MIN_PASSWORD_LENGTH', 3);
define('MIN_USERNAME_LENGTH', 3);

define('CAPTCHA_SECRET_KEY', getenv('CAPTCHA_SECRET_KEY'));

// two weeks -> 60 * 60 * 24 * 14 = 1209600
define("LOGIN_EXPIRY_TIME", 1209600);
