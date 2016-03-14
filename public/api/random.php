<?php
require_once("../../lib/dao/DrugDAO.class.php");

header("Content-Type: application/json; charset=UTF-8");

if (isset($_REQUEST['n'])) {
    $num = $_REQUEST['n'];
} else {
    $num = 1;
}

$dao = new DrugDAO();
echo json_encode(array("drugs" => $dao->getRandomDrug($num)));
