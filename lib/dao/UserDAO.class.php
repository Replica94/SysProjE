<?php
/**
 * Data Access Object for user data.
 */
 
require_once(__DIR__ . "/../../config/dbconfig.php");
 
class UserDAO 
{
    private $conn = null;
    
    /** Constructor. Creates a DB connection. */
    public function __construct() 
    {     
        $this->conn = pg_connect(
            "host=" . APPDB_HOST . 
            " dbname=" . APPDB_DATABASE .
            " port=" . APPDB_PORT .
            " user=" . APPDB_USERNAME .
            " password=" . APPDB_PASSWORD
        );
        if ($this->conn == false) {
            die("Could not connect to database: " . pg_last_error());
        }
    }
    
    /** Destructor. Closes the DB connection. */
    public function __destruct() 
    {
        pg_close($this->conn);
        $this->conn = null;
    }
    
    /**
     * Checks if the given user exists in the database.
     *
     * @param string $username The username to check for.
     * @return bool True if the username exists, or false otherwise.
     */
    public function userExists($username) 
    {
        $res = pg_query_params($this->conn, 
            "SELECT * FROM account WHERE username = $1",
            array($username)
        );
        return (pg_fetch_all($res) != false);
    }
    
    /**
     * Inserts a new user into the database.
     *
     * @param string $username Username of the new user.
     * @param string $password Password of the new user
     * @return bool True if operation was successful, or false otherwise.
     */
    public function createUser($username, $password) 
    {
        $res = pg_query_params(
            $this->conn,
            "INSERT INTO account(username, pwhash) VALUES ($1, $2)",
            array($username, $password)
        );
        return $res != false;
    }
    
    /**
     * Gets a user's password hash.
     *
     * @param string $username Username
     * @return string|null Password hash, or null if nothing found.
     */
    public function getPassword($username) 
    {
        $res = pg_query_params(
            $this->conn,
            "SELECT pwhash FROM account WHERE username = $1",
            array($username)
        );
        $arr = pg_fetch_array($res);
        return isset($arr['pwhash']) ? $arr['pwhash'] : null;
    }
    
    /**
     * Gets an auth token row from the database that matches the given selector
     * and hasn't expired.
     *
     * @param string $selector
     * @return string Auth token row
     */
    public function getAuthToken($selector) 
    {
        $query = <<<SQL
            SELECT acc.username, auth.token 
                FROM auth_token AS auth
                INNER JOIN account AS acc 
                    ON acc.id = auth.userid
                WHERE auth.selector = $1 AND auth.expires > NOW()
SQL;
        
        $res = pg_query_params(
            $this->conn,
            $query,
            array($selector)
        );
        $arr = pg_fetch_array($res);
        return $arr;
    }
    
    /**
     * Remove the given token from the database.
     *
     * @param string $selector
     * @param string $token
     */
    public function removeToken($selector, $token) 
    {
        pg_query_params(
            $this->conn,
            "DELETE FROM auth_token WHERE selector = $1 AND token = $2",
            array($selector, $token)
        );
        $this->clearExpiredTokens();
    }
    
    /**
     * Adds a new auth token to the database.
     *
     * @param string $username
     * @param string $selector
     * @param string $token
     * @param int $expiry Expiry time as a UNIX timestamp
     * @return bool True if the operation was successful, or false otherwise.
     */
    public function addToken($username, $selector, $token, $expiry) 
    {
        $userid = $this->getUserId($username);
        if ($userid != null) {
            $res = pg_query_params(
                $this->conn,
                "INSERT INTO auth_token(userid, selector, token, expires) VALUES ($1, $2, $3, $4)",
                array($userid, $selector, $token, date("Y-m-d H:i:s", $expiry))
            );
            return $res != false;
        }
        return false;
    }
    
    /**
     * Add a score for a user.
     *
     * @param string $username Username of the scoring user.
     * @param int $score Score to addScore
     * @param int $difficulty Difficulty as an integer (default=1)
     * @return string True if the operation was successful, or false otherwise.
     */
    public function saveScore($username, $score, $difficulty=1)
    {
        $userid = $this->getUserId($username);
        if ($userid != null) {
            $res = pg_query_params(
                $this->conn,
                "INSERT INTO score(accountid, difficulty, score, added) VALUES ($1, $2, $3, NOW())",
                array($userid, $difficulty, $score));
            return $res != false;
        }
        return false;
    }
   
    
    /**
     * Get a user's highscore for the given difficulty.
     *
     * @param string $username Username of the scoring user.
     * @param int $difficulty Difficulty as an integer (default=null), or null for all difficulties.
     * @return array|null Result array if successful, or null otherwise.
     */
    public function getUserHighScore($username, $difficulty=null)
    {
        $userid = $this->GetUserId($username);
        if ($userid != null) {
            if (isset($difficulty)) {
                $res = pg_query_params(
                    $this->conn,
                    "SELECT accountid, difficulty, MAX(score) AS highscore FROM score WHERE accountid = $1 AND difficulty = $2 GROUP BY accountid, difficulty",
                    array($userid, $difficulty)
                );
            }
            else {
                $res = pg_query_params(
                    $this->conn,
                    "SELECT accountid, difficulty, MAX(score) AS highscore FROM score WHERE accountid = $1 GROUP BY accountid, difficulty",
                    array($userid)
                );
            }
            if (isset($res) && !is_bool($res)) {
                $rv = array();
                do {
                    $row = pg_fetch_array($res);
                    if ($row !== false) {
                        $rv[] = $row;
                    }
                } while ($row !== false);
                return $rv;
            }
        }
        return null;
    }
    
    /**
     * Gets the best scores and the users who achieved them.
     *
     * @param int $difficulty Difficulty to get scores for (default=10)
     * @param int $num Number of highscores to get (default=10)
     * @return array Array of $user => $key pairs.
     */
    public function getHallOfFame($difficulty=1, $num=10)
    {
        $sql = <<<SQL
SELECT acc.username, hs.highscore 
    FROM
        (SELECT accountid, MAX(score) AS highscore FROM score WHERE difficulty = $1 GROUP BY accountid) AS hs
        INNER JOIN account AS acc
            ON acc.id = hs.accountid
ORDER BY highscore DESC
LIMIT $2
SQL;
        $res = pg_query_params(
            $this->conn,
            $sql,
            array($difficulty, $num)
        );
        $rv = array();
        if (!is_bool($res)) {
            do {
                $row = pg_fetch_array($res);
                if ($row !== false) {
                    $rv[] = $row;
                }
            } while ($row !== false);
        }
        return $rv;        
    }
    
    /**
     * Map a username to a userid.
     *
     * @param string $username
     * @return int User id if a matching user exists, or null otherwise.
     */
    protected function getUserId($username) 
    {
        $res = pg_query_params(
            $this->conn,
            "SELECT id FROM account WHERE username = $1",
            array($username)
        );
        if ($res == false) {
            return null;
        }
        $arr = pg_fetch_array($res);
        return isset($arr['id']) ? $arr['id'] : null;
    }
    
    /** Clears expired tokens from the database */
    protected function clearExpiredTokens() 
    {
        pg_query(
            $this->conn,
            "DELETE FROM auth_token WHERE expires < NOW()"
        );
    }
}
