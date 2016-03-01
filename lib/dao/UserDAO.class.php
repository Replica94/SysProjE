<?php
/**
 * Data Access Object for user data.
 */
 
require_once(__DIR__ . "/../../config/dbconfig.php");
 
class UserDAO {
	private $conn = null;
	
	/** Constructor. Creates a DB connection. */
	public function __construct() {		
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
	public function __destruct() {
		pg_close($this->conn);
		$this->conn = null;
	}
	
	/**
	 * Checks if the given user exists in the database.
	 *
	 * @param $username The username to check for.
	 * @return True if the username exists, or false otherwise.
	 */
	public function userExists($username) {
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
	public function createUser($username, $password) {
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
	public function getPassword($username) {
		$res = pg_query_params(
			$this->conn,
			"SELECT pwhash FROM account WHERE username = $1",
			array($username)
		);
		$arr = pg_fetch_array($res);
		return isset($arr['pwhash']) ? $arr['pwhash'] : null;
	}
}
