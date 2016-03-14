<?php
require_once("../../lib/dao/DrugDAO.class.php");

$dao = new DrugDAO();
echo $dao->getRandomDrug();

