<?php
require_once("../../lib/dao/DrugDAO.class.php");

header("Content-Type: application/json; charset=UTF-8");

$dao = new DrugDAO();
echo json_encode(array("drug" => $dao->getRandomDrug()));
