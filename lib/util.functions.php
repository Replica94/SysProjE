<?php
/**
 * Utility functions.
 */
 
require_once(__DIR__ . '/../config/config.php');
require_once(__DIR__ . '/Session.class.php');
require_once(__DIR__ . '/User.class.php');

/**
 * Enforces that HTTPS is used for the connection. If the connection is not
 * secure, the connection is redirected to HTTPS and exit() is called.
 * Because the function calls header(), it MUST be called before any
 * output is sent to the client. If headers have already been sent, the 
 * function does nothing.
 */
function requireSSL() 
{
    if (!headers_sent()) {
        if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off') {
            header("Location: https://" .  $_SERVER["HTTP_HOST"] 
                . $_SERVER["REQUEST_URI"]);
            exit();
        }
    }
}

/**
 * Enforces that the user isn't logged in. If the user is logged in,
 * redirect them to the given address and exit. MUST be called before any
 * output has been sent to the client, otherwise the function does nothing.
 *
 * @param $redirect The address to redirect to (default index.php)
 */
function requireNotLoggedIn($redirect = 'index.php') 
{
    if (isLoggedIn() && !headers_sent()) {
        header("Location: {$redirect}");
        exit();
    }   
}

/**
 * Checks if a user is logged in.
 *
 * @return True if a user is logged in, or false otherwise.
 */
function isLoggedIn() 
{
    $session = Session::start();
    $user = getUser();
    if (isset($user) && $user->loggedIn()) {  
        return true;
    } elseif (isset($_COOKIE['medicutor_token'])) {
        $newuser = new User();
        if ($newuser->loginWithToken($_COOKIE['medicutor_token'])) {
            $session->set('user', $newuser);
            makeNewToken($newuser);
            return true;
        }
    } 
    return false;
}

/**
 * Makes a new login token for the given user and sets cookie.
 *
 * @param User $user The user to make the token for
 */
function makeNewToken($user) 
{
    $expiry = time() + LOGIN_EXPIRY_TIME;
    $token = $user->generateToken($expiry);
    setcookie('medicutor_token', $token, $expiry);    
}

/** Clears the login token cookie */
function clearTokenCookie() 
{
    setcookie('medicutor_token', null, time() - 3600);
}

/**
 * Sets up an autoloader in the given dir. Autoloads (classname).class.php
 * files from the given directory.
 *
 * @param dir String to the directory where to autoload from.
 */
function autoloader($dir) 
{
    spl_autoload_register(
        function($classname) use ($dir) {
            include(rtrim($dir, '/') . '/' . $classname . ".class.php");
        }
    );
}

/**
 * Checks if a user object exists in the session and returns it if it does.
 *
 * @return User object if one exists in the session, or null otherwise.
 */
function getUser() 
{
    $session = Session::start();
    $user = $session->get('user');
    if (isset($user)) {
        return $user;
    }
    return null;
}

/**
 * Checks whether the given password meets all the requirements for passwords.
 *
 * @param $passwd Password
 * @return True if $passwd is a valid password, or false otherwise.
 */
function isValidPassword($passwd) 
{
    if (strlen($passwd) >= MIN_PASSWORD_LENGTH) {
        return true;
    }
    return false;
}

/**
 * Checks whether the given username meets all the requirements for usernames.
 *
 * @param $username Username to test
 * @return True if $username is a valid username, or false otherwise.
 */
function isValidUsername($username) 
{
    if (strlen($username) >= MIN_USERNAME_LENGTH) {
        return true;
    }
    return false;
}

/**
 * Hash a password.
 *
 * @param $password The password to hash
 * @return Hashed password
 */
function pw_encode($password) 
{
    return password_hash($password, PASSWORD_DEFAULT);
}

/**
 * Verify that the password matches the given password hash.
 *
 * @param $password Password as plain text
 * @param $pwhash Hashed password
 * @return True if the password matches, or false otherwise.
 */
function pw_verify($password, $pwhash) 
{
    return password_verify($password, $pwhash);
}

/**
 * Verify a reCAPTCHA. See reCAPTCHA documentation on Google's 
 * site for specifics.
 *
 * @param $secret The secret key used for communication with Google's service
 * @param $response The value of 'g-recaptcha-response' response from the form
 * @param $remoteip The remote user's IP
 * @return True if the captcha was solved successfully, otherwise false.
 */
function verifyReCaptcha($secret, $response, $remoteip) 
{
    $data = array(
        "secret" => $secret,
        "response" => $response,
        "remoteip" => $remoteip
    );
    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context = stream_context_create($options);
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $result = file_get_contents($url, false, $context);
    if ($result == false) {
        return false;
    }
    $response = json_decode($result, true);
    return (isset($response['success']) && $response['success'] == true);
}
