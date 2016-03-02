<?php
/**
 * User class. Handles authentication etc.
 */

require_once(__DIR__ . "/dao/UserDAO.class.php");
require_once(__DIR__ . "/util.functions.php");
 
class User {
	private $loggedIn = false;
	private $username = null;
	
	/** 
	 * Attempts to login with username and password.
	 * 
	 * @param $username Username
	 * @param $password Password
	 * @return True if login was successful, or false otherwise.
	 */
	public function logIn($username, $password) {
		$dao = new UserDAO();
		if ($dao->userExists($username)) {
			$pwhash = $dao->getPassword($username);
			if (pw_verify($password, $pwhash)) {
				$this->loggedIn = true;
				$this->username = $username;
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Check if the user is logged in.
	 * 
	 * @return True if the user is logged in, or false otherwise.
	 */
	public function loggedIn() {
		return $this->loggedIn;
	}
	
	/**
	 * Get the user's username.
	 *
	 * @return Username
	 */
	public function getUsername() {
		return $this->username;
	}
}
