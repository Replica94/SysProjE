<?php
/**
 * Utility functions.
 */
 
require_once(__DIR__ . '/../config/config.php');
 
/**
 * Enforces that HTTPS is used for the connection. If the connection is not
 * secure, the connection is redirected to HTTPS and exit() is called.
 * Because the function calls header(), it MUST be called before any
 * output is sent to the client.
 */
function requireSSL() {
	if ($_SERVER['HTTPS'] != 'on') {
		header("Location: https://" .  $_SERVER["HTTP_HOST"] 
			. $_SERVER["REQUEST_URI"]);
		exit();
	}
}

/**
 * Sets up an autoloader in the given dir. Autoloads (classname).class.php
 * files from the given directory.
 *
 * @param dir String to the directory where to autoload from.
 */
function autoloader($dir) {
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
function getUser() {
	require_once(__DIR__ . "/Session.class.php");
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
function isValidPassword($passwd) {
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
function isValidUsername($username) {
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
function pw_encode($password) {
	// TODO: use password_hash() instead of crypt() if PHP 5.5 or
	// 		 later is available on the production machine
	return crypt($password);
}

/**
 * Verify that the password matches the given password hash.
 *
 * @param $password Password as plain text
 * @param $pwhash Hashed password
 * @return True if the password matches, or false otherwise.
 */
function pw_verify($password, $pwhash) {
	return hash_equals($pwhas, crypt($password, $pwhas));
}
