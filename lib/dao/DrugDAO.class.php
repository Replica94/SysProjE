<?php
/**
 * Data Access Object for drug data.
 */
 
 require_once(__DIR__ . "/../../config/dbconfig.php");
 
 class DrugDAO
 {
    private $db = null;
    private $prepared = array();
    private $queries = array();
    
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
        if ($this->db->connect_error) {
            die('MySQL error (' . $this->db->connect_errno . ') ' . $this->db->connect_error);
        }
        $this->makeQueries();
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
        $stmt = $this->getPrepared("drugdata");
        if ($stmt) {
            $stmt->bind_param("s", $drugname);
            if ($stmt->execute()) {
                $stmt->bind_result($form, $strength, $container);
                while ($stmt->fetch()) {
                    $result[] = array("form" => $form, "strength" => $strength, "container" => $container);
                }
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
        $stmt = $this->getPrepared("randomdrug");
        if ($stmt) {            
            $stmt->bind_param("i", $num);
            if ($stmt->execute()) {
                $stmt->bind_result($drugname);
                while ($stmt->fetch()) {
                    $names[] = $drugname;
                }
            }
        }
        return $names;
    }
    
     /**
     * Returns a random drug name of the given form
     *
     * @param $form Form of the drug, e.g. tablet. Matches if the given string 
     *              is present anywhere in the form description (i.e. "tablet"
     *              would match "tablet", but also "film-coated tablet" and 
     *              "effervescent tablet")
     * @param $num Number of drug names to return
     * @return An array of random drug names, or an empty array if failed.
     */
    public function getRandomDrugOfForm($form, $num = 1)
    {
        $names = array();
        $stmt = $this->getPrepared("randomdrugofform");
        if ($stmt) {            
            $form = "%{$form}%";
            $stmt->bind_param("si", $form, $num);
            if ($stmt->execute()) {
                $stmt->bind_result($drugname);
                while ($stmt->fetch()) {
                    $names[] = $drugname;
                }
            }
        }
        return $names;
    }
    
    /**
     * Creates all the necessary query strings that are used in the DAO.
     */
    private function makeQueries()
    {
        $this->queries["drugdata"] = <<<SQL
SELECT DISTINCT lm.laakemuotonimie AS laakemuoto, pak.vahvuus AS vahvuus, sa.nimie AS astia
    FROM pakkaus AS pak
        INNER JOIN laakeaine AS la ON pak.pakkausnro = la.pakkausnro
        INNER JOIN laakemuoto AS lm ON lm.laakemuototun = pak.laakemuototun
        LEFT JOIN sailytysastia AS sa ON sa.astiatun = pak.astiatun
    WHERE
        la.ainenimi = ? AND
        pak.vaikainelkm = 1 AND
        pak.vahvuus <> ''
ORDER BY lm.laakemuotonimie, pak.vahvuus, sa.nimie
SQL;
        
        $this->queries["randomdrug"] = <<<SQL
SELECT DISTINCT la.ainenimi 
    FROM laakeaine AS la
    INNER JOIN pakkaus AS pak ON la.pakkausnro = pak.pakkausnro
    WHERE
        pak.vaikainelkm = 1 AND
        pak.vahvuus <> ''
ORDER BY RAND() LIMIT ?
SQL;
        
        $this->queries["randomdrugofform"] = <<<SQL
SELECT DISTINCT la.ainenimi 
    FROM laakeaine AS la
    INNER JOIN pakkaus AS pak ON la.pakkausnro = pak.pakkausnro
    INNER JOIN laakemuoto AS lm ON lm.laakemuototun = pak.laakemuototun
    WHERE
        pak.vaikainelkm = 1 AND
        pak.vahvuus <> '' AND
        lm.laakemuotonimie LIKE ?        
ORDER BY RAND() LIMIT ?
SQL;
    }
    
    /**
     * Gets a prepared statement with the given name.
     *
     * @param Name of the prepared statement
     * @return The prepared statement, or null if not found.
     */    
    private function getPrepared($name)
    {
        if (isset($this->prepared[$name])) {
            return $this->prepared[$name];
        } elseif (isset($this->queries[$name])) {
            $stmt = $this->db->stmt_init();
            $stmt->prepare($this->queries[$name]);
            $this->prepared[$name] = $stmt;
            return $stmt;
        } else {
            return null;
        }
    }
 }
 