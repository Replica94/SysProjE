<?php
require_once("../../lib/util.functions.php");

if (!isset($_REQUEST['difficulty'])) {
    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(array("success" => "false", "error" => "Difficulty not given")));    
}
$difficulty = $_REQUEST['difficulty'];

$num = 10;
if (isset($_REQUEST['num'])) {
    $num = $_REQUEST['num'];
}

$score = User::getHallOfFame($difficulty, $num);
if (count($score) == 0) {
    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(array("success" => "false", "error" => "Internal server error")));        
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(array("success" => "true", "data" => $score));
