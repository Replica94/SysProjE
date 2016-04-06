<?php
require_once("../../lib/util.functions.php");

$user = getUser();
if (!isLoggedIn() || !isset($user)) {
    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(array("success" => "false", "error" => "Not logged in")));
}

$difficulty = null;
if (isset($_REQUEST['difficulty'])) {
    $difficulty = $_REQUEST['difficulty'];
}

$score = $user->getHighScore($difficulty);

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(array("success" => "true", "data" => $score));
