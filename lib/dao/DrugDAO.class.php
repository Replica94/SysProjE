<?php
/**
 * Data Access Object for drug data.
 */
 
 require_once(__DIR__ . "/../../config/dbconfig.php");
 
 class DrugDAO
 {
    private $db = null;
    private $prepared = array();
    
    /** Constructor. Creates a DB connection. */
    public function __construct()
    {
        $this->db = new mysqli(
            DRUGDB_HOST,
            DRUGDB_USERNAME,
            DRUGDB_PASSWORD,
            DRUGDB_DATABASE,
            DRUGDB_PORT
        );
        if ($this->db->connect_error || !$this->makePreparedStatements()) {
            die('MySQL error (' . $this->db->connect_errno . ') ' . $this->db->connect_error);
        }
    }
       
    /** Destructor. Closes the DB connection. */
    public function __destruct() 
    {
        $this->db->close();
        $this->db = null;
    }
    
    /**
     * Gets data for the given drug.
     *
     * @param $drugname The drug's name as a string
     * @return An array of arrays, each sub-array representing one result 
     *         with property names as keys and property values as values.
     */
    public function getDrugData($drugname)
    {
        $result = array();
        $this->prepared["drugdata"]->bind_param("s", $drugname);
        if ($this->prepared["drugdata"]->execute()) {
            $this->prepared["drugdata"]->bind_result($form, $strength, $package);
            while ($this->prepared["drugdata"]->fetch()) {
                $result[] = array("form" => $form, "strength" => $strength, "package" => $package);
            }
        }
        return $result;        
    }
    
    /**
     * Returns a random drug name
     *
     * @param $num Number of drug names to return
     * @return An array of random drug names, or an empty array if failed.
     */
    public function getRandomDrug($num = 1)
    {
        $names = array();
        $this->prepared["randomdrug"]->bind_param("i", $num);
        if ($this->prepared["randomdrug"]->execute()) {
            $this->prepared["randomdrug"]->bind_result($drugname);
            while ($this->prepared["randomdrug"]->fetch()) {
                $names[] = $drugname;
            }
        }
        return $names;
    }
    
    /**
     * Creates all the necessary prepared statements
     * that are used in the DAO.
     *
     * @return True if successful, or false otherwise.
     */
    private function makePreparedStatements()
    {
        $query = <<<SQL
SELECT DISTINCT lm.laakemuotonimie AS laakemuoto, pak.vahvuus AS vahvuus, sa.nimie AS astia
    FROM pakkaus AS pak
        INNER JOIN laakeaine AS la ON pak.pakkausnro = la.pakkausnro
        INNER JOIN laakemuoto AS lm ON lm.laakemuototun = pak.laakemuototun
        INNER JOIN sailytysastia AS sa ON sa.astiatun = pak.astiatun
    WHERE
        la.ainenimi = ?
ORDER BY lm.laakemuotonimie, pak.vahvuus, sa.nimie
SQL;
        $this->prepared["drugdata"] = $this->db->stmt_init();
        if (!$this->prepared["drugdata"]->prepare($query)) {
            return false;
        }
        
        $query = "SELECT ainenimi FROM laakeaine ORDER BY RAND() LIMIT ?";
        $this->prepared["randomdrug"] = $this->db->stmt_init();
        if (!$this->prepared["randomdrug"]->prepare($query)) {
            return false;
        }
        
        return true;    
    }
 }