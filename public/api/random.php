<?php
require_once("../../lib/dao/DrugDAO.class.php");

header("Content-Type: application/json; charset=UTF-8");

if (isset($_REQUEST['n'])) {
    $num = $_REQUEST['n'];
} else {
    $num = 1;
}

$dao = new DrugDAO();
$drugnames = $dao->getRandomDrug($num);

$drugs = array();

$fcon = file("../../namegen/drugnames.txt");

foreach ($drugnames as $drug) {
    $newdrug["drug"] = strtolower($drug);
    $newdrug["name"] = strtolower(rtrim($fcon[array_rand($fcon)]));
    $alldata = $dao->getDrugData($drug);
    $data = $alldata[array_rand($alldata)];
    $newdrug["form"] = strtolower($data["form"]);
    $newdrug["strength"] = $data["strength"];
    $newdrug["package"] = strtolower($data["package"]);
    $drugs[] = $newdrug;
}

echo json_encode(array("drugs" => $drugs));
