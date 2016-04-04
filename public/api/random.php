<?php
require_once("../../lib/dao/DrugDAO.class.php");

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

if (isset($_REQUEST['n'])) {
    $num = max($_REQUEST['n'], 1);
} else {
    $num = 1;
}

if (isset($_REQUEST['form'])) {
    $form = $_REQUEST['form'];
}

$dao = new DrugDAO();
if (isset($form)) {
    $drugnames = $dao->getRandomDrugOfForm($form, $num);
} else {
    $drugnames = $dao->getRandomDrug($num);
}

$drugs = array();

$fcon = file("../../namegen/drugnames.txt");

function generateLabelText($drugdata)
{
    $labeltext = "";
    if ($drugdata["warning"] == "1") {
        $labeltext .= "Attention! May have detrimental effects on driving and use of heavy machinery! ";
    }
    if (isset($drugdata["dailydose"]) && strlen($drugdata["dailydose"]) > 0) {
        $labeltext .= "Maximum daily dose " . $drugdata["dailydose"] . ". ";
    }
    if (isset($drugdata["size"]) && strlen($drugdata["size"]) > 0) {
        $labeltext .= "Contains " . str_replace("kpl", "pcs", $drugdata["size"]) . ".";
    }
    return $labeltext;
}

foreach ($drugnames as $drug) {
    $newdrug["drug"] = strtolower($drug);
    $newdrug["name"] = strtolower(rtrim($fcon[array_rand($fcon)]));
    $alldata = $dao->getDrugData($drug);
    // $alldata has data for others forms, make sure we only get those of $form if it is set
    do {
        $data = $alldata[array_rand($alldata)];
    } while (isset($form) && strpos(strtolower($data["form"]), $form) === false);
    $newdrug["form"] = strtolower($data["form"]);
    $newdrug["strength"] = $data["strength"];
    $newdrug["container"] = strtolower($data["container"]);
    $newdrug["labeltext"] = generateLabelText($data);
    $drugs[] = $newdrug;
}

echo json_encode(array("drugs" => $drugs));
