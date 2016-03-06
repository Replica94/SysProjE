<?php
require_once(__DIR__ . "/../config/config.php");
require_once(__DIR__ . "/../lib/util.functions.php");
autoloader(__DIR__ . "/../lib/");
autoloader(__DIR__ . "/../lib/dao/");


if (isLoggedIn()) {
    $user = getUser();
    echo "Logged in as {$user->getUsername()}";
} else {
    echo "Not logged in.";
}
