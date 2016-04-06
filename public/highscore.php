<?php
require_once(__DIR__ . "/../config/config.php");
require_once(__DIR__ . "/../lib/util.functions.php");
autoloader(__DIR__ . "/../lib/");
autoloader(__DIR__ . "/../lib/dao/");

$scores["easy"] = User::getHallOfFame(1, 10);


include("../templates/highscore.php");
