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
     * @param $username The username to check for.
     * @return True if the username exists, or false otherwise.
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
     * @param $username Username of the new user.
     * @param $password Password of the new user
     * @return True if operation was successful, or false otherwise.
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
     * @param $username Username
     * @return Password hash, or null if nothing found.
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
     * @param $selector
     * @return Auth token row
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
     * @param $selector
     * @param $token
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
     * @param $username
     * @param $selector
     * @param $token
     * @param $expiry Expiry time as a UNIX timestamp
     * @return True if the operation was successful, or false otherwise.
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
     * Map a username to a userid.
     *
     * @param $username
     * @return User id if a matching user exists, or null otherwise.
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
            "DELETE FROM auth_token WHERE expires > NOW()"
        );
    }
}
