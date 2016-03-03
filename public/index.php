<?php
require_once(__DIR__ . "/../config/config.php");
require_once(__DIR__ . "/../lib/util.functions.php");
autoloader(__DIR__ . "/../lib/");
autoloader(__DIR__ . "/../lib/dao/");

$user = getUser();
if (isset($user) && $user->loggedIn()) {
	echo "Logged in as {$user->getUsername()}";
}
else {
	echo "Not logged in.";
}
	