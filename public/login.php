<?php
/**
 * Login form.
 */

require_once(__DIR__ . "/../config/config.php");
require_once(__DIR__ . "/../lib/util.functions.php");
autoloader(__DIR__ . "/../lib/");
autoloader(__DIR__ . "/../lib/dao/");

// avoid sending passwords over an unsecured connection
// requireSSL();

// already logged in, disallow logging in again
requireNotLoggedIn();

$messages = array();
$warnings = array();

$session = Session::start();
if ($session->get('register_flag') != null) {
	$messages[] = "Registration successful";
	$session->clear('register_flag');
}

if (isset($_POST['submit'])) {
	if (isset($_POST['username']) && isset($_POST['passwd'])) {
		$username = $_POST['username'];
		$passwd = $_POST['passwd'];
		$user = new User();
		if ($user->logIn($username, $passwd)) {
			// Login successful, set session variables and redirect to index
			$session->set('user', $user);
			header("Location: index.php");
			exit();
		}
		else {
			$warnings[] = "Login failed";
		}
	}
	else {
		$warnings[] = "Missing fields";
	}
}

// Include the HTML template:
require __DIR__ . '/../templates/login.php';
