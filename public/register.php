<?php
/**
 * Account registration form.
 */

require_once(__DIR__ . "/../config/config.php");
require_once(__DIR__ . "/../lib/util.functions.php");
autoloader(__DIR__ . "/../lib/");
autoloader(__DIR__ . "/../lib/dao/");

// avoid sending passwords over an unsecured connection
// requireSSL();

// disallow new account creation for users who are already logged in
requireNotLoggedIn();

$session = Session::start();
$warnings = array();

if (isset($_POST['submit'])) {
    if (!verifyReCaptcha("6Lea-BkTAAAAAHEyNQ3vkVpFghbEDypdJ2Wm7ygv",
            @$_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR'])) {
        $warnings[] = "Failed CAPTCHA";
    } elseif (isset($_POST['passwd']) && isset($_POST['passwd2']) && 
        isset($_POST['username'])) {
        
        $passwd = $_POST['passwd'];
        $passwd2 = $_POST['passwd2'];
        $username = $_POST['username'];
        
        // validate password and username
        if($passwd != $passwd2) {
            $warnings[] = "Passwords don't match";
        }
        if (!isValidPassword($passwd)) {
            $warnings[] = "Not a valid password (longer than " . 
                MIN_PASSWORD_LENGTH . " characters required)";
        }
        if (!isValidUsername($username)) {
            $warnings[] = "Not a valid username (longer than " . 
                MIN_USERNAME_LENGTH . " characters required)";
        }
        
        // No warnings means everything is in order, and we can create the user
        if (count($warnings) == 0) {
            $dao = new UserDAO();
            if ($dao->userExists($username)) {
                $warnings[] = "Username already taken";
            }
            else {
                $passwd = pw_encode($passwd);
                if (!$dao->createUser($username, $passwd)) {
                    $warnings[] = "Failed to insert to database";
                } else {
                    // Registration was successful, redirect the user to
                    // the login screen
                    $session->set('register_flag', true);
                    header("Location: login.php");
                    exit();
                }
            }
        }
    }
}

// Include the HTML template:
require __DIR__ . '/../templates/register.php';
