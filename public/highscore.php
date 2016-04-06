<?php
require_once(__DIR__ . "/../config/config.php");
require_once(__DIR__ . "/../lib/util.functions.php");
autoloader(__DIR__ . "/../lib/");
autoloader(__DIR__ . "/../lib/dao/");

$scores["easy"] = User::getHallOfFame(1, 10);
$scores["medium"] = User::getHallOfFame(2, 10);
$scores["hard"] = User::getHallOfFame(3, 10);
$scores["lunatic"] = User::getHallOfFame(4, 10);

include("../templates/highscore.php");
